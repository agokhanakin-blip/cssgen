import { PageHeader } from "@/components/shared/PageHeader";
import { TextLink } from "@/components/shared/TextLink";

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
