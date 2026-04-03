import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { toolHref } from "@/data/tools";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/about",
  title: "About",
  description:
    "Learn about CSS Design Tools — free CSS generators for gradients, shadows, border radius, and color palettes.",
});

const sectionTitle =
  "text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl";
const body = "space-y-3 text-sm leading-relaxed text-zinc-600 sm:text-base";
const linkClass =
  "font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500";

export default function AboutPage() {
  return (
    <>
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
