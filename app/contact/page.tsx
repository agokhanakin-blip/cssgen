import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/contact",
  title: "Contact",
  description:
    "Contact CSS Design Tools for feedback, bug reports, feature ideas, or partnership questions. We read every message.",
});

const body = "space-y-4 text-sm leading-relaxed text-zinc-600 sm:text-base";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        description="You can reach us for feedback or suggestions. We read every message, though we may not reply to all inquiries immediately."
      />

      <div className="max-w-3xl space-y-8 pb-4">
        <section aria-labelledby="contact-email" className={body}>
          <h2 id="contact-email" className="sr-only">
            Email
          </h2>
          <p>
            <strong className="font-medium text-zinc-900">Email:</strong>{" "}
            <a
              href="mailto:contact@cssgen.io"
              className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500"
            >
              contact@cssgen.io
            </a>
          </p>
          <p>
            Please include the page or tool name (for example, Gradient
            Generator) if you are reporting a bug or asking for a specific
            improvement.
          </p>
        </section>
      </div>
    </>
  );
}
