import fs from 'fs';
import path from 'path';

function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else {
      if (name.endsWith('.html')) {
        files.push(name);
      }
    }
  }
  return files;
}

const distDir = path.join(process.cwd(), 'dist');
const htmlFiles = getFiles(distDir);

let errorsCount = 0;

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  
  // Find all JSON-LD script tags
  const regex = /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  let match;
  const schemas = [];
  
  while ((match = regex.exec(content)) !== null) {
    const jsonText = match[1].trim();
    try {
      const parsed = JSON.parse(jsonText);
      schemas.push(parsed);
    } catch (e) {
      console.error(`Error parsing JSON-LD in ${file}:`, e.message);
      errorsCount++;
    }
  }

  // Check for duplicate FAQPage
  const faqPages = schemas.filter(s => s['@type'] === 'FAQPage');
  if (faqPages.length > 1) {
    console.error(`Error in ${file}: Found ${faqPages.length} FAQPage schemas!`);
    errorsCount++;
  }

  // Check for duplicate Article
  const articles = schemas.filter(s => s['@type'] === 'Article');
  if (articles.length > 1) {
    console.error(`Error in ${file}: Found ${articles.length} Article schemas!`);
    errorsCount++;
  }

  // Check for duplicate BreadcrumbList
  const breadcrumbs = schemas.filter(s => s['@type'] === 'BreadcrumbList');
  if (breadcrumbs.length > 1) {
    console.error(`Error in ${file}: Found ${breadcrumbs.length} BreadcrumbList schemas!`);
    errorsCount++;
  }
}

if (errorsCount === 0) {
  console.log(`✅ Successfully verified ${htmlFiles.length} HTML files. No duplicate schemas or JSON syntax errors found!`);
  process.exit(0);
} else {
  console.error(`❌ Verification failed with ${errorsCount} errors.`);
  process.exit(1);
}
