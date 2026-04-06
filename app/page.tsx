import type { Metadata } from "next";
import { CategoryTile } from "@/components/shared/CategoryTile";
import { Hero } from "@/components/shared/Hero";
import { LinkButton } from "@/components/shared/LinkButton";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { ToolGrid } from "@/components/shared/ToolGrid";
import { ValueProposition } from "@/components/shared/ValueProposition";
import { ToolCard } from "@/components/tools/ToolCard";
import { categories } from "@/data/categories";
import { toolHref, tools } from "@/data/tools";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/",
  title: "Free CSS Generators for Modern UI Design",
  description:
    "Browse free online CSS generators: gradients, shadows, border radius, palettes, clamp(), flexbox, grid, filters, and more. Live preview and copy-ready code.",
});

export default function HomePage() {
  return (
    <>
      <Hero
        title="Free CSS Generators for Modern UI Design"
        subtitle="Create gradients, shadows, border radius, and color palettes instantly with simple tools."
        actions={
          <>
            <LinkButton
              href={toolHref("gradient-generator")}
              variant="primary"
            >
              Start with Gradient Generator
            </LinkButton>
            <LinkButton href="#popular-css-tools" variant="secondary">
              Explore All Tools
            </LinkButton>
          </>
        }
      />

      <section
        id="popular-css-tools"
        className="scroll-mt-24 border-t border-zinc-200/90 pt-14 sm:scroll-mt-28 sm:pt-16"
        aria-labelledby="popular-tools-heading"
      >
        <SectionTitle id="popular-tools-heading">Popular CSS Tools</SectionTitle>
        <ToolGrid className="mt-6 sm:mt-8">
          {tools.map((tool) => (
            <li key={tool.slug}>
              <ToolCard title={tool.title} href={toolHref(tool.slug)} />
            </li>
          ))}
        </ToolGrid>
      </section>

      <section
        className="mt-16 border-t border-zinc-200/90 pt-14 sm:mt-20 sm:pt-16"
        aria-labelledby="browse-categories-heading"
      >
        <SectionTitle id="browse-categories-heading">
          Browse by Category
        </SectionTitle>
        <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {categories.map((c) => (
            <CategoryTile
              key={c.id}
              title={c.label}
              description={c.pitch}
              href={c.href}
            />
          ))}
        </div>
      </section>

      <div className="mt-16 sm:mt-20">
        <ValueProposition />
      </div>

      <article
        className="mt-16 border-t border-zinc-200/90 pt-14 text-sm leading-relaxed text-zinc-600 sm:mt-20 sm:pt-16"
        aria-label="About these CSS generators"
      >
        <h2 className="sr-only">About these CSS generators</h2>
        <div className="mx-auto max-w-3xl space-y-4 sm:space-y-5">
          <p>
            Whether you are styling a landing page or refining a component
            library, small CSS details add up. Our generators help you experiment
            with <strong className="font-medium text-zinc-800">gradients, box shadows, border radius, and color palettes</strong> in the browser, then copy the exact values you need into your stylesheet or design tokens.
          </p>
          <p>
            Each tool focuses on one job so pages stay fast and easy to scan.
            You can jump straight to the <a href={toolHref("gradient-generator")} className="font-medium text-zinc-800 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500">gradient generator</a>, explore <a href="/css-generators" className="font-medium text-zinc-800 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500">CSS generators</a> for shadows and corners, or use <a href="/color-tools" className="font-medium text-zinc-800 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500">color tools</a> when you need a cohesive palette.
          </p>
          <p>
            We keep the interface minimal on purpose: fewer distractions mean
            quicker decisions and cleaner output. When you are ready, the same
            patterns will extend to more utilities with readable,
            standards-based CSS.
          </p>
        </div>
      </article>
    </>
  );
}