import { useState, useMemo, createContext, useContext, useEffect, useRef } from "react";

// ─── Themes ───────────────────────────────────────────────────────────────────
const themes = {
  dark: {
    name: "Dark", icon: "🌙",
    bg: "#0f1117", surface: "#161b22", surfaceHigh: "#1c2128",
    border: "#30363d", accent: "#58a6ff", accentDim: "#0d1f3a",
    purple: "#bc8cff", purpleDim: "#1e1040",
    blue: "#79c0ff", yellow: "#e3b341", red: "#ff7b72",
    green: "#56d364", teal: "#39d0d8",
    text: "#e6edf3", muted: "#8b949e", faint: "#484f58",
    codeBg: "#161b22", codeText: "#e6edf3",
    calloutInfoBg: "#0d1f3a", calloutInfoBorder: "#1f6feb",
    calloutTipBg: "#0d2b1a", calloutTipBorder: "#238636",
    calloutWarnBg: "#2b1d0d", calloutWarnBorder: "#9e6a03",
    navActive: "#58a6ff", navActiveBg: "rgba(88,166,255,0.1)",
    tocActive: "#58a6ff",
    headerBg: "#0d1117",
    headerBorder: "#30363d",
    inlineCode: "#f0f6fc", inlineCodeBg: "rgba(110,118,129,0.15)",
    link: "#58a6ff",
  },
  light: {
    name: "Light", icon: "☀️",
    bg: "#ffffff", surface: "#f6f8fa", surfaceHigh: "#eaeef2",
    border: "#d0d7de", accent: "#0969da", accentDim: "#ddf4ff",
    purple: "#8250df", purpleDim: "#fbefff",
    blue: "#0969da", yellow: "#9a6700", red: "#cf222e",
    green: "#1a7f37", teal: "#0598a9",
    text: "#1f2328", muted: "#636c76", faint: "#afb8c1",
    codeBg: "#f6f8fa", codeText: "#1f2328",
    calloutInfoBg: "#ddf4ff", calloutInfoBorder: "#54aeff",
    calloutTipBg: "#dafbe1", calloutTipBorder: "#2da44e",
    calloutWarnBg: "#fff8c5", calloutWarnBorder: "#d4a72c",
    navActive: "#0969da", navActiveBg: "rgba(9,105,218,0.08)",
    tocActive: "#0969da",
    headerBg: "#ffffff",
    headerBorder: "#d0d7de",
    inlineCode: "#1f2328", inlineCodeBg: "rgba(175,184,193,0.2)",
    link: "#0969da",
  },
  ocean: {
    name: "Ocean", icon: "🌊",
    bg: "#071220", surface: "#0c1a2e", surfaceHigh: "#122338",
    border: "#1a3050", accent: "#38bdf8", accentDim: "#0a2035",
    purple: "#a78bfa", purpleDim: "#1a1040",
    blue: "#7dd3fc", yellow: "#fde68a", red: "#fb7185",
    green: "#4ade80", teal: "#2dd4bf",
    text: "#cbd9ed", muted: "#5e7a9a", faint: "#2a4060",
    codeBg: "#040c18", codeText: "#cbd9ed",
    calloutInfoBg: "#0a2035", calloutInfoBorder: "#0284c7",
    calloutTipBg: "#052018", calloutTipBorder: "#16a34a",
    calloutWarnBg: "#1c1008", calloutWarnBorder: "#ca8a04",
    navActive: "#38bdf8", navActiveBg: "rgba(56,189,248,0.1)",
    tocActive: "#38bdf8",
    headerBg: "#060f1a",
    headerBorder: "#1a3050",
    inlineCode: "#cbd9ed", inlineCodeBg: "rgba(56,189,248,0.1)",
    link: "#38bdf8",
  },
  forest: {
    name: "Forest", icon: "🌿",
    bg: "#0a1209", surface: "#111a10", surfaceHigh: "#182416",
    border: "#1e3020", accent: "#86efac", accentDim: "#0d2210",
    purple: "#c084fc", purpleDim: "#1e1030",
    blue: "#67e8f9", yellow: "#fde047", red: "#f87171",
    green: "#4ade80", teal: "#2dd4bf",
    text: "#d1edd0", muted: "#5c7a5a", faint: "#2a3f28",
    codeBg: "#060e05", codeText: "#d1edd0",
    calloutInfoBg: "#0d2210", calloutInfoBorder: "#16a34a",
    calloutTipBg: "#0a1e08", calloutTipBorder: "#86efac",
    calloutWarnBg: "#1a1505", calloutWarnBorder: "#ca8a04",
    navActive: "#86efac", navActiveBg: "rgba(134,239,172,0.1)",
    tocActive: "#86efac",
    headerBg: "#060e05",
    headerBorder: "#1e3020",
    inlineCode: "#d1edd0", inlineCodeBg: "rgba(134,239,172,0.1)",
    link: "#86efac",
  },
};

// ─── Translations ─────────────────────────────────────────────────────────────
const langs = {
  en: { name: "English", flag: "🌐", dir: "ltr",
    ui: { search: "Search documentation...", onThisPage: "On This Page", feedback: "Question? Give us feedback →", editPage: "Edit this page on GitHub →", previous: "Previous", next: "Next", theme: "Theme", language: "Language", docs: "Docs" },
    nav: { "getting-started":"Getting Started","introduction":"Introduction","quickstart":"Quick Start","core-concepts":"Core Concepts","syntax":"MDX Syntax","frontmatter":"Frontmatter","components":"Using Components","advanced":"Advanced","plugins":"Plugins","typescript":"TypeScript","reference":"Reference","cheatsheet":"Cheat Sheet","faq":"FAQ" },
  },
  es: { name: "Español", flag: "🇪🇸", dir: "ltr",
    ui: { search: "Buscar documentación...", onThisPage: "En Esta Página", feedback: "¿Preguntas? Danos tu opinión →", editPage: "Editar esta página en GitHub →", previous: "Anterior", next: "Siguiente", theme: "Tema", language: "Idioma", docs: "Docs" },
    nav: { "getting-started":"Primeros Pasos","introduction":"Introducción","quickstart":"Inicio Rápido","core-concepts":"Conceptos Clave","syntax":"Sintaxis MDX","frontmatter":"Frontmatter","components":"Usar Componentes","advanced":"Avanzado","plugins":"Plugins","typescript":"TypeScript","reference":"Referencia","cheatsheet":"Referencia Rápida","faq":"Preguntas Frecuentes" },
  },
  fr: { name: "Français", flag: "🇫🇷", dir: "ltr",
    ui: { search: "Rechercher...", onThisPage: "Sur Cette Page", feedback: "Des questions ? Donnez-nous votre avis →", editPage: "Modifier cette page sur GitHub →", previous: "Précédent", next: "Suivant", theme: "Thème", language: "Langue", docs: "Docs" },
    nav: { "getting-started":"Démarrage","introduction":"Introduction","quickstart":"Démarrage Rapide","core-concepts":"Concepts Clés","syntax":"Syntaxe MDX","frontmatter":"Frontmatter","components":"Utiliser des Composants","advanced":"Avancé","plugins":"Plugins","typescript":"TypeScript","reference":"Référence","cheatsheet":"Aide-mémoire","faq":"FAQ" },
  },
  ar: { name: "العربية", flag: "🇸🇦", dir: "rtl",
    ui: { search: "البحث في التوثيق...", onThisPage: "في هذه الصفحة", feedback: "سؤال؟ أعطنا رأيك →", editPage: "تعديل هذه الصفحة على GitHub →", previous: "السابق", next: "التالي", theme: "المظهر", language: "اللغة", docs: "التوثيق" },
    nav: { "getting-started":"البداية","introduction":"مقدمة","quickstart":"البدء السريع","core-concepts":"المفاهيم الأساسية","syntax":"صياغة MDX","frontmatter":"Frontmatter","components":"استخدام المكونات","advanced":"متقدم","plugins":"الإضافات","typescript":"TypeScript","reference":"مرجع","cheatsheet":"ورقة مرجعية","faq":"الأسئلة الشائعة" },
  },
};

// ─── Page content ─────────────────────────────────────────────────────────────
const pages = {
  introduction: {
    id: "introduction", file: "introduction.mdx", group: "getting-started",
    toc: ["What is MDX", "Why MDX", "How it works", "Installation"],
    body: (tr) => [
      { type: "callout", variant: "info", title: "Target audience:", text: "MDX is an authorable format that lets you use JSX in your Markdown content. Import interactive charts, alerts, or any React component and embed them within your content." },
      { type: "p", text: "MDX is a superset of Markdown — everything you know still works. The key difference is that you can import and use React components directly inside your .mdx files, bridging the gap between static content and dynamic UI." },
      { type: "h2", text: "Why MDX?", id: "why-mdx" },
      { type: "p", text: "Traditional Markdown is great for static content but falls short when you need interactivity. MDX bridges this gap by letting you embed fully-functional React components alongside your prose — no hacks, no workarounds." },
      { type: "h2", text: "How it works", id: "how-it-works" },
      { type: "p", text: "MDX files are compiled by a bundler plugin at build time. The compiler transforms your .mdx file into a React component you can import and render like any other component — zero runtime overhead." },
      { type: "h2", text: "Installation", id: "installation" },
      { type: "code", lang: "bash", raw: "npm install @mdx-js/react @mdx-js/rollup\n\n# Or with Next.js\nnpm install @next/mdx @mdx-js/loader" },
    ],
  },
  quickstart: {
    id: "quickstart", file: "quickstart.mdx", group: "getting-started",
    toc: ["Install dependencies", "Configure bundler", "Create .mdx file", "Import and render"],
    body: () => [
      { type: "p", text: "Get MDX running in your project in under 5 minutes. Choose your bundler and follow the steps below." },
      { type: "h2", text: "1. Install dependencies", id: "install-dependencies" },
      { type: "code", lang: "bash", raw: "npm install @mdx-js/react @mdx-js/rollup" },
      { type: "h2", text: "2. Configure your bundler", id: "configure-bundler" },
      { type: "code", lang: "js", raw: `// vite.config.js\nimport { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\nimport mdx from '@mdx-js/rollup'\n\nexport default defineConfig({\n  plugins: [\n    { enforce: 'pre', ...mdx() },\n    react({ include: /\\.(jsx|js|mdx|md)$/ }),\n  ],\n})` },
      { type: "h2", text: "3. Create your first .mdx file", id: "create-mdx-file" },
      { type: "code", lang: "mdx", raw: `---\ntitle: Hello MDX\n---\n\nimport { Button } from './Button'\n\n# Hello, MDX!\n\nThis is **Markdown** with a React component:\n\n<Button onClick={() => alert('Hi!')}>\n  Click me!\n</Button>` },
      { type: "h2", text: "4. Import and render", id: "import-render" },
      { type: "code", lang: "jsx", raw: `import Hello from './hello.mdx'\n\nexport default function App() {\n  return <Hello />\n}` },
      { type: "callout", variant: "tip", title: "Done!", text: "Your .mdx file is now a fully working React component that you can import and use anywhere." },
    ],
  },
  syntax: {
    id: "syntax", file: "syntax.mdx", group: "core-concepts",
    toc: ["Markdown unchanged", "Imports at the top", "JSX expressions", "Named exports", "Rules"],
    body: () => [
      { type: "p", text: "MDX supports the full CommonMark specification plus JSX. Here's a comprehensive tour of everything you can write in an .mdx file." },
      { type: "h2", text: "Markdown is unchanged", id: "markdown-unchanged" },
      { type: "p", text: "All standard Markdown syntax works exactly as you'd expect — headings, bold, italic, code, lists, tables, blockquotes, and more." },
      { type: "code", lang: "mdx", raw: `## A heading\n\nSome paragraph with **bold**, _italic_, and \`code\`.\n\n- List item one\n- List item two\n\n> A blockquote` },
      { type: "h2", text: "Imports at the top", id: "imports-at-top" },
      { type: "p", text: "Place all import statements at the very top of the file, before any Markdown content. Imports cannot appear mid-document." },
      { type: "code", lang: "mdx", raw: `import { Chart, Table } from './components'\nimport data from './data.json'\n\n# My Document\n\n<Chart data={data.sales} />` },
      { type: "h2", text: "JSX expressions", id: "jsx-expressions" },
      { type: "code", lang: "mdx", raw: `export const version = "3.0"\n\nCurrent version: {version}\nToday is {new Date().toLocaleDateString()}` },
      { type: "h2", text: "Rules & gotchas", id: "rules" },
      { type: "rules", items: [
        "Imports must come before all Markdown content",
        "JSX components must be closed — use <Comp /> for self-closing",
        "Use className not class, htmlFor not for",
        "Style props take objects: style={{ color: 'red' }}",
        "Comments inside JSX use {/* */} syntax",
      ]},
    ],
  },
  frontmatter: {
    id: "frontmatter", file: "frontmatter.mdx", group: "core-concepts",
    toc: ["YAML frontmatter", "Named exports", "Accessing metadata"],
    body: () => [
      { type: "p", text: "MDX supports two ways to attach metadata to a file: YAML frontmatter between --- fences, and JavaScript named exports." },
      { type: "h2", text: "YAML Frontmatter", id: "yaml-frontmatter" },
      { type: "code", lang: "mdx", raw: `---\ntitle: Getting Started\ndescription: Learn the basics\nauthor: Jane Doe\ndate: 2026-01-01\ntags: [mdx, docs]\ndraft: false\n---\n\n# Getting Started` },
      { type: "h2", text: "Named Exports", id: "named-exports" },
      { type: "code", lang: "mdx", raw: `export const meta = {\n  readTime: "8 min",\n  difficulty: "intermediate",\n  version: 3\n};\n\nRead time: {meta.readTime}\n\n// Or import from another file\nimport { meta } from './page.mdx'` },
      { type: "callout", variant: "warning", title: "Note:", text: "Frontmatter is not automatically available as a JavaScript variable. Use remark-frontmatter + remark-mdx-frontmatter to expose it as an export." },
    ],
  },
  components: {
    id: "components", file: "components.mdx", group: "core-concepts",
    toc: ["Local imports", "Global components", "MDXProvider", "Best practices"],
    body: () => [
      { type: "p", text: "The defining feature of MDX is the ability to import and use React components directly in your content. Components make your docs interactive and maintainable." },
      { type: "h2", text: "Local imports", id: "local-imports" },
      { type: "code", lang: "mdx", raw: `import { Callout } from '../../components/Callout'\n\n## Installation\n\n<Callout type="tip">\n  Always pin your MDX version in production!\n</Callout>` },
      { type: "h2", text: "MDXProvider — global components", id: "mdxprovider" },
      { type: "p", text: "Wrap your app with MDXProvider to inject components available in all MDX files without importing them every time." },
      { type: "code", lang: "jsx", raw: `import { MDXProvider } from '@mdx-js/react'\n\nconst components = {\n  // Override HTML elements\n  h1: (props) => <h1 className="heading" {...props} />,\n  code: SyntaxHighlighter,\n  // Provide global components\n  Callout,\n  Note,\n};\n\n<MDXProvider components={components}>\n  <App />\n</MDXProvider>` },
      { type: "h2", text: "Best practices", id: "best-practices" },
      { type: "rules", items: [
        "Create a shared components barrel file for easy importing",
        "Use MDXProvider for site-wide components like Callout, Note, Badge",
        "Keep component imports at the top — never inline",
        "Test components in isolation before embedding in MDX",
      ]},
    ],
  },
  plugins: {
    id: "plugins", file: "plugins.mdx", group: "advanced",
    toc: ["Common plugins", "Adding plugins", "Plugin order"],
    body: () => [
      { type: "p", text: "MDX uses the unified ecosystem — the same pipeline as remark and rehype. You can plug in any remark or rehype plugin to transform your content." },
      { type: "h2", text: "Common plugins", id: "common-plugins" },
      { type: "table", headers: ["Plugin", "Purpose"], rows: [
        ["remark-gfm", "GitHub Flavored Markdown: tables, strikethrough, task lists, autolinks"],
        ["rehype-slug", "Adds id attributes to headings for anchor linking"],
        ["rehype-highlight", "Syntax highlighting for code blocks via highlight.js"],
        ["remark-toc", "Generates a table of contents from headings automatically"],
      ]},
      { type: "h2", text: "Adding plugins", id: "adding-plugins" },
      { type: "code", lang: "js", raw: `// vite.config.js\nimport mdx from '@mdx-js/rollup'\nimport remarkGfm from 'remark-gfm'\nimport rehypeHighlight from 'rehype-highlight'\n\nexport default {\n  plugins: [\n    mdx({\n      remarkPlugins: [remarkGfm],\n      rehypePlugins: [rehypeHighlight],\n    }),\n  ]\n}` },
      { type: "callout", variant: "info", title: "Tip:", text: "Remark plugins transform the Markdown AST. Rehype plugins transform the HTML AST. Most MDX transformations happen at the remark level." },
    ],
  },
  typescript: {
    id: "typescript", file: "typescript.mdx", group: "advanced",
    toc: ["Typing components", "Module declarations", "tsconfig setup"],
    body: () => [
      { type: "p", text: "MDX has first-class TypeScript support. Type your component props, frontmatter, and named exports for a fully type-safe documentation site." },
      { type: "h2", text: "Typing MDX components", id: "typing-components" },
      { type: "code", lang: "tsx", raw: `interface CalloutProps {\n  type: "info" | "tip" | "warning"\n  children: React.ReactNode\n}\n\nexport function Callout({ type, children }: CalloutProps) {\n  return <div data-type={type}>{children}</div>\n}` },
      { type: "h2", text: "Declare module for .mdx files", id: "module-declarations" },
      { type: "code", lang: "ts", raw: `// mdx.d.ts — put in your project root\ndeclare module '*.mdx' {\n  import type { ComponentType } from 'react'\n  const MDXComponent: ComponentType\n  export default MDXComponent\n}` },
      { type: "callout", variant: "tip", title: "Setup:", text: "Add mdx.d.ts to your tsconfig.json includes array to ensure TypeScript picks it up across the entire project." },
    ],
  },
  cheatsheet: {
    id: "cheatsheet", file: "cheatsheet.mdx", group: "reference",
    toc: ["File anatomy", "Prop types", "HTML differences"],
    body: () => [
      { type: "p", text: "A quick reference for all MDX syntax. Bookmark this page." },
      { type: "h2", text: "File anatomy", id: "file-anatomy" },
      { type: "code", lang: "mdx", raw: `---\ntitle: My Page\n---\n\n↑ 1. Frontmatter (optional YAML)\n\nimport { Comp } from './Comp'\n\n↑ 2. Imports\n\nexport const meta = { readTime: "3 min" }\n\n↑ 3. Exports\n\n# Heading\n\nMarkdown prose with **bold** and \`code\`.\n\n<Comp prop="value" />\n\n↑ 4. Markdown + JSX content` },
      { type: "h2", text: "Prop types", id: "prop-types" },
      { type: "table", headers: ["Syntax", "Example"], rows: [
        ["String", 'prop="value"'],
        ["Expression", "prop={variable}"],
        ["Boolean", "disabled"],
        ["Spread", "{...props}"],
        ["Event", "onClick={() => fn()}"],
      ]},
      { type: "h2", text: "HTML vs JSX differences", id: "html-differences" },
      { type: "table", headers: ["HTML", "JSX/MDX"], rows: [
        ["class", "className"],
        ["for", "htmlFor"],
        ['style="color:red"', "style={{ color: 'red' }}"],
        ["<!-- comment -->", "{/* comment */}"],
      ]},
    ],
  },
  faq: {
    id: "faq", file: "faq.mdx", group: "reference",
    toc: ["Is MDX the same as Markdown", "Do I need React", "Can I use Next.js", "Performance", "Can I use hooks"],
    body: () => [
      { type: "faq", items: [
        { q: "Is MDX the same as Markdown?", a: "MDX is a superset of Markdown. All valid Markdown is valid MDX, but MDX adds JSX support on top." },
        { q: "Do I need React to use MDX?", a: "MDX is React-focused by default, but integrations exist for Preact, Vue (via Astro), and Svelte." },
        { q: "Can I use MDX with Next.js?", a: "Yes! Install @next/mdx and configure next.config.js. MDX pages are fully supported in both App Router and Pages Router." },
        { q: "Is MDX good for performance?", a: "Yes. MDX compiles to static React components at build time — there is no runtime parsing overhead in production." },
        { q: "Can I use hooks inside MDX?", a: "Yes, you can define and use React hooks in MDX. However, it's better practice to extract complex logic into a dedicated component." },
      ]},
    ],
  },
};

const navGroups = [
  { id: "getting-started", pages: ["introduction", "quickstart"] },
  { id: "core-concepts",   pages: ["syntax", "frontmatter", "components"] },
  { id: "advanced",        pages: ["plugins", "typescript"] },
  { id: "reference",       pages: ["cheatsheet", "faq"] },
];

const allPageIds = navGroups.flatMap(g => g.pages);

// ─── Context ──────────────────────────────────────────────────────────────────
const Ctx = createContext(null);
const useCtx = () => useContext(Ctx);

// ─── Block renderers ──────────────────────────────────────────────────────────
function InlineCode({ children }) {
  const { theme } = useCtx();
  return <code style={{ background: theme.inlineCodeBg, color: theme.inlineCode, padding: "1px 5px", borderRadius: "4px", fontSize: "85%", fontFamily: "'JetBrains Mono','Fira Code',monospace" }}>{children}</code>;
}

function CodeBlock({ lang, raw }) {
  const { theme } = useCtx();
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard?.writeText(raw); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div style={{ position: "relative", margin: "16px 0", borderRadius: "6px", border: `1px solid ${theme.border}`, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: theme.surfaceHigh, padding: "6px 14px", borderBottom: `1px solid ${theme.border}` }}>
        <span style={{ color: theme.muted, fontSize: "11px", fontFamily: "monospace", letterSpacing: "1px" }}>{lang}</span>
        <button onClick={copy} style={{ background: "none", border: "none", color: copied ? theme.green : theme.muted, cursor: "pointer", fontSize: "11px", fontFamily: "monospace", padding: "2px 6px" }}>
          {copied ? "✓ copied" : "copy"}
        </button>
      </div>
      <pre style={{ background: theme.codeBg, margin: 0, padding: "18px 20px", fontSize: "13px", lineHeight: "1.75", fontFamily: "'JetBrains Mono','Fira Code',monospace", overflowX: "auto", color: theme.codeText }}>{raw}</pre>
    </div>
  );
}

function Callout({ variant, title, text }) {
  const { theme } = useCtx();
  const cfgs = {
    info:    { bg: theme.calloutInfoBg,  border: theme.calloutInfoBorder,  icon: "ℹ", iconColor: theme.blue },
    tip:     { bg: theme.calloutTipBg,   border: theme.calloutTipBorder,   icon: "✓", iconColor: theme.green },
    warning: { bg: theme.calloutWarnBg,  border: theme.calloutWarnBorder,  icon: "⚠", iconColor: theme.yellow },
  };
  const cfg = cfgs[variant] || cfgs.info;
  return (
    <div style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: "6px", padding: "16px 18px", margin: "16px 0", display: "flex", gap: "12px" }}>
      <span style={{ color: cfg.iconColor, flexShrink: 0, fontSize: "15px", marginTop: "1px" }}>{cfg.icon}</span>
      <div style={{ color: theme.text, fontSize: "14px", lineHeight: "1.7" }}>
        {title && <strong>{title} </strong>}
        {text}
      </div>
    </div>
  );
}

function RuleList({ items }) {
  const { theme } = useCtx();
  return (
    <div style={{ margin: "12px 0 16px" }}>
      {items.map((r, i) => (
        <div key={i} style={{ display: "flex", gap: "12px", padding: "6px 0", borderBottom: `1px solid ${theme.border}`, alignItems: "flex-start" }}>
          <span style={{ color: theme.accent, fontFamily: "monospace", fontSize: "12px", flexShrink: 0, minWidth: "20px" }}>{i + 1}.</span>
          <span style={{ color: theme.muted, fontSize: "14px", lineHeight: "1.6" }}>{r}</span>
        </div>
      ))}
    </div>
  );
}

function Table({ headers, rows }) {
  const { theme } = useCtx();
  return (
    <div style={{ margin: "16px 0", overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
        <thead>
          <tr style={{ background: theme.surfaceHigh }}>
            {headers.map(h => (
              <th key={h} style={{ padding: "10px 16px", textAlign: "left", color: theme.text, fontWeight: "600", fontSize: "13px", borderBottom: `2px solid ${theme.border}`, borderRight: `1px solid ${theme.border}` }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : theme.surface }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: "9px 16px", color: j === 0 ? theme.text : theme.muted, borderBottom: `1px solid ${theme.border}`, borderRight: `1px solid ${theme.border}`, fontFamily: j === 0 ? "monospace" : "inherit", fontSize: j === 0 ? "13px" : "14px" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FAQ({ items }) {
  const { theme } = useCtx();
  const [open, setOpen] = useState(null);
  return (
    <div style={{ margin: "8px 0" }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: `1px solid ${theme.border}` }}>
          <button onClick={() => setOpen(open === i ? null : i)}
            style={{ width: "100%", background: "none", border: "none", padding: "16px 0", color: theme.text, cursor: "pointer", textAlign: "left", fontSize: "15px", fontWeight: "600", display: "flex", justifyContent: "space-between", gap: "12px" }}>
            <span>{item.q}</span>
            <span style={{ color: theme.muted, flexShrink: 0, fontSize: "18px", lineHeight: 1, transition: "transform 0.2s", transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
          </button>
          {open === i && <div style={{ color: theme.muted, fontSize: "14px", lineHeight: "1.75", paddingBottom: "16px" }}>{item.a}</div>}
        </div>
      ))}
    </div>
  );
}

function PageBody({ pageId }) {
  const { tr } = useCtx();
  const page = pages[pageId];
  if (!page) return null;
  const blocks = page.body(tr);
  return (
    <div>
      {blocks.map((block, i) => {
        if (block.type === "p") return <p key={i} style={{ fontSize: "15px", lineHeight: "1.8", marginBottom: "16px" }}>{block.text}</p>;
        if (block.type === "h2") return <h2 key={i} id={block.id} style={{ fontSize: "20px", fontWeight: "700", marginTop: "36px", marginBottom: "12px", paddingTop: "8px" }}>{block.text}</h2>;
        if (block.type === "h3") return <h3 key={i} id={block.id} style={{ fontSize: "16px", fontWeight: "600", marginTop: "24px", marginBottom: "8px" }}>{block.text}</h3>;
        if (block.type === "callout") return <Callout key={i} variant={block.variant} title={block.title} text={block.text} />;
        if (block.type === "code") return <CodeBlock key={i} lang={block.lang} raw={block.raw} />;
        if (block.type === "rules") return <RuleList key={i} items={block.items} />;
        if (block.type === "table") return <Table key={i} headers={block.headers} rows={block.rows} />;
        if (block.type === "faq") return <FAQ key={i} items={block.items} />;
        return null;
      })}
    </div>
  );
}

// ─── Left sidebar ─────────────────────────────────────────────────────────────
function LeftSidebar({ activePage, onSelect, onTheme, onLang, themeName, lang }) {
  const { theme, tr, ui } = useCtx();
  const [expanded, setExpanded] = useState(() => {
    const s = {};
    navGroups.forEach(g => { s[g.id] = g.pages.includes(activePage); });
    s["getting-started"] = true;
    return s;
  });
  const toggle = id => setExpanded(p => ({ ...p, [id]: !p[id] }));

  return (
    <aside style={{ width: "240px", flexShrink: 0, borderRight: `1px solid ${theme.border}`, display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0, overflowY: "auto", background: theme.bg }}>
      <div style={{ flex: 1, padding: "16px 0" }}>
        {navGroups.map(group => {
          const isOpen = expanded[group.id];
          return (
            <div key={group.id} style={{ marginBottom: "4px" }}>
              <button onClick={() => toggle(group.id)}
                style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "6px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", color: theme.text, fontSize: "14px", fontWeight: "600", textAlign: "left" }}
              >
                <span>{tr.nav[group.id]}</span>
                <span style={{ color: theme.faint, fontSize: "10px", transition: "transform 0.2s", display: "inline-block", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
              </button>
              {isOpen && (
                <div style={{ paddingBottom: "4px" }}>
                  {group.pages.map(pageId => {
                    const isActive = pageId === activePage;
                    return (
                      <button key={pageId} onClick={() => onSelect(pageId)}
                        style={{ width: "100%", background: isActive ? theme.navActiveBg : "none", border: "none", borderLeft: isActive ? `2px solid ${theme.navActive}` : "2px solid transparent", padding: "5px 16px 5px 30px", cursor: "pointer", textAlign: "left", color: isActive ? theme.navActive : theme.muted, fontSize: "14px", display: "block" }}
                        onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = theme.text; }}
                        onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = theme.muted; }}
                      >
                        {tr.nav[pageId]}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom controls */}
      <div style={{ borderTop: `1px solid ${theme.border}`, padding: "12px 16px", display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Language select */}
        <button onClick={onLang}
          style={{ flex: 1, background: "none", border: `1px solid ${theme.border}`, borderRadius: "6px", padding: "6px 10px", cursor: "pointer", color: theme.muted, fontSize: "13px", display: "flex", alignItems: "center", gap: "6px", fontFamily: "inherit" }}
        >
          <span>{langs[lang].flag}</span>
          <span>{langs[lang].name}</span>
        </button>
        {/* Theme toggle */}
        <button onClick={onTheme}
          style={{ background: "none", border: `1px solid ${theme.border}`, borderRadius: "6px", padding: "6px 8px", cursor: "pointer", color: theme.muted, fontSize: "16px" }}
          title={ui.theme}
        >
          {themes[themeName].icon}
        </button>
      </div>
    </aside>
  );
}

// ─── Right TOC sidebar ────────────────────────────────────────────────────────
function TocSidebar({ pageId, activeSection }) {
  const { theme, ui } = useCtx();
  const page = pages[pageId];
  if (!page || !page.toc?.length) return <div style={{ width: "220px", flexShrink: 0 }} />;

  return (
    <aside style={{ width: "220px", flexShrink: 0, padding: "32px 0 32px 24px" }}>
      <div style={{ position: "sticky", top: "80px" }}>
        <div style={{ color: theme.text, fontSize: "13px", fontWeight: "700", marginBottom: "12px" }}>{ui.onThisPage}</div>
        <nav>
          {page.toc.map((item, i) => {
            const isActive = i === activeSection;
            return (
              <a key={i} href="#"
                onClick={e => e.preventDefault()}
               style={{
  display: "block",
  color: isActive ? theme.tocActive : theme.muted,
  fontSize: "13px",
  lineHeight: "1.5",
  padding: "3px 0",
  textDecoration: "none",
  fontWeight: isActive ? "600" : "400",
  borderLeft: isActive ? `2px solid ${theme.tocActive}` : "2px solid transparent",
  paddingLeft: isActive ? "8px" : item.startsWith("  ") ? "12px" : "0",
  transition: "color 0.15s"
}}
              >
                {item.trim()}
              </a>
            );
          })}
        </nav>
        <div style={{ marginTop: "32px", borderTop: `1px solid ${theme.border}`, paddingTop: "16px" }}>
          <a href="#" style={{ display: "block", color: theme.muted, fontSize: "13px", lineHeight: "1.8", textDecoration: "none" }}
            onMouseEnter={e => e.currentTarget.style.color = theme.link}
            onMouseLeave={e => e.currentTarget.style.color = theme.muted}
          >{ui.feedback}</a>
          <a href="#" style={{ display: "block", color: theme.muted, fontSize: "13px", lineHeight: "1.8", textDecoration: "none" }}
            onMouseEnter={e => e.currentTarget.style.color = theme.link}
            onMouseLeave={e => e.currentTarget.style.color = theme.muted}
          >{ui.editPage}</a>
        </div>
      </div>
    </aside>
  );
}

// ─── Top header ───────────────────────────────────────────────────────────────
function Header({ onSearch }) {
  const { theme, ui } = useCtx();
  return (
    <header style={{ height: "60px", background: theme.headerBg, borderBottom: `1px solid ${theme.headerBorder}`, display: "flex", alignItems: "center", padding: "0 24px", gap: "24px", position: "sticky", top: 0, zIndex: 100, flexShrink: 0 }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
        <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: `conic-gradient(${theme.accent}, ${theme.purple}, ${theme.red}, ${theme.accent})` }} />
        <span style={{ color: theme.text, fontWeight: "700", fontSize: "15px" }}>MDX Docs</span>
      </div>

      <div style={{ flex: 1 }} />

      {/* Docs link */}
      <a href="#" style={{ color: theme.text, textDecoration: "none", fontSize: "14px", fontWeight: "600" }}
        onMouseEnter={e => e.currentTarget.style.color = theme.accent}
        onMouseLeave={e => e.currentTarget.style.color = theme.text}
      >{ui.docs}</a>

      {/* Search */}
      <button onClick={onSearch}
        style={{ display: "flex", alignItems: "center", gap: "8px", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: "6px", padding: "6px 14px", cursor: "pointer", color: theme.muted, fontSize: "13px", fontFamily: "inherit", minWidth: "220px" }}
        onMouseEnter={e => e.currentTarget.style.borderColor = theme.accent}
        onMouseLeave={e => e.currentTarget.style.borderColor = theme.border}
      >
        <span style={{ fontSize: "14px" }}>🔍</span>
        <span style={{ flex: 1, textAlign: "left" }}>{ui.search}</span>
        <kbd style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}`, borderRadius: "4px", padding: "1px 6px", fontSize: "11px", fontFamily: "monospace", color: theme.faint }}>CTRL K</kbd>
      </button>

      {/* GitHub + Discord icons */}
      <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
        {["⊛", "☁"].map((icon, i) => (
          <button key={i} style={{ background: "none", border: "none", color: theme.muted, cursor: "pointer", fontSize: "18px", padding: "4px" }}
            onMouseEnter={e => e.currentTarget.style.color = theme.text}
            onMouseLeave={e => e.currentTarget.style.color = theme.muted}
          >{icon}</button>
        ))}
      </div>
    </header>
  );
}

// ─── Search modal ─────────────────────────────────────────────────────────────
function SearchModal({ onClose, onSelect }) {
  const { theme, tr, ui } = useCtx();
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    if (!query.trim()) return allPageIds.map(id => ({ id, label: tr.nav[id], group: tr.nav[pages[id]?.group] }));
    const q = query.toLowerCase();
    return allPageIds
      .filter(id => tr.nav[id]?.toLowerCase().includes(q) || pages[id]?.file?.includes(q))
      .map(id => ({ id, label: tr.nav[id], group: tr.nav[pages[id]?.group] }));
  }, [query, tr]);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "80px" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: "10px", width: "560px", maxWidth: "92vw", boxShadow: "0 40px 80px rgba(0,0,0,0.5)", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 18px", borderBottom: `1px solid ${theme.border}` }}>
          <span style={{ color: theme.muted }}>🔍</span>
          <input autoFocus value={query} onChange={e => setQuery(e.target.value)}
            placeholder={ui.search}
            style={{ flex: 1, background: "none", border: "none", outline: "none", color: theme.text, fontSize: "15px", fontFamily: "inherit" }} />
          <kbd onClick={onClose} style={{ background: theme.surfaceHigh, border: `1px solid ${theme.border}`, color: theme.muted, padding: "2px 8px", borderRadius: "4px", fontSize: "11px", cursor: "pointer" }}>ESC</kbd>
        </div>
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          {results.map(r => (
            <button key={r.id} onClick={() => { onSelect(r.id); onClose(); }}
              style={{ width: "100%", background: "none", border: "none", padding: "11px 18px", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: "12px", borderBottom: `1px solid ${theme.border}` }}
              onMouseEnter={e => e.currentTarget.style.background = theme.surfaceHigh}
              onMouseLeave={e => e.currentTarget.style.background = "none"}
            >
              <span style={{ color: theme.faint, fontSize: "14px" }}>📄</span>
              <div>
                <div style={{ color: theme.text, fontSize: "14px" }}>{r.label}</div>
                <div style={{ color: theme.faint, fontSize: "12px" }}>{r.group} · {pages[r.id]?.file}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Theme/Lang dropdowns ─────────────────────────────────────────────────────
function ThemeDropdown({ onClose, setThemeName, themeName }) {
  const { theme, ui } = useCtx();
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 500 }}>
      <div onClick={e => e.stopPropagation()} style={{ position: "fixed", bottom: "60px", left: "12px", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: "8px", padding: "6px", minWidth: "160px", boxShadow: "0 10px 30px rgba(0,0,0,0.3)", zIndex: 501 }}>
        <div style={{ color: theme.faint, fontSize: "11px", fontWeight: "600", padding: "4px 10px 6px", letterSpacing: "1px", textTransform: "uppercase" }}>{ui.theme}</div>
        {Object.entries(themes).map(([key, th]) => (
          <button key={key} onClick={() => { setThemeName(key); onClose(); }}
            style={{ width: "100%", background: themeName === key ? theme.navActiveBg : "none", border: "none", borderRadius: "6px", padding: "8px 10px", cursor: "pointer", textAlign: "left", color: themeName === key ? theme.navActive : theme.muted, fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span>{th.icon}</span><span>{th.name}</span>
            {themeName === key && <span style={{ marginLeft: "auto", color: theme.accent }}>✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function LangDropdown({ onClose, setLang, lang }) {
  const { theme, ui } = useCtx();
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 500 }}>
      <div onClick={e => e.stopPropagation()} style={{ position: "fixed", bottom: "60px", left: "12px", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: "8px", padding: "6px", minWidth: "160px", boxShadow: "0 10px 30px rgba(0,0,0,0.3)", zIndex: 501 }}>
        <div style={{ color: theme.faint, fontSize: "11px", fontWeight: "600", padding: "4px 10px 6px", letterSpacing: "1px", textTransform: "uppercase" }}>{ui.language}</div>
        {Object.entries(langs).map(([key, l]) => (
          <button key={key} onClick={() => { setLang(key); onClose(); }}
            style={{ width: "100%", background: lang === key ? theme.navActiveBg : "none", border: "none", borderRadius: "6px", padding: "8px 10px", cursor: "pointer", textAlign: "left", color: lang === key ? theme.navActive : theme.muted, fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span>{l.flag}</span><span>{l.name}</span>
            {lang === key && <span style={{ marginLeft: "auto", color: theme.accent }}>✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [themeName, setThemeName] = useState("dark");
  const [lang, setLang]           = useState("en");
  const [activePage, setActivePage] = useState("introduction");
  const [searchOpen, setSearchOpen] = useState(false);
  const [themeOpen, setThemeOpen]   = useState(false);
  const [langOpen, setLangOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const theme = themes[themeName];
  const tr    = langs[lang];
  const ui    = tr.ui;
  const dir   = tr.dir;

  const page = pages[activePage];
  const group = navGroups.find(g => g.pages.includes(activePage));
  const idx = allPageIds.indexOf(activePage);
  const prevId = allPageIds[idx - 1];
  const nextId = allPageIds[idx + 1];

  const ctx = { theme, themeName, setThemeName, lang, setLang, tr, ui };

  const handleSelect = (id) => {
    setActivePage(id);
    setActiveSection(0);
    window.scrollTo(0, 0);
  };

  return (
    <Ctx.Provider value={ctx}>
      <div dir={dir} style={{ minHeight: "100vh", background: theme.bg, color: theme.text, fontFamily: "'Inter',system-ui,sans-serif", display: "flex", flexDirection: "column" }}>
        <Header onSearch={() => setSearchOpen(true)} />

        <div style={{ display: "flex", flex: 1 }}>
          <LeftSidebar
            activePage={activePage} onSelect={handleSelect}
            themeName={themeName} lang={lang}
            onTheme={() => { setThemeOpen(v => !v); setLangOpen(false); }}
            onLang={() => { setLangOpen(v => !v); setThemeOpen(false); }}
          />

          {/* Main content */}
          <main style={{ flex: 1, minWidth: 0, display: "flex" }}>
            <div style={{ flex: 1, maxWidth: "860px", padding: "32px 40px 80px" }}>
              {/* Breadcrumb */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", fontSize: "14px", color: theme.muted }}>
                <span style={{ color: theme.accent, fontWeight: "500" }}>{ui.docs}</span>
                <span>›</span>
                <span style={{ fontWeight: "600", color: theme.text }}>{tr.nav[activePage]}</span>
              </div>

              {/* Page title */}
              <h1 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: "800", color: theme.text, marginBottom: "28px", lineHeight: 1.2, letterSpacing: "-0.5px" }}>
                {tr.nav[activePage]}
              </h1>

              {/* Frontmatter badge */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                <span style={{ background: theme.purpleDim, border: `1px solid ${theme.purple}44`, color: theme.purple, padding: "3px 9px", borderRadius: "4px", fontSize: "11px", fontFamily: "monospace", letterSpacing: "0.5px" }}>.mdx</span>
                <span style={{ color: theme.faint, fontSize: "12px", fontFamily: "monospace" }}>{page?.file}</span>
              </div>

              <PageBody pageId={activePage} />

              {/* Prev / Next nav */}
              <div style={{ marginTop: "60px", paddingTop: "24px", borderTop: `1px solid ${theme.border}`, display: "flex", justifyContent: "space-between", gap: "16px" }}>
                {prevId ? (
                  <button onClick={() => handleSelect(prevId)}
                    style={{ background: "none", border: `1px solid ${theme.border}`, borderRadius: "6px", padding: "14px 20px", cursor: "pointer", textAlign: "left", flex: 1, maxWidth: "48%" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = theme.accent}
                    onMouseLeave={e => e.currentTarget.style.borderColor = theme.border}
                  >
                    <div style={{ color: theme.muted, fontSize: "12px", marginBottom: "4px" }}>← {ui.previous}</div>
                    <div style={{ color: theme.text, fontSize: "14px", fontWeight: "600" }}>{tr.nav[prevId]}</div>
                  </button>
                ) : <div />}
                {nextId ? (
                  <button onClick={() => handleSelect(nextId)}
                    style={{ background: "none", border: `1px solid ${theme.border}`, borderRadius: "6px", padding: "14px 20px", cursor: "pointer", textAlign: "right", flex: 1, maxWidth: "48%" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = theme.accent}
                    onMouseLeave={e => e.currentTarget.style.borderColor = theme.border}
                  >
                    <div style={{ color: theme.muted, fontSize: "12px", marginBottom: "4px" }}>{ui.next} →</div>
                    <div style={{ color: theme.text, fontSize: "14px", fontWeight: "600" }}>{tr.nav[nextId]}</div>
                  </button>
                ) : <div />}
              </div>
            </div>

            <TocSidebar pageId={activePage} activeSection={activeSection} />
          </main>
        </div>

        {/* Overlays */}
        {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} onSelect={handleSelect} />}
        {themeOpen && <ThemeDropdown onClose={() => setThemeOpen(false)} setThemeName={setThemeName} themeName={themeName} />}
        {langOpen && <LangDropdown onClose={() => setLangOpen(false)} setLang={setLang} lang={lang} />}
      </div>
    </Ctx.Provider>
  );
}
