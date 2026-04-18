import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { SeoBreadcrumb } from "@/components/seo/SeoBreadcrumb";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { buildPageMetadata } from "@/lib/seo";

const PAGE = {
  title: "Privacy Policy",
  description:
    "Privacy policy for CSS Design Tools: cookies, Google Analytics, third-party ads (including AdSense), and how we handle data in your browser session.",
} as const;

export const metadata: Metadata = buildPageMetadata({
  path: "/privacy-policy",
  title: PAGE.title,
  description: PAGE.description,
});

const sectionTitle =
  "text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl";
const body = "space-y-3 text-sm leading-relaxed text-zinc-600 sm:text-base";

export default function PrivacyPolicyPage() {
  return (
    <>
      <WebPageJsonLd
        path="/privacy-policy"
        title={PAGE.title}
        description={PAGE.description}
      />
      <SeoBreadcrumb
        className="mb-6"
        items={[
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: "/privacy-policy" },
        ]}
      />
      <PageHeader
        title="Privacy Policy"
        description="Last updated: April 2026. This policy explains how we collect, use, and share information when you use this website."
      />

      <div className="max-w-3xl space-y-10 pb-4">
        <section aria-labelledby="privacy-overview" className={body}>
          <h2 id="privacy-overview" className={sectionTitle}>
            Overview
          </h2>
          <p>
            We run a small set of browser-based CSS tools. We aim to keep data
            collection minimal. Some information is processed automatically by
            hosting providers and advertising partners when you browse the site
            or interact with ads.
          </p>
        </section>

        <section aria-labelledby="privacy-information" className={body}>
          <h2 id="privacy-information" className={sectionTitle}>
            Information we collect
          </h2>
          <p>
            We do not ask you to create an account for these tools, and we do
            not intentionally store the styles or colors you generate in our
            databases.
          </p>
          <p>
            Like most websites, our hosting and infrastructure may process
            technical data when you load a page (for example IP address, browser
            type, and general usage logs) for security, performance, and abuse
            prevention. That processing is described in more detail by those
            providers.
          </p>
        </section>

        <section aria-labelledby="privacy-cookies" className={body}>
          <h2 id="privacy-cookies" className={sectionTitle}>
            Cookies and similar technologies
          </h2>
          <p>
            We and our partners may use cookies, local storage, pixels, or
            similar technologies to remember preferences, measure traffic, and
            deliver or limit advertising. You can control cookies through your
            browser settings; blocking certain cookies may affect how the site or
            ads behave.
          </p>
        </section>

        <section aria-labelledby="privacy-ads" className={body}>
          <h2 id="privacy-ads" className={sectionTitle}>
            Advertising
          </h2>
          <p>
            This site may show third-party advertisements served by Google
            AdSense (or other networks we enable from time to time). These
            partners may use cookies or similar technologies to show relevant
            ads, limit how often you see an ad, and measure effectiveness.
          </p>
          <p>
            For more on how Google uses information from partner sites, see
            Google&apos;s Privacy &amp; Terms. You can also use industry opt-out
            tools where available (for example, your Google ad settings) to
            manage personalized advertising preferences.
          </p>
        </section>

        <section aria-labelledby="privacy-analytics" className={body}>
          <h2 id="privacy-analytics" className={sectionTitle}>
            Analytics
          </h2>
          <p>
            We may use privacy-friendly or standard analytics to understand
            which pages are used most often and to improve performance. If
            analytics tools set cookies or collect device identifiers, they do
            so under their own policies.
          </p>
        </section>

        <section aria-labelledby="privacy-children" className={body}>
          <h2 id="privacy-children" className={sectionTitle}>
            Children
          </h2>
          <p>
            These tools are intended for a general audience. They are not directed
            at children under 13, and we do not knowingly collect personal
            information from children.
          </p>
        </section>

        <section aria-labelledby="privacy-changes" className={body}>
          <h2 id="privacy-changes" className={sectionTitle}>
            Changes
          </h2>
          <p>
            We may update this policy when we change how the site works, add
            ad partners, or adjust legal requirements. The “Last updated” date at
            the top will change when we do.
          </p>
        </section>

        <section aria-labelledby="privacy-contact" className={body}>
          <h2 id="privacy-contact" className={sectionTitle}>
            Contact
          </h2>
          <p>
            For privacy questions related to this site, reach us at{" "}
            <a
              href="mailto:contact@cssgen.io"
              className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500"
            >
              contact@cssgen.io
            </a>
            .
          </p>
        </section>
      </div>
    </>
  );
}
