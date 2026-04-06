"use client";

import { useState } from "react";

export function RobotsTxtGenerator() {
  const [allowAll, setAllowAll] = useState(true);
  const [sitemap, setSitemap] = useState("https://example.com/sitemap.xml");
  const [blockPath, setBlockPath] = useState("/admin");
  const [copied, setCopied] = useState(false);

  const output = allowAll
    ? `User-agent: *\nAllow: /\nDisallow: ${blockPath}\n\nSitemap: ${sitemap}`
    : `User-agent: *\nDisallow: /\n\nSitemap: ${sitemap}`;

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-8">
      <label className="flex items-center gap-2 rounded-lg border border-zinc-200/90 bg-white p-3 text-sm shadow-ds-sm">
        <input
          type="checkbox"
          checked={allowAll}
          onChange={(e) => setAllowAll(e.target.checked)}
        />
        Allow public crawling
      </label>

      <label className="block rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Disallow path
        </span>
        <input
          value={blockPath}
          onChange={(e) => setBlockPath(e.target.value)}
          className="w-full rounded-md border border-zinc-200 px-2 py-2 text-sm"
        />
      </label>

      <label className="block rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Sitemap URL
        </span>
        <input
          value={sitemap}
          onChange={(e) => setSitemap(e.target.value)}
          className="w-full rounded-md border border-zinc-200 px-2 py-2 text-sm"
        />
      </label>

      <section className="border-t border-zinc-200/90 pt-8">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">robots.txt</p>
          <button onClick={copy} className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="overflow-x-auto rounded-lg border border-zinc-200/90 bg-zinc-950 p-4 text-sm text-zinc-100">
          <code>{output}</code>
        </pre>
      </section>
    </div>
  );
}
