import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { SeoBreadcrumb } from "@/components/seo/SeoBreadcrumb";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { toolHref } from "@/data/tools";
import { buildPageMetadata } from "@/lib/seo";

const PAGE = {
  title: "About CSS Design Tools",
  description:
    "Learn how CSS Design Tools helps you ship gradients, shadows, border radius, color palettes, layout utilities, and image helpers — free, in your browser.",
} as const;

export const metadata: Metadata = buildPageMetadata({
  path: "/about",
  title: PAGE.title,
  description: PAGE.description,
});

const sectionTitle =
  "text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl";
const body = "space-y-3 text-sm leading-relaxed text-zinc-600 sm:text-base";
const linkClass =
  "font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500";

export default function AboutPage() {
  return (
    <>
      <WebPageJsonLd
        path="/about"
        title={PAGE.title}
        description={PAGE.description}
      />
      <SeoBreadcrumb
        className="mb-6"
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />
      <PageHeader
        title="About CSS Design Tools"
        description="Free CSS tools for developers and designers who want fast, copy-ready output without signing up."
      />

      <div className="max-w-3xl space-y-10 pb-4">
        <section aria-labelledby="about-mission" className={body}>
          <h2 id="about-mission" className={sectionTitle}>
            What we do
          </h2>
          <p>
            We host focused utilities that solve everyday front-end chores:
            tuning gradients, dialing in box shadows, rounding corners, and
            building small color palettes from a single base hue. Each tool is
            designed to stay lightweight in the browser and to output clean CSS
            you can paste straight into your project.
          </p>
        </section>

        <section aria-labelledby="about-tools" className={body}>
          <h2 id="about-tools" className={sectionTitle}>
            Tools on this site
          </h2>
          <ul className="list-disc space-y-2 ps-5">
            <li>
              <Link href={toolHref("gradient-generator")} className={linkClass}>
                Gradient Generator
              </Link>{" "}
              — linear and radial blends with live preview and copyable
              background CSS.
            </li>
            <li>
              <Link href={toolHref("box-shadow-generator")} className={linkClass}>
                Box Shadow Generator
              </Link>{" "}
              — outer and inset shadows with offset, blur, spread, and opacity.
            </li>
            <li>
              <Link
                href={toolHref("border-radius-generator")}
                className={linkClass}
              >
                Border Radius Generator
              </Link>{" "}
              — uniform or per-corner radius with presets and instant preview.
            </li>
            <li>
              <Link
                href={toolHref("color-palette-generator")}
                className={linkClass}
              >
                Color Palette Generator
              </Link>{" "}
              — harmony modes, swatches, hex values, and optional CSS
              variables.
            </li>
            <li>
              <Link href={toolHref("text-shadow-generator")} className={linkClass}>
                Text Shadow Generator
              </Link>{" "}
              — configure offset, blur, and opacity for readable text effects.
            </li>
            <li>
              <Link href={toolHref("clamp-generator")} className={linkClass}>
                Clamp Generator
              </Link>{" "}
              — generate fluid typography with CSS clamp() for responsive sizing.
            </li>
            <li>
              <Link href={toolHref("transition-generator")} className={linkClass}>
                Transition Generator
              </Link>{" "}
              — build smooth transition declarations with timing and delay.
            </li>
            <li>
              <Link href={toolHref("transform-generator")} className={linkClass}>
                Transform Generator
              </Link>{" "}
              — compose translate, rotate, scale, and skew values visually.
            </li>
            <li>
              <Link href={toolHref("color-converter")} className={linkClass}>
                Color Converter
              </Link>{" "}
              — convert HEX, RGB, and HSL formats with quick copy actions.
            </li>
            <li>
              <Link href={toolHref("image-resizer-rounder")} className={linkClass}>
                Image Resizer & Round Corners
              </Link>{" "}
              — upload, resize, round corners, and download optimized images.
            </li>
            <li>
              <Link href={toolHref("css-unit-converter")} className={linkClass}>
                CSS Unit Converter
              </Link>{" "}
              — convert px to rem, em, and percentages instantly.
            </li>
            <li>
              <Link href={toolHref("meta-tag-generator")} className={linkClass}>
                Meta Tag Generator
              </Link>{" "}
              — draft title, description, and Open Graph tags for SEO.
            </li>
            <li>
              <Link href={toolHref("robots-txt-generator")} className={linkClass}>
                Robots.txt Generator
              </Link>{" "}
              — create crawl rules and sitemap references quickly.
            </li>
            <li>
              <Link href={toolHref("base64-image-converter")} className={linkClass}>
                Base64 Image Converter
              </Link>{" "}
              — convert image files into data URLs for web use.
            </li>
          </ul>
        </section>

        <section aria-labelledby="about-philosophy" className={body}>
          <h2 id="about-philosophy" className={sectionTitle}>
            How we build
          </h2>
          <p>
            We prefer simple interfaces, honest defaults, and documentation you
            can skim in a minute. If a feature does not help you ship CSS
            faster, it probably does not belong here.
          </p>
        </section>
      </div>
    </>
  );
}
