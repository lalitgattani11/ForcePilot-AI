import { createRequire } from "module";
import url from "url";
import path from "path";
import fs from "fs";

const require = createRequire(import.meta.url);
const pkg = require("../package.json");
const { run } = require("react-snap");

const { reactSnap, homepage } = pkg;
const publicUrl = process.env.PUBLIC_URL || homepage;

async function main() {
  const sourceDir = path.join(process.cwd(), reactSnap.source || "dist");
  const file200 = path.join(sourceDir, "200.html");
  if (fs.existsSync(file200)) {
    fs.unlinkSync(file200);
    console.log("Cleaned up existing 200.html to allow rerunning react-snap.");
  }

  let puppeteerExecutablePath = reactSnap.puppeteerExecutablePath;
  let puppeteerArgs = reactSnap.puppeteerArgs || [];

  if (process.env.VERCEL) {
    console.log("Detected Vercel build environment. Configuring @sparticuz/chromium...");
    try {
      const chromiumModule = require("@sparticuz/chromium");
      const chromium = chromiumModule.default || chromiumModule;
      puppeteerExecutablePath = await chromium.executablePath();
      puppeteerArgs = [...puppeteerArgs, ...chromium.args];
      console.log("Using custom Chromium executable path:", puppeteerExecutablePath);
      console.log("Using custom Puppeteer arguments:", puppeteerArgs);
    } catch (e) {
      console.error("Failed to load @sparticuz/chromium:", e);
    }
  } else {
    console.log("Local environment detected. Using default react-snap chromium.");
  }

  await run({
    publicPath: publicUrl ? url.parse(publicUrl).pathname : "/",
    ...reactSnap,
    puppeteerExecutablePath,
    puppeteerArgs
  });
}

main().catch(error => {
  console.error("Prerendering failed:", error);
  process.exit(1);
});
