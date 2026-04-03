/** Join class names, omitting falsy parts. No external deps. */
export function classNames(
  ...parts: Array<string | undefined | false | null>
): string {
  return parts.filter(Boolean).join(" ");
}
