# MDX Docs

A fully-featured MDX documentation site built with **React 18** and **Vite 5**.

## Getting Started

```bash
# 1. Install all dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open http://localhost:5173
```

## Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```
mdx-docs/
├── index.html
├── vite.config.js          # MDX + remark-gfm + rehype-highlight
├── package.json
├── README.md
├── .gitignore
└── src/
    ├── App.jsx             # Main app (sidebar, search, routing)
    ├── main.jsx            # Entry point
    ├── index.css           # Global styles
    ├── mdx.d.ts            # TypeScript declarations for .mdx imports
    ├── components/
    │   ├── Callout.jsx     # Info / tip / warning callout
    │   ├── CodeBlock.jsx   # Syntax-highlighted code block
    │   └── index.js        # Barrel exports
    └── pages/              # 9 real .mdx files
        ├── introduction.mdx
        ├── quickstart.mdx
        ├── syntax.mdx
        ├── frontmatter.mdx
        ├── components.mdx
        ├── plugins.mdx
        ├── typescript.mdx
        ├── cheatsheet.mdx
        └── faq.mdx
```

## Adding a New Page

1. Create a `.mdx` file in `src/pages/`
2. Add YAML frontmatter at the top
3. Register it in the `nav` array inside `src/App.jsx`

```mdx
---
title: My New Page
description: What this page covers.
---

import { Callout } from '../components/Callout'

# My New Page

<Callout type="tip">
  This is a tip!
</Callout>
```

## Dependencies

| Package | Role |
|---|---|
| `react` + `react-dom` | UI framework |
| `@mdx-js/react` | MDX React integration |
| `@mdx-js/rollup` | Vite/Rollup MDX compiler |
| `remark-gfm` | GitHub Flavored Markdown (tables, etc.) |
| `rehype-highlight` | Syntax highlighting in code blocks |
| `@vitejs/plugin-react` | React fast refresh in Vite |
