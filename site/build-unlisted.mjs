import fs from 'node:fs/promises';
import path from 'node:path';
import { marked } from 'marked';

// Deliberately separate from content.json: no sidebar, search, sitemap,
// homepage listing, or previous/next entry. No SPA boot on these pages.
export async function buildUnlistedPages({ repoRoot, outDir, basePath, stylesName }) {
  const base = basePath === 'auto' ? '../' : basePath;
  const markdown = await fs.readFile(path.join(repoRoot, 'docs/hosted-beta.md'), 'utf8');
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, follow">
<title>Welcome to the Paperclip hosted beta</title>
<link rel="stylesheet" href="${base}${stylesName}">
<style>
body { display: block; overflow: auto; }
.beta-shell { max-width: 824px; margin: 0 auto; padding: 32px; }
.beta-header { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding-bottom: 24px; margin-bottom: 40px; border-bottom: 1px solid var(--stone); font-family: var(--font-body); }
.beta-header a { color: var(--ink); text-decoration: none; }
.beta-header a:first-child { font-weight: 650; font-size: 20px; }
.beta-header a:last-child { font-size: 14px; text-decoration: underline; }
@media (max-width: 600px) { .beta-shell { padding: 24px 20px; } .beta-header { margin-bottom: 28px; } }
</style>
</head>
<body><div class="beta-shell">
<header class="beta-header"><a href="${base}">Paperclip Docs</a><a href="https://my.paperclip.app/">Sign in to Paperclip</a></header>
<main><article id="article">${marked.parse(markdown)}</article></main>
</div></body></html>`;
  await fs.mkdir(path.join(outDir, 'hosted-beta'), { recursive: true });
  await fs.writeFile(path.join(outDir, 'hosted-beta/index.html'), html);
}
