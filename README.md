# md2pdf Skill

An agent skill that converts Markdown (`.md`) files into styled PDF documents. The output matches the Antigravity preview pane: typography, GitHub Light mode backgrounds, GitHub Alerts, and PrismJS syntax highlighting.

It works with any agent that reads `SKILL.md` skills, including Claude Code and Google Antigravity. It needs Node.js.

## Installation

1. Go to the skills folder of your agent:

   | Agent | Skills folder |
   | --- | --- |
   | Claude Code (all projects) | `~/.claude/skills` |
   | Claude Code (one project) | `<project>/.claude/skills` |
   | Antigravity (one project) | `<project>/.agents/skills` |
   | Antigravity (all projects) | `~/.gemini/antigravity/skills` (check your version's docs) |

   ```bash
   cd ~/.claude/skills
   ```

2. Clone this repository into a folder named `md2pdf`:

   ```bash
   git clone https://github.com/benkuotw/md2pdf.git
   ```

3. Install the Node.js dependencies (this also downloads Chromium for Puppeteer):

   ```bash
   cd md2pdf
   npm install
   ```

## Usage

Ask your agent to convert a Markdown file:

> **/md2pdf** convert my_document.md to pdf

You can also run the script yourself:

```bash
scripts/convert.sh path/to/my_document.md
```

The PDF is written next to the Markdown file.
