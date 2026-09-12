import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : target;
  }));
  return files.flat();
}

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

function routeForFile(file) {
  const relative = path.relative(root, file).replaceAll('\\', '/');
  if (relative === 'index.html') return '/';
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'index.html'.length)}`;
  return `/${relative}`;
}

async function targetExists(urlPath) {
  const clean = decodeURIComponent(urlPath).replace(/^\//, '');
  const direct = path.join(root, clean);
  if (await exists(direct)) return true;
  if (await exists(path.join(direct, 'index.html'))) return true;
  if (await exists(`${direct}.html`)) return true;
  return false;
}

const files = await walk(root);
const htmlFiles = files.filter((file) => file.endsWith('.html') && !file.includes(`${path.sep}admin${path.sep}`));
const errors = [];
let checkedLinks = 0;

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const route = routeForFile(file);

  if (!/<title>[^<]+<\/title>/i.test(html)) errors.push(`${route} has no page title`);
  if (!/<meta name="description" content="[^"]+"/i.test(html)) errors.push(`${route} has no search description`);
  if (!/<link rel="canonical" href="https:\/\/prillatreasures\.com[^\"]*"/i.test(html)) errors.push(`${route} has no canonical link`);
  if (!/<meta property="og:title" content="[^"]+"/i.test(html)) errors.push(`${route} has no social title`);
  if (!/<meta property="og:description" content="[^"]+"/i.test(html)) errors.push(`${route} has no social description`);
  if ((html.match(/<h1(?:\s|>)/gi) ?? []).length !== 1) errors.push(`${route} must have exactly one main heading`);
  if (/<(?:p|h[1-6]|span)[^>]*>\s*(?:SEO Title|SEO Description)\s*</i.test(html)) errors.push(`${route} exposes an editor-only SEO label`);
  if (/<li[^>]*>\s*<\/li>/i.test(html)) errors.push(`${route} contains an empty list item`);

  const imageTags = html.matchAll(/<img\b[^>]*>/gi);
  for (const image of imageTags) {
    if (!/\balt(?:\s|=|>)/i.test(image[0])) errors.push(`${route} contains an image without an alt attribute`);
  }

  const listItems = [...html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
    .map((match) => match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  for (let index = 1; index < listItems.length; index += 1) {
    if (listItems[index] === listItems[index - 1]) errors.push(`${route} contains adjacent duplicate list items`);
  }

  const attributes = html.matchAll(/(?:href|src)="([^"]*)"/gi);
  for (const match of attributes) {
    const value = match[1].trim();
    if (!value || value === '#') {
      errors.push(`${route} contains an empty or placeholder destination`);
      continue;
    }
    if (/^(mailto:|tel:|data:|https?:\/\/|#)/i.test(value)) continue;

    checkedLinks += 1;
    const target = new URL(value, `https://prillatreasures.com${route}`);
    if (!(await targetExists(target.pathname))) {
      errors.push(`${route} links to missing ${target.pathname}`);
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Audit passed: ${htmlFiles.length} pages and ${checkedLinks} internal destinations checked.`);
