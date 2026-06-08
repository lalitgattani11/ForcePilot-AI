import puppeteer from 'puppeteer';

const pages = [
  { name: 'Apex Trigger', url: 'https://forcepilotai.online/apex-trigger-interview-questions' },
  { name: 'LWC Coding', url: 'https://forcepilotai.online/lwc-coding-interview' },
  { name: 'Admin Interview', url: 'https://forcepilotai.online/salesforce-admin-interview' },
  { name: 'Flow Interview', url: 'https://forcepilotai.online/salesforce-flow-interview-questions' },
  { name: 'Scenario Based', url: 'https://forcepilotai.online/scenario-based-salesforce-interview' },
  { name: 'Career Roadmap', url: 'https://forcepilotai.online/career-roadmap' },
  { name: 'AI Insights', url: 'https://forcepilotai.online/ai-interview-insights' }
];

async function measure(page, url) {
  try {
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.setViewport({ width: 1440, height: 900 });
    
    // Wait for the hero title to appear and have styles applied
    await page.waitForSelector('.guide-hero-title', { timeout: 20000 });
    await page.waitForFunction(() => {
      const el = document.querySelector('.guide-hero-title');
      return el && window.getComputedStyle(el).fontSize !== '0px';
    }, { timeout: 10000 });
    console.log(`Found .guide-hero-title with styles on ${url}`);
  } catch (e) {
    console.error(`Timeout or error loading ${url}: ${e.message}`);
    return null;
  }

  const getMetrics = async () => {
    return await page.evaluate(() => {
      const section = document.querySelector('.guide-hero-section');
      const container = document.querySelector('.guide-hero-container');
      const title = document.querySelector('.guide-hero-title');

      if (!title) return { error: 'Title element not found' };

      const titleStyle = window.getComputedStyle(title);
      const containerStyle = container ? window.getComputedStyle(container) : null;
      const sectionStyle = section ? window.getComputedStyle(section) : null;

      const titleRect = title.getBoundingClientRect();
      const containerRect = container ? container.getBoundingClientRect() : { width: 0, height: 0 };
      const sectionRect = section ? section.getBoundingClientRect() : { width: 0, height: 0 };

      return {
        classList: Array.from(title.classList),
        sectionWidth: sectionRect.width,
        containerWidth: containerRect.width,
        titleWidth: titleRect.width,
        titleScrollWidth: title.scrollWidth,
        titleClientWidth: title.clientWidth,
        titleScrollHeight: title.scrollHeight,
        titleClientHeight: title.clientHeight,
        titleMaxWidth: titleStyle.maxWidth,
        containerMaxWidth: containerStyle ? containerStyle.maxWidth : 'N/A',
        sectionPadding: sectionStyle ? sectionStyle.padding : 'N/A',
        isOverflowingV: title.scrollHeight > title.clientHeight,
        lineCount: title.getClientRects().length,
        titleText: title.innerText.replace(/\n/g, ' ')
      };
    });
  };

  const before = await getMetrics();

  // Apply max-w-7xl (80rem = 1280px)
  await page.evaluate(() => {
    const container = document.querySelector('.guide-hero-container');
    const title = document.querySelector('.guide-hero-title');
    if (container) container.style.maxWidth = '80rem';
    if (title) title.style.maxWidth = '80rem';
  });

  // Give a small moment for layout re-calculation
  await new Promise(r => setTimeout(r, 100));

  const after = await getMetrics();

  return { before, after };
}

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  const results = [];

  for (const p of pages) {
    console.log(`Measuring ${p.name}...`);
    try {
      const data = await measure(page, p.url);
      results.push({ name: p.name, ...data });
    } catch (e) {
      console.error(`Error measuring ${p.name}: ${e.message}`);
    }
  }

  console.log(JSON.stringify(results, null, 2));

  await browser.close();
})();
