import type { CSSProperties } from "react";
import {
  getRelatedTools,
  getToolBySlug,
  toolHref,
  type ToolSlug,
} from "@/data/tools";

export type LandingExample = {
  title: string;
  description: string;
  css: string;
  previewStyle: CSSProperties;
  previewLabel: string;
};

export type LandingSnippet = {
  title: string;
  code: string;
};

export type LandingEnhancement = {
  intro: string[];
  useCases: string[];
  commonMistakes: string[];
  proTips: string[];
  extraFaq: { question: string; answer: string }[];
  examples: LandingExample[];
  snippets: LandingSnippet[];
  contextualLinks: { label: string; href: string }[];
};
type LandingEnhancementOverride = Partial<LandingEnhancement>;

export const LANDING_EXAMPLE_LIMIT = 6;

const EXAMPLE_THEMES = [
  { name: "Aurora", c1: "#0f766e", c2: "#14b8a6" },
  { name: "Sunset", c1: "#f97316", c2: "#f43f5e" },
  { name: "Midnight", c1: "#1d4ed8", c2: "#0f172a" },
  { name: "Mint", c1: "#34d399", c2: "#059669" },
  { name: "Neon", c1: "#22d3ee", c2: "#9333ea" },
  { name: "Graphite", c1: "#52525b", c2: "#18181b" },
  { name: "Rose", c1: "#fb7185", c2: "#be185d" },
  { name: "Ocean", c1: "#38bdf8", c2: "#0369a1" },
  { name: "Lime", c1: "#84cc16", c2: "#3f6212" },
  { name: "Amber", c1: "#f59e0b", c2: "#b45309" },
] as const;

function cssBySlug(slug: ToolSlug, idx: number, c1: string, c2: string): string {
  switch (slug) {
    case "gradient-generator":
      return `background: linear-gradient(${(idx + 1) * 18}deg, ${c1}, ${c2});`;
    case "box-shadow-generator":
      return `background: #ffffff;\nbox-shadow: ${2 + idx}px ${6 + idx * 2}px ${14 + idx * 3}px rgb(15 23 42 / 0.${35 + idx});`;
    case "border-radius-generator":
      return `background: linear-gradient(135deg, ${c1}, ${c2});\nborder-radius: ${8 + idx * 2}px ${22 + idx * 2}px ${14 + idx}px ${20 + idx}px;`;
    case "color-palette-generator":
    case "color-converter":
      return `background: linear-gradient(120deg, ${c1}, ${c2});\ncolor: #ffffff;\npadding: 1rem;`;
    case "text-shadow-generator":
      return `color: #ffffff;\ntext-shadow: ${1 + idx}px ${2 + idx}px ${4 + idx * 1.5}px rgb(15 23 42 / 0.45);\nfont-size: 1.1rem;`;
    case "clamp-generator":
      return `font-size: clamp(1rem, ${1.1 + idx * 0.08}vw + 0.75rem, ${1.35 + idx * 0.08}rem);\nline-height: 1.4;`;
    case "transition-generator":
      return `transition: transform ${180 + idx * 25}ms cubic-bezier(0.22, 1, 0.36, 1);\nwill-change: transform;`;
    case "transform-generator":
      return `transform: translateY(${Math.max(0, 8 - idx)}px) rotate(${idx * 2}deg) scale(${1 + idx * 0.02});`;
    case "css-unit-converter":
      return `padding: ${(idx + 2) * 0.25}rem;\nfont-size: ${(idx + 11) / 16}rem;\nborder-radius: ${(idx + 6) / 16}rem;`;
    case "filter-generator":
      return `filter: saturate(${110 + idx * 8}%) contrast(${100 + idx * 6}%) brightness(${95 + idx * 3}%);`;
    case "flexbox-generator":
      return `display: flex;\njustify-content: ${idx % 2 === 0 ? "space-between" : "center"};\nalign-items: center;\ngap: ${8 + idx}px;`;
    case "grid-template-generator":
      return `display: grid;\ngrid-template-columns: repeat(${idx % 2 === 0 ? 3 : 2}, minmax(0, 1fr));\ngap: ${8 + idx}px;`;
    case "aspect-ratio-generator":
      return `aspect-ratio: ${16 - idx}:${9 - (idx % 3)};\nbackground: linear-gradient(135deg, ${c1}, ${c2});`;
    case "image-resizer-rounder":
      return `width: ${220 + idx * 12}px;\nheight: auto;\nborder-radius: ${12 + idx * 2}px;\nobject-fit: cover;`;
    case "image-crop-tool":
      return `object-fit: cover;\nobject-position: ${20 + idx * 6}% ${30 + idx * 4}%;\naspect-ratio: 4 / 3;`;
    case "image-converter":
      return `image-rendering: auto;\nmax-width: 100%;\nheight: auto;\nborder-radius: ${10 + idx}px;`;
    case "base64-image-converter":
      return `background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180'%3E%3Crect width='100%25' height='100%25' fill='${encodeURIComponent(
        c1
      )}'/%3E%3C/svg%3E\");\nbackground-size: cover;\nbackground-position: center;`;
    case "svg-generator":
      return `background: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='140'%3E%3Crect x='10' y='10' width='260' height='120' rx='${
        8 + idx
      }' fill='${encodeURIComponent(c1)}'/%3E%3C/svg%3E\") center/cover no-repeat;`;
    case "favicon-generator":
      return `width: 48px;\nheight: 48px;\nborder-radius: ${8 + idx}px;\nbackground: linear-gradient(135deg, ${c1}, ${c2});`;
    case "logo-generator":
      return `font-weight: 700;\nletter-spacing: 0.02em;\ncolor: #0f172a;\nbackground: linear-gradient(135deg, ${c1}22, ${c2}22);`;
    case "meta-tag-generator":
      return `max-width: 560px;\nline-height: 1.45;\ncolor: #111827;\nfont-size: 0.95rem;`;
    case "robots-txt-generator":
      return `font-family: ui-monospace, SFMono-Regular, Menlo, monospace;\nwhite-space: pre;\nline-height: 1.5;`;
    default:
      return `background: linear-gradient(135deg, ${c1}, ${c2});`;
  }
}

function previewStyleBySlug(
  slug: ToolSlug,
  idx: number,
  c1: string,
  c2: string
): CSSProperties {
  const base: CSSProperties = {
    borderRadius: 14,
    minHeight: 108,
    padding: "1rem",
    border: "1px solid rgb(228 228 231)",
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#0f172a",
    fontWeight: 600,
  };

  if (
    slug === "gradient-generator" ||
    slug === "color-palette-generator" ||
    slug === "color-converter" ||
    slug === "border-radius-generator"
  ) {
    return {
      ...base,
      background: `linear-gradient(${(idx + 1) * 18}deg, ${c1}, ${c2})`,
      color: "#ffffff",
    };
  }

  if (slug === "box-shadow-generator") {
    return {
      ...base,
      background: "white",
      boxShadow: `${2 + idx}px ${6 + idx * 2}px ${14 + idx * 3}px rgb(15 23 42 / 0.24)`,
    };
  }

  if (slug === "text-shadow-generator") {
    return {
      ...base,
      background: `linear-gradient(135deg, ${c1}, ${c2})`,
      color: "#ffffff",
      textShadow: `${1 + idx}px ${2 + idx}px ${4 + idx * 1.5}px rgb(15 23 42 / 0.45)`,
      fontSize: "1.05rem",
    };
  }

  return base;
}

function buildExamples(slug: ToolSlug, toolTitle: string): LandingExample[] {
  return EXAMPLE_THEMES.map((theme, idx) => {
    const css = cssBySlug(slug, idx, theme.c1, theme.c2);
    return {
      title: `${theme.name} ${toolTitle} Example`,
      description:
        `Use this as a ready-to-use css ${toolTitle.toLowerCase()} example in hero sections, cards, and modern interface layouts.`,
      css,
      previewStyle: previewStyleBySlug(slug, idx, theme.c1, theme.c2),
      previewLabel: `${toolTitle} Demo ${idx + 1}`,
    };
  });
}

function buildSnippets(slug: ToolSlug, toolTitle: string): LandingSnippet[] {
  const className = slug.replace(/-([a-z])/g, (_m, c) => c.toUpperCase());
  return [
    {
      title: "Production class snippet",
      code: `.${className}-card {\n  ${cssBySlug(slug, 1, "#0f766e", "#14b8a6").replaceAll("\n", "\n  ")}\n}`,
    },
    {
      title: "Tailwind arbitrary value example",
      code: `<div className="[${cssBySlug(slug, 2, "#f97316", "#f43f5e").replaceAll(
        "\n",
        "; "
      )}]">\n  ${toolTitle} quick preview\n</div>`,
    },
    {
      title: "Component-level CSS variables",
      code: `:root {\n  --tool-accent-a: #0ea5e9;\n  --tool-accent-b: #7c3aed;\n}\n\n.${className}-section {\n  ${cssBySlug(slug, 3, "var(--tool-accent-a)", "var(--tool-accent-b)").replaceAll(
        "\n",
        "\n  "
      )}\n}`,
    },
    {
      title: "Responsive variant",
      code: `@media (min-width: 768px) {\n  .${className}-card {\n    ${cssBySlug(slug, 4, "#10b981", "#2563eb").replaceAll(
        "\n",
        "\n    "
      )}\n  }\n}`,
    },
  ];
}

function defaultExtraFaq(toolTitle: string): { question: string; answer: string }[] {
  return [
    {
      question: `How to use css ${toolTitle.toLowerCase()} output in production?`,
      answer:
        "Start with a reusable utility class, move repeated values into CSS variables, then test contrast and responsiveness before shipping.",
    },
    {
      question: `What is the best css ${toolTitle.toLowerCase()} workflow for teams?`,
      answer:
        "Use the tool for exploration, keep final values in design tokens, and review in pull requests with real component screenshots.",
    },
    {
      question: `Can I reuse these ready to use css ${toolTitle.toLowerCase()} snippets in Tailwind or CSS-in-JS?`,
      answer:
        "Yes. You can copy values directly into Tailwind arbitrary values, styled components, or vanilla CSS modules with no conversion needed.",
    },
  ];
}

function namedExamples(
  slug: ToolSlug,
  toolTitle: string,
  names: string[],
  descriptionPrefix: string
): LandingExample[] {
  return names.map((name, idx) => {
    const theme = EXAMPLE_THEMES[idx % EXAMPLE_THEMES.length];
    return {
      title: name,
      description: `${descriptionPrefix} ${toolTitle.toLowerCase()} workflow.`,
      css: cssBySlug(slug, idx, theme.c1, theme.c2),
      previewStyle: previewStyleBySlug(slug, idx, theme.c1, theme.c2),
      previewLabel: `${toolTitle} ${idx + 1}`,
    };
  });
}

function relatedLinksFor(slug: ToolSlug): { label: string; href: string }[] {
  return getRelatedTools(slug)
    .slice(0, 4)
    .map((t) => ({ label: t.title, href: toolHref(t.slug) }));
}

const MANUAL_OVERRIDES: Partial<Record<ToolSlug, LandingEnhancementOverride>> = {
  "meta-tag-generator": {
    intro: [
      "Meta tags are usually the first SEO deliverable on a launch checklist, yet teams often ship them late or with copy that is too generic. This section is built for developers and growth engineers who need practical title, description, and social card patterns they can ship immediately.",
      "Instead of a theoretical guide, each example below mirrors common page types: homepage, pricing, docs, blog, and feature pages. That makes it easier to map intent to metadata quickly.",
      "If you are targeting long-tail queries like how to use css meta tag generator or ready to use seo meta snippets, these patterns help you move from draft to production in minutes.",
    ],
    useCases: [
      "Setting launch-ready metadata for new product pages in sprint deadlines.",
      "Refactoring duplicate title/description tags across an older Next.js app.",
      "Creating reusable metadata patterns for docs, changelogs, and release posts.",
      "Preparing social card snippets for marketing campaigns and feature announcements.",
      "Auditing SERP snippet quality before and after on-page SEO updates.",
    ],
    commonMistakes: [
      "Using the same title template on every route and losing query intent specificity.",
      "Writing overlong descriptions that truncate before value is visible in SERP.",
      "Forgetting to align Open Graph title/description with page-level messaging.",
      "Treating canonical and metadata as unrelated tasks during deployment.",
      "Skipping QA for mobile snippet readability and brand consistency.",
    ],
    proTips: [
      "Start title tags with intent phrase, then end with brand only when space allows.",
      "Keep descriptions action-oriented and match what users see above the fold.",
      "Use one metadata helper and route-level constants to avoid accidental duplicates.",
      "Review top impressions in Search Console and iterate metadata quarterly.",
      "Store high-performing snippets in a shared playbook for content and dev teams.",
    ],
    extraFaq: [
      {
        question: "How long should meta title and description be for modern SERP layouts?",
        answer:
          "Aim for about 50-60 characters for title and 140-160 for description, then validate with real preview tools because truncation differs by device and query.",
      },
      {
        question: "Should Open Graph tags be different from standard meta tags?",
        answer:
          "They can be similar, but social previews usually perform better with benefit-led copy and slightly stronger hooks than standard SERP snippets.",
      },
      {
        question: "How do I avoid duplicate meta tags on dynamic pages?",
        answer:
          "Use a single metadata helper with route-level constants and slug-specific fallback logic, then test rendered HTML output in production mode.",
      },
      {
        question: "Can metadata changes improve rankings immediately?",
        answer:
          "Changes can improve CTR quickly when recrawled, but ranking impact depends on total relevance, page quality, and competition.",
      },
      {
        question: "What is the best workflow to ship metadata safely?",
        answer:
          "Draft from a template, review with SEO + product, validate in staging, then monitor impressions and CTR after deploy.",
      },
    ],
    examples: namedExamples(
      "meta-tag-generator",
      "Meta Tag Generator",
      [
        "Homepage Brand Snippet",
        "Feature Landing Snippet",
        "Pricing Page Snippet",
        "Docs Index Snippet",
        "Changelog Entry Snippet",
        "Blog Tutorial Snippet",
        "Category Hub Snippet",
        "Case Study Snippet",
        "Comparison Page Snippet",
        "Support Page Snippet",
      ],
      "Use this metadata-friendly block as a starting point for"
    ),
    snippets: [
      {
        title: "Next.js metadata object",
        code: `export const metadata = {\n  title: "Gradient Generator for Modern UI | CSS Design Tools",\n  description:\n    "Build linear and radial gradients with live preview, presets, and copy-ready CSS output.",\n  alternates: { canonical: "/tools/gradient-generator" },\n};`,
      },
      {
        title: "Open Graph + Twitter pair",
        code: `openGraph: {\n  title: "Gradient Generator for Modern UI",\n  description: "Create production-ready gradients in your browser.",\n  images: [{ url: "/opengraph-image" }],\n},\ntwitter: {\n  card: "summary_large_image",\n  title: "Gradient Generator for Modern UI",\n  description: "Create production-ready gradients in your browser.",\n},`,
      },
      {
        title: "Meta description checklist snippet",
        code: `/* Meta description checklist */\n/* 1) Intent keyword near the beginning */\n/* 2) One user outcome + one differentiator */\n/* 3) 140-160 characters target */\n/* 4) Match visible page content */`,
      },
      {
        title: "Canonical-safe helper usage",
        code: `const metadata = buildPageMetadata({\n  path: "/tools/meta-tag-generator",\n  title: "Meta Tag Generator",\n  description:\n    "Generate title, description, Open Graph, and Twitter tags with crawl-safe defaults.",\n});`,
      },
    ],
    contextualLinks: [
      { label: "Robots.txt Generator", href: toolHref("robots-txt-generator") },
      { label: "Color Palette Generator", href: toolHref("color-palette-generator") },
      { label: "Logo Generator", href: toolHref("logo-generator") },
      ...relatedLinksFor("meta-tag-generator").slice(0, 1),
    ],
  },
  "robots-txt-generator": {
    intro: [
      "Robots.txt mistakes can silently block important pages or waste crawl budget. This section focuses on practical robots patterns you can copy, test, and deploy without risking indexability.",
      "The examples reflect real site structures: marketing pages, tool directories, and environment-specific paths. They are designed for teams shipping quickly on modern frameworks.",
      "If your target query includes ready to use robots txt examples or best robots generator settings, use these snippets as tested starting points.",
    ],
    examples: namedExamples(
      "robots-txt-generator",
      "Robots.txt Generator",
      [
        "Allow All + Sitemap",
        "Block Staging Paths",
        "Block Internal API Routes",
        "Disallow Temp Uploads",
        "Selective Bot Restriction",
        "Media Crawl Restriction",
        "Docs Subpath Control",
        "Tool Sandbox Exclusion",
        "Private Directory Block",
        "Host + Sitemap Combination",
      ],
      "Use this crawl-control pattern in your"
    ),
    snippets: [
      {
        title: "Baseline production robots.txt",
        code: `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /private/\nSitemap: https://cssgen.io/sitemap.xml`,
      },
      {
        title: "Block temporary environments",
        code: `User-agent: *\nDisallow: /staging/\nDisallow: /preview/\nDisallow: /tmp/\nAllow: /`,
      },
      {
        title: "Bot-specific restriction",
        code: `User-agent: GPTBot\nDisallow: /\n\nUser-agent: *\nAllow: /\nSitemap: https://cssgen.io/sitemap.xml`,
      },
      {
        title: "Debug checklist",
        code: `# Robots QA checklist\n# 1) Important pages are not blocked\n# 2) Sitemap URL is valid\n# 3) Staging paths are disallowed\n# 4) No accidental wildcard disallow`,
      },
    ],
    contextualLinks: [
      { label: "Meta Tag Generator", href: toolHref("meta-tag-generator") },
      { label: "Gradient Generator", href: toolHref("gradient-generator") },
      ...relatedLinksFor("robots-txt-generator").slice(0, 2),
    ],
  },
  "base64-image-converter": {
    intro: [
      "Base64 image conversion is useful when you need tiny inline graphics without extra HTTP requests, especially for emails, placeholders, and embedded UI assets.",
      "This section focuses on practical usage boundaries: when inlining helps, when it hurts bundle size, and how to keep maintainability under control.",
      "Developers searching for css base64 image examples usually want direct copy-paste output. The gallery below is built exactly for that workflow.",
    ],
    examples: namedExamples(
      "base64-image-converter",
      "Base64 Image Converter",
      [
        "Inline Icon Background",
        "Email-safe Header Stripe",
        "Hero Noise Texture",
        "CSS Badge Fill",
        "Inline Pattern Tile",
        "Card Placeholder Layer",
        "Button Hover Texture",
        "Avatar Ring Accent",
        "Promo Banner Fill",
        "Fallback Background Asset",
      ],
      "Use this inline image strategy in your"
    ),
    snippets: [
      {
        title: "Inline data URL background",
        code: `.hero-banner {\n  background-image: url("data:image/png;base64,AAA...");\n  background-size: cover;\n  background-position: center;\n}`,
      },
      {
        title: "SVG data URI for tiny icons",
        code: `.status-pill::before {\n  content: "";\n  width: 12px;\n  height: 12px;\n  background: url("data:image/svg+xml,%3Csvg ... %3E") no-repeat center/contain;\n}`,
      },
      {
        title: "Fallback chain",
        code: `.pattern-card {\n  background-image:\n    url("data:image/svg+xml,%3Csvg ... %3E"),\n    linear-gradient(135deg, #0ea5e9, #2563eb);\n}`,
      },
      {
        title: "When not to inline",
        code: `/* Avoid base64 for large photos */\n/* Keep inlined assets tiny (<5-10KB) */\n/* Prefer CDN files for heavy media */`,
      },
    ],
  },
  "image-crop-tool": {
    intro: [
      "Image cropping affects perceived design quality more than most teams expect. This section focuses on exact crop behavior for avatars, cards, product shots, and responsive hero media.",
      "Instead of generic image editing tips, the examples map to common frontend tasks where composition and focal point control directly impact CTR and readability.",
      "If you are looking for how to use image crop tool output in modern UI workflows, these presets are built for production implementation.",
    ],
    examples: namedExamples(
      "image-crop-tool",
      "Image Crop Tool",
      [
        "Centered Avatar Crop",
        "Top-Focus Hero Crop",
        "Product Card Crop",
        "4:3 Blog Thumbnail Crop",
        "Square Social Preview Crop",
        "Profile Header Crop",
        "E-commerce Gallery Crop",
        "Landscape Card Crop",
        "Portrait Story Crop",
        "Content Cover Crop",
      ],
      "Apply this crop pattern to your"
    ),
    snippets: [
      {
        title: "Avatar output class",
        code: `.avatar-img {\n  width: 64px;\n  height: 64px;\n  border-radius: 9999px;\n  object-fit: cover;\n  object-position: center;\n}`,
      },
      {
        title: "Card thumbnail crop",
        code: `.card-media {\n  width: 100%;\n  aspect-ratio: 4 / 3;\n  object-fit: cover;\n  object-position: 50% 40%;\n}`,
      },
      {
        title: "Responsive hero crop",
        code: `.hero-image {\n  width: 100%;\n  height: clamp(220px, 36vw, 420px);\n  object-fit: cover;\n  object-position: 50% 30%;\n}`,
      },
      {
        title: "Performance note",
        code: `/* Crop before uploading to production */\n/* Smaller dimensions = faster LCP */\n/* Keep source ratio close to final container */`,
      },
    ],
  },
  "image-converter": {
    intro: [
      "Image format conversion is mostly a performance decision. The right format can reduce transfer size, improve LCP, and preserve enough quality for your visual context.",
      "These examples show practical conversion targets for product grids, blog covers, hero sections, and social assets instead of abstract format theory.",
      "If your intent is ready to use css image converter output, pair converted files with the CSS snippets below for predictable rendering.",
    ],
    examples: namedExamples(
      "image-converter",
      "Image Converter",
      [
        "JPG Hero Export",
        "WEBP Product Grid Export",
        "PNG Transparent Badge Export",
        "Social Cover Conversion",
        "Mobile Header Conversion",
        "Blog Thumbnail Conversion",
        "Feature Card Conversion",
        "Pricing Illustration Conversion",
        "Landing Gallery Conversion",
        "Changelog Screenshot Conversion",
      ],
      "Use this conversion baseline for your"
    ),
    snippets: [
      {
        title: "Picture element fallback",
        code: `<picture>\n  <source srcSet="/img/card.webp" type="image/webp" />\n  <img src="/img/card.jpg" alt="Card preview" loading="lazy" />\n</picture>`,
      },
      {
        title: "Responsive converted image",
        code: `.feature-image {\n  width: 100%;\n  height: auto;\n  border-radius: 14px;\n  object-fit: cover;\n}`,
      },
      {
        title: "High-density export usage",
        code: `<img\n  src="/img/hero-1200.jpg"\n  srcSet="/img/hero-1200.jpg 1x, /img/hero-2400.jpg 2x"\n  alt="Hero visual"\n/>`,
      },
      {
        title: "Quality targeting notes",
        code: `/* JPG: photos */\n/* PNG: transparency/flat graphics */\n/* WEBP: balanced modern default */`,
      },
    ],
  },
  "favicon-generator": {
    intro: [
      "Favicon quality has an outsized brand effect in tabs, bookmarks, and mobile launch icons. Small size does not mean low impact.",
      "These examples focus on practical favicon style directions and implementation snippets that avoid blurry outputs on high-density screens.",
      "For search intent like best favicon generator workflow, use these patterns to ship consistent browser identity quickly.",
    ],
    examples: namedExamples(
      "favicon-generator",
      "Favicon Generator",
      [
        "Rounded Brand Glyph",
        "Monogram Gradient Icon",
        "High-Contrast Tab Icon",
        "Dark Theme Variant",
        "Light Theme Variant",
        "App-like Square Icon",
        "Minimal Dot Mark",
        "Badge-style Icon",
        "Flat Geometric Icon",
        "Neumorphic Accent Icon",
      ],
      "Use this favicon direction as a base for your"
    ),
    snippets: [
      {
        title: "Core favicon tags",
        code: `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />\n<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />\n<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />`,
      },
      {
        title: "Mask icon for Safari pinned tabs",
        code: `<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0f766e" />`,
      },
      {
        title: "Manifest link",
        code: `<link rel="manifest" href="/manifest.webmanifest" />`,
      },
      {
        title: "Favicon QA notes",
        code: `/* Test on dark and light browser UI */\n/* Keep icon shape readable at 16x16 */\n/* Avoid thin strokes that disappear */`,
      },
    ],
  },
  "logo-generator": {
    intro: [
      "A logo generator is most valuable when outputs are implementation-ready, not just decorative mockups. This section emphasizes practical web logo usage across header, hero, and social surfaces.",
      "The examples below are meant for product teams shipping quickly: clear typography, scalable marks, and export-ready combinations.",
      "If your goal is ready to use css logo styles with modern UI direction, these snippets provide a fast baseline.",
    ],
    examples: namedExamples(
      "logo-generator",
      "Logo Generator",
      [
        "Wordmark Primary",
        "Icon + Wordmark Horizontal",
        "Stacked Brand Mark",
        "Monochrome Product Logo",
        "Gradient Accent Logo",
        "Outlined Startup Logo",
        "Rounded Capsule Logo",
        "Tech Minimal Logo",
        "Playful Consumer Logo",
        "Enterprise Clean Logo",
      ],
      "Use this logo style to prototype your"
    ),
    snippets: [
      {
        title: "Header logo treatment",
        code: `.brand-logo {\n  font-weight: 700;\n  letter-spacing: 0.02em;\n  color: #0f172a;\n}\n.brand-logo-mark {\n  border-radius: 12px;\n  background: linear-gradient(135deg, #14b8a6, #0f766e);\n}`,
      },
      {
        title: "Dark mode brand variant",
        code: `.dark .brand-logo {\n  color: #f8fafc;\n}\n.dark .brand-logo-mark {\n  background: linear-gradient(135deg, #22d3ee, #0ea5e9);\n}`,
      },
      {
        title: "Responsive logo sizing",
        code: `.brand-lockup {\n  display: inline-flex;\n  align-items: center;\n  gap: clamp(0.35rem, 1vw, 0.6rem);\n  font-size: clamp(1rem, 1.4vw, 1.25rem);\n}`,
      },
      {
        title: "SVG-first export note",
        code: `/* Prefer SVG for logos in production */\n/* Keep PNG fallback for social thumbnails */\n/* Validate legibility at 24px and 32px */`,
      },
    ],
  },
};

export function getToolLandingEnhancement(slug: ToolSlug): LandingEnhancement {
  const tool = getToolBySlug(slug);
  const toolTitle = tool?.title ?? "CSS Tool";
  const linked = getRelatedTools(slug)
    .slice(0, 3)
    .map((t) => ({ label: t.title, href: toolHref(t.slug) }));

  const base: LandingEnhancement = {
    intro: [
      `${toolTitle} pages rank better when they combine tool UI, examples, and implementation guidance. This section is built as a practical developer guide so users searching for css ${toolTitle.toLowerCase()} examples can get copy-ready output and production notes in one page.`,
      `Instead of theory-heavy descriptions, the content below focuses on real delivery tasks: choosing stable defaults, avoiding regressions, and shipping modern css ${toolTitle.toLowerCase()} design patterns with predictable rendering.`,
      `Use these snippets as a baseline, then adapt the values to your spacing, color, and motion tokens. That keeps design consistency while still moving fast.`,
    ],
    useCases: [
      `Landing pages where you need a fast visual result and ready to use css ${toolTitle.toLowerCase()} values.`,
      "UI component libraries that require consistent styles across cards, buttons, and callout blocks.",
      "Feature launches where engineering needs production-safe snippets, not just sandbox values.",
      "Design QA passes when you need quick visual alternatives during browser testing.",
      "Refactors from legacy CSS to token-based, reusable utility patterns.",
    ],
    commonMistakes: [
      "Copying raw output without checking accessibility contrast against real text content.",
      "Using one-off values repeatedly instead of extracting CSS variables for maintainability.",
      "Applying visual effects too aggressively on dense layouts, causing readability drops.",
      "Skipping responsive checks, especially for typography, spacing, and hover states.",
      "Mixing inconsistent style directions across components within the same page.",
    ],
    proTips: [
      "Keep one baseline variant per component and only scale intensity when needed.",
      "Pair generated values with semantic class names so QA and teammates can audit quickly.",
      "Store approved combinations as presets in your design docs to reduce future guesswork.",
      "Test in both dark and light contexts before locking final values.",
      "Use small iterative changes; in visual CSS, tiny shifts can have a large impact.",
    ],
    extraFaq: defaultExtraFaq(toolTitle),
    examples: buildExamples(slug, toolTitle),
    snippets: buildSnippets(slug, toolTitle),
    contextualLinks: linked,
  };

  const override = MANUAL_OVERRIDES[slug];
  if (!override) return base;

  return {
    ...base,
    ...override,
    intro: override.intro ?? base.intro,
    useCases: override.useCases ?? base.useCases,
    commonMistakes: override.commonMistakes ?? base.commonMistakes,
    proTips: override.proTips ?? base.proTips,
    extraFaq: override.extraFaq ?? base.extraFaq,
    examples: override.examples ?? base.examples,
    snippets: override.snippets ?? base.snippets,
    contextualLinks: override.contextualLinks ?? base.contextualLinks,
  };
}

/**
 * Tool page keeps only a concise representative set (basic -> practical -> advanced).
 * Full collections are reserved for dedicated example pages.
 */
export function pickLandingExamples(
  examples: LandingExample[],
  limit = LANDING_EXAMPLE_LIMIT
): LandingExample[] {
  if (examples.length <= limit) return examples;
  const picks = [0, 1, 3, 5, 7, 9];
  const selected: LandingExample[] = [];
  for (const idx of picks) {
    if (selected.length >= limit) break;
    const item = examples[idx];
    if (item) selected.push(item);
  }
  if (selected.length < limit) {
    for (const item of examples) {
      if (selected.length >= limit) break;
      if (!selected.includes(item)) selected.push(item);
    }
  }
  return selected.slice(0, limit);
}

/**
 * Dedicated example-page URL per tool.
 * Example: `flexbox-generator` -> `/css-flexbox-examples`
 */
export function getToolExamplesPath(slug: ToolSlug): `/${string}` {
  const base = slug
    .replace(/-generator$/, "")
    .replace(/-tool$/, "")
    .replace(/^-+|-+$/g, "");
  return `/css-${base}-examples`;
}
