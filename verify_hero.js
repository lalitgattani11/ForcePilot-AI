import puppeteer from 'puppeteer';
import fs from 'fs';

const pages = [
  { name: 'Apex Trigger', url: 'http://localhost:4173/apex-trigger-interview-questions' },
  { name: 'LWC Coding', url: 'http://localhost:4173/lwc-coding-interview' },
  { name: 'Admin Interview', url: 'http://localhost:4173/salesforce-admin-interview' },
  { name: 'Flow Interview', url: 'http://localhost:4173/salesforce-flow-interview-questions' },
  { name: 'Governor Limits', url: 'http://localhost:4173/governor-limits-explained' },
  { name: 'Scenario Based', url: 'http://localhost:4173/scenario-based-salesforce-interview' },
  { name: 'Career Roadmap', url: 'http://localhost:4173/career-roadmap' },
  { name: 'AI Insights', url: 'http://localhost:4173/ai-interview-insights' }
];

async function verify(page, url, name) {
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.setViewport({ width: 1440, height: 900 });
    await page.waitForSelector('.guide-hero-title', { timeout: 10000 });
  } catch (e) {
    console.error(`Error loading ${url}: ${e.message}`);
    return null;
  }

  const getMetrics = async () => {
    return await page.evaluate(() => {
      const container = document.querySelector('.guide-hero-container');
      const title = document.querySelector('.guide-hero-title');
      const cta = document.querySelector('.cta-button') || document.querySelector('a.bg-white');
      
      if (!title) return { error: 'Title not found' };

      // Get container width, fallback to parent if missing (for debugging)
      const containerWidth = container ? container.getBoundingClientRect().width : 0;
      const containerMaxWidth = container ? window.getComputedStyle(container).maxWidth : 'N/A';
      const titleMaxWidth = window.getComputedStyle(title).maxWidth;
      
      const originalWidth = title.style.width;
      title.style.width = 'fit-content';
      const textWidth = title.getBoundingClientRect().width;
      title.style.width = originalWidth;

      const titleRect = title.getBoundingClientRect();
      const ctaRect = cta ? cta.getBoundingClientRect() : { top: 0, left: 0 };

      const style = window.getComputedStyle(title);
      const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.1;
      const lines = Math.round(titleRect.height / lineHeight);

      return {
        containerWidth: containerWidth,
        containerMaxWidth: containerMaxWidth,
        titleMaxWidth: titleMaxWidth,
        textWidth: textWidth,
        titleWidth: titleRect.width,
        titleTop: titleRect.top,
        titleBottom: titleRect.bottom,
        ctaTop: ctaRect.top,
        ctaLeft: ctaRect.left,
        lineCount: lines,
        text: title.innerText.replace(/\n/g, ' ')
      };
    });
  };

  // 1. Capture "After" state (New Code)
  const after = await getMetrics();
  await page.screenshot({ path: `screenshot_${name.replace(/\s+/g, '_')}_after.png` });

  // 2. Capture "Before" state (Inject old constraints)
  await page.evaluate(() => {
    const container = document.querySelector('.guide-hero-container');
    const title = document.querySelector('.guide-hero-title');
    if (container) container.style.setProperty('max-width', '1024px', 'important');
    if (title) title.style.setProperty('max-width', '1024px', 'important');
  });
  await new Promise(r => setTimeout(r, 200));
  const before = await getMetrics();
  await page.screenshot({ path: `screenshot_${name.replace(/\s+/g, '_')}_before.png` });

  // 3. Mobile check
  await page.setViewport({ width: 375, height: 667 });
  await new Promise(r => setTimeout(r, 200));
  const mobileAfter = await getMetrics();

  await page.evaluate(() => {
    const container = document.querySelector('.guide-hero-container');
    const title = document.querySelector('.guide-hero-title');
    if (container) container.style.setProperty('max-width', '1024px', 'important');
    if (title) title.style.setProperty('max-width', '1024px', 'important');
  });
  await new Promise(r => setTimeout(r, 200));
  const mobileBefore = await getMetrics();

  return { before, after, mobileBefore, mobileAfter };
}

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  const results = [];
  for (const p of pages) {
    console.log(`Verifying ${p.name}...`);
    const data = await verify(page, p.url, p.name);
    if (data) {
      results.push({ name: p.name, ...data });
    }
  }

  // Generate Report
  console.log('\n--- VERIFICATION REPORT ---');
  let hasRegression = false;

  results.forEach(r => {
    const occupancy = (r.after.textWidth / r.after.containerWidth) * 100;
    const lineCountRegression = r.after.lineCount > r.before.lineCount;
    const foldRegression = r.after.titleBottom > 900;
    // Horizontal shift check for CTA
    const ctaShiftH = Math.abs(r.after.ctaLeft - r.before.ctaLeft) > 2;
    // Vertical shift check (for info)
    const ctaShiftV = Math.abs(r.after.ctaTop - r.before.ctaTop) > 2;
    const mobileRegression = JSON.stringify(r.mobileAfter) !== JSON.stringify(r.mobileBefore);

    console.log(`\n[${r.name}]`);
    console.log(`- Text Occupancy: ${occupancy.toFixed(1)}% (Target: < 85%)`);
    console.log(`- Container: ${r.after.containerWidth}px (Max: ${r.after.containerMaxWidth})`);
    console.log(`- Title Max: ${r.after.titleMaxWidth}`);
    console.log(`- Line Count: ${r.before.lineCount} -> ${r.after.lineCount}`);
    console.log(`- Below Fold: ${foldRegression ? 'YES 🚨' : 'No'}`);
    console.log(`- CTA H-Shift: ${ctaShiftH ? 'YES 🚨' : 'No'}`);
    console.log(`- CTA V-Shift: ${ctaShiftV ? 'Yes (Content flow)' : 'No'}`);
    console.log(`- Mobile Regression: ${mobileRegression ? 'YES 🚨' : 'No'}`);

    if (occupancy > 85.1 || lineCountRegression || foldRegression || ctaShiftH || mobileRegression) {
      hasRegression = true;
    }
  });

  if (hasRegression) {
    console.log('\n🚨 REGRESSIONS DETECTED. DO NOT COMMIT.');
  } else {
    console.log('\n✅ ALL VERIFICATIONS PASSED.');
  }

  await browser.close();
})();
