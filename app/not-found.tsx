import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { TextLink } from "@/components/shared/TextLink";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <PageHeader title="Page not found" />
      <p className="text-sm text-zinc-600">
        <TextLink href="/">Go home</TextLink>
      </p>
    </>
  );
}
