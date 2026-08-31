# md2pdf Skill

This is an Antigravity agent skill designed to seamlessly convert Markdown (`.md`) files into perfectly styled PDF documents. It identically matches the Antigravity preview pane styling, including exact typography, GitHub Light mode backgrounds, custom GitHub Alerts, and PrismJS syntax highlighting.

## Installation

1. Navigate to your project's `.agents/skills` directory:
   ```bash
   cd .agents/skills
   ```
2. Clone this repository into a directory named `md2pdf`:
   ```bash
   git clone https://github.com/benkuotw/md2pdf.git
   ```
3. Install the required Node.js dependencies:
   ```bash
   cd md2pdf
   npm install
   ```

## Usage

Once installed, simply ask your agent to convert a markdown file into a PDF:

> **/md2pdf** convert my_document.md to pdf
