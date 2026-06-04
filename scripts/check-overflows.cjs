const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const fs = require('fs');

const PORT = 5199;
const HOST = `http://localhost:${PORT}`;

const BREAKPOINTS = [320, 375, 390, 430, 768];

const PAGES = [
  { name: 'Home', url: '/' },
  { name: 'Platform', url: '/platform' },
  { name: 'Mock Interview', url: '/salesforce-mock-interview' },
  { name: 'Interview Dashboard', url: '/results' },
  { name: 'Analytics', url: '/', selector: '#analytics' },
  { name: 'Salesforce Admin', url: '/salesforce-admin-interview' },
  { name: 'Apex Interview Questions', url: '/apex-interview-questions' },
  { name: 'Apex Trigger Interview Questions', url: '/apex-trigger-interview-questions' },
  { name: 'LWC Coding Interview', url: '/lwc-coding-interview' },
  { name: 'Salesforce Flow Interview Questions', url: '/salesforce-flow-interview-questions' },
  { name: 'Governor Limits Explained', url: '/governor-limits-explained' },
  { name: 'Scenario-Based Salesforce Interview', url: '/scenario-based-salesforce-interview' },
  { name: 'Blog', url: '/blog' },
  { name: 'Career Roadmap', url: '/career-roadmap' }
];

async function run() {
  console.log('Starting Vite server...');
  const server = spawn('npx', ['vite', '--port', PORT.toString(), '--strictPort'], {
    cwd: '/home/lalit/gemini-interview-app',
    shell: true
  });

  await new Promise(resolve => setTimeout(resolve, 4000));

  console.log('Launching Google Chrome...');
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const report = {};

  try {
    for (const pageInfo of PAGES) {
      report[pageInfo.name] = {};
      const page = await browser.newPage();

      for (const width of BREAKPOINTS) {
        await page.setViewport({ width, height: 1000 });
        const targetUrl = `${HOST}${pageInfo.url}?mock=true`;

        try {
          await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 15000 });
          await new Promise(resolve => setTimeout(resolve, 2000));

          if (pageInfo.selector) {
            await page.evaluate((sel) => {
              const el = document.querySelector(sel);
              if (el) el.scrollIntoView();
            }, pageInfo.selector);
            await new Promise(resolve => setTimeout(resolve, 1000));
          }

          const pageData = await page.evaluate((widthVal) => {
            const docWidth = document.documentElement.scrollWidth;
            const bodyWidth = document.body.scrollWidth;
            const viewWidth = window.innerWidth;
            const hasScroll = docWidth > viewWidth || bodyWidth > viewWidth;

            // Find elements that overflow the viewport horizontally
            const elements = Array.from(document.querySelectorAll('*'));
            const overflows = [];

            for (const el of elements) {
              const rect = el.getBoundingClientRect();
              if (rect.right > viewWidth + 0.5 && rect.width > 0) {
                // Determine if parent has overflow hidden
                let parent = el.parentElement;
                let isClipped = false;
                while (parent) {
                  const style = window.getComputedStyle(parent);
                  if (style.overflowX === 'hidden' || style.overflow === 'hidden') {
                    isClipped = true;
                    break;
                  }
                  parent = parent.parentElement;
                }

                overflows.push({
                  tag: el.tagName,
                  id: el.id || null,
                  classes: el.className || null,
                  rect: {
                    width: Math.round(rect.width),
                    right: Math.round(rect.right),
                    left: Math.round(rect.left)
                  },
                  isClipped,
                  innerText: el.innerText ? el.innerText.substring(0, 30) : ''
                });
              }
            }

            return {
              viewportWidth: viewWidth,
              scrollWidth: docWidth,
              bodyScrollWidth: bodyWidth,
              hasScroll,
              overflowCount: overflows.length,
              overflows: overflows.slice(0, 10) // limit to top 10 for report size
            };
          }, width);

          report[pageInfo.name][`${width}px`] = pageData;
        } catch (e) {
          report[pageInfo.name][`${width}px`] = { error: e.message };
        }
      }
      await page.close();
    }
  } finally {
    await browser.close();
    server.kill();

    // Write report
    const reportPath = '/home/lalit/.gemini/antigravity-cli/brain/c4c681b0-aa2c-4bf3-b8b2-bccb371997a8/overflow_report.json';
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log('Overflow report written to:', reportPath);
    process.exit(0);
  }
}

run().catch(err => {
  console.error('Overflow checker run failed:', err);
  process.exit(1);
});
