---
name: md2pdf
description: Use this skill when the user asks to convert a Markdown file into a PDF. It uses a custom Node.js script whose output matches the Antigravity Light Mode preview panel.
---

# md2pdf Skill

This skill explains how to use the custom Markdown-to-PDF converter that ships with it.

## When to use this skill
Use this skill whenever the user asks to convert a `.md` (Markdown) file into a PDF, especially if they want it to look like the Antigravity preview panel (with GitHub alerts and Seti UI file icons).

## Tool Location
The converter is in the `scripts/` folder next to this `SKILL.md` file.

## How to use
Run the `convert.sh` helper script, passing the Markdown file as the first argument. The script finds its own folder, so you can run it from anywhere:

```bash
<this skill's folder>/scripts/convert.sh /absolute/or/relative/path/to/markdown.md
```

It writes a `.pdf` file next to the input `.md` file, styled with:
- Antigravity Light Mode CSS (`#f7f7f7` background)
- San Francisco / system-ui typography with font weights adjusted for PDF readability
- GitHub Alerts (NOTE, TIP, IMPORTANT, WARNING, CAUTION)
- Seti UI style file pills for common developer extensions (`.json`, `.css`, `.js`, `.sh`, `.md`, etc.)

## Customization and Troubleshooting
- **CSS Styles**: To change colors, fonts, or margins, edit `scripts/style.css`.
- **File Icons**: To add or change the SVG icons used for file links, edit the `getIcon` function in `scripts/convert.js`.
- **`Cannot find module` errors**: The dependencies aren't installed. Run `npm install` in this skill's root folder (the folder containing `package.json`).
- **Puppeteer issues**: If PDF generation fails, make sure `npm install` finished and downloaded Chromium.
