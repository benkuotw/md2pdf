const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const MarkdownIt = require('markdown-it');
const markdownItGithubAlerts = require('markdown-it-github-alerts');

async function main() {
  const inputFile = process.argv[2];
  if (!inputFile) {
    console.error('Usage: node convert.js <input.md>');
    process.exit(1);
  }

  const inputPath = path.resolve(inputFile);
  const outputPath = inputPath.replace(/\.md$/, '.pdf');

  if (!fs.existsSync(inputPath)) {
    console.error(`File not found: ${inputPath}`);
    process.exit(1);
  }

  const markdownContent = fs.readFileSync(inputPath, 'utf8');

  const Prism = require('prismjs');
  const loadLanguages = require('prismjs/components/');
  loadLanguages(['bash', 'javascript', 'typescript', 'json', 'css', 'html', 'python', 'java', 'go', 'rust', 'yaml', 'sql']);

  const md = new MarkdownIt({ 
    html: true, 
    breaks: true, 
    linkify: true,
    highlight: function (str, lang) {
      let language = lang || 'bash';
      try {
        if (!Prism.languages[language]) {
          loadLanguages([language]);
        }
        if (Prism.languages[language]) {
          return Prism.highlight(str, Prism.languages[language], language);
        }
      } catch (__) {}
      return ''; // use external default escaping
    }
  }).use(markdownItGithubAlerts.default);

  // Inject code header using the fence rule
  const defaultFenceRender = md.renderer.rules.fence;
  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const language = token.info.trim() || 'bash';
    const headerHtml = `<div class="code-header"><span class="lang-label">${language}</span><svg class="copy-icon" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg></div>`;
    
    // We wrap both in a container to ensure they stay together and margins don't collapse weirdly
    return `<div class="code-block-container" style="margin-bottom: 16px;">` + headerHtml + defaultFenceRender(tokens, idx, options, env, self).replace(/margin-bottom: [^;]+;?/, '') + `</div>`;
  };

  // Enable fuzzy links (e.g. linkedin.com) and set TLDs
  const tlds = require('tlds');
  md.linkify.set({ fuzzyLink: true, fuzzyEmail: true });
  md.linkify.tlds(tlds, true);

  // Force all http links to https (crucial for PDFs where auto-detected links might default to http)
  const defaultNormalize = md.normalizeLink;
  md.normalizeLink = function (url) {
    if (url.startsWith('http://') && !url.includes('localhost')) {
      url = url.replace('http://', 'https://');
    }
    return defaultNormalize.call(this, url);
  };

  // Allow file:// links
  md.validateLink = () => true;

  let htmlContent = md.render(markdownContent);

  // Post-process file links to look like file pills without icons
  htmlContent = htmlContent.replace(/<a href="file:\/\/[^"]+">([^<]+)<\/a>/g, (match, filename) => {
    return `<span class="file-pill" style="font-weight: 600; color: #24292f; display: inline-flex; align-items: center;">${filename}</span>`;
  });

  // Read CSS files
  const githubCssPath = path.join(__dirname, '..', 'node_modules', 'github-markdown-css', 'github-markdown-light.css');
  const customCssPath = path.join(__dirname, 'style.css');
  
  const githubCss = fs.existsSync(githubCssPath) ? fs.readFileSync(githubCssPath, 'utf8') : '';
  const customCss = fs.readFileSync(customCssPath, 'utf8');

  const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    ${githubCss}
    ${customCss}
  </style>
</head>
<body class="markdown-body">
  ${htmlContent}
</body>
</html>
`;

  console.log('Launching Puppeteer...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
  
  console.log(`Saving PDF to ${outputPath}...`);
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20mm',
      right: '20mm',
      bottom: '20mm',
      left: '20mm'
    }
  });

  await browser.close();
  console.log('Done!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
