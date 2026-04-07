type ToolUsageNoticeProps = {
  maxFileSizeMb?: number;
};

export function ToolUsageNotice({ maxFileSizeMb = 15 }: ToolUsageNoticeProps) {
  return (
    <aside className="mb-8 rounded-xl border border-amber-200/80 bg-amber-50/70 p-4 text-sm text-amber-950 shadow-sm">
      <p className="font-semibold">Before you upload</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-amber-900/95">
        <li>Processing runs in your browser; files are not sent to our server.</li>
        <li>For better performance, keep files under {maxFileSizeMb} MB.</li>
        <li>Large files may slow down on low-memory devices.</li>
      </ul>
    </aside>
  );
}
