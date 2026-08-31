---
name: md2pdf
description: Use this skill when the user asks to convert a Markdown file into a PDF. It uses a custom Node.js script to perfectly match the Antigravity Light Mode preview panel.
---

# md2pdf Skill

This skill provides instructions on how to use the custom Markdown-to-PDF converter tool in this workspace.

## When to use this skill
Trigger this skill whenever the user asks to convert a \`.md\` (Markdown) file into a PDF, especially if they request it to look exactly like the Antigravity preview panel (with GitHub alerts and Seti UI file icons).

## Tool Location
The converter tool is located in the \`scripts/\` directory next to this \`SKILL.md\` file.

## How to use
To convert a Markdown file to a PDF, use the \`run_command\` tool to execute the \`convert.sh\` helper script inside the \`scripts/\` folder, passing the target Markdown file as the first argument.

\`\`\`bash
# Example (assuming you cd into the directory containing this SKILL.md file)
cd scripts
./convert.sh /absolute/or/relative/path/to/markdown.md
\`\`\`

This will automatically generate a \`.pdf\` file in the same directory as the input \`.md\` file, perfectly styled with:
- Antigravity Light Mode CSS (\`#f7f7f7\` background)
- San Francisco / system-ui typography with adjusted font weights for PDF readability
- GitHub Alerts (NOTE, TIP, IMPORTANT, WARNING, CAUTION)
- Seti UI styled interactive file pills for common developer extensions (\`.json\`, \`.css\`, \`.js\`, \`.sh\`, \`.md\`, etc.)

## Customization and Troubleshooting
- **CSS Styles**: To change colors, fonts, or margins, edit \`scripts/style.css\`.
- **File Icons**: To add or modify the SVG icons used for file links, edit the \`getIcon\` function inside \`scripts/convert.js\`.
- **Puppeteer Issues**: If PDF generation fails, ensure `npm install` was run inside the `md2pdf` skill root directory and Chromium was downloaded.
