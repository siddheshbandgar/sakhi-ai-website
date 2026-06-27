"use client";

import { useState } from "react";
import { categories } from "@/lib/data";
import AppChip from "@/components/AppChip";

export default function CapabilityTabs() {
  const [active, setActive] = useState(0);
  const cat = categories[active];
  // Use the first app's prompt as the "live conversation" sample.
  const sample = cat.apps[0];

  return (
    <div>
      {/* Tabs */}
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-1.5">
        {categories.map((c, i) => (
          <button
            key={c.title}
            onClick={() => setActive(i)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              i === active
                ? "bg-ink text-paper"
                : "text-ink-soft hover:bg-paper-2"
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_1.05fr]">
        {/* Left — sample conversation */}
        <div className="card-line relative overflow-hidden rounded-3xl bg-card p-7">
          <div className="glow-soft pointer-events-none absolute -right-16 -top-16 h-56 w-56 opacity-60" />
          <p className="relative text-xs font-medium uppercase tracking-[0.18em] text-ink-mute">
            {cat.index} · {cat.title}
          </p>
          <p className="relative mt-3 max-w-sm text-[15px] leading-relaxed text-ink-soft">
            {cat.blurb}
          </p>

          <div className="relative mt-7 space-y-3">
            {/* user bubble */}
            <div className="flex justify-end">
              <div className="max-w-[78%] rounded-2xl rounded-br-md bg-paper-2 px-4 py-2.5 text-[14px] text-ink">
                {sample.prompt}
              </div>
            </div>
            {/* sakhi bubble */}
            <div className="flex items-start gap-2.5">
              <AppChip name={sample.name} tint={sample.tint} size="sm" />
              <div className="max-w-[80%] rounded-2xl rounded-tl-md border border-line bg-card px-4 py-2.5 text-[14px] text-ink-soft">
                <span className="font-medium text-ink">{sample.name}</span> connected — working on it…
                <span className="mt-2 flex items-center gap-1.5 text-[13px] text-[var(--color-sage)]">
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-[var(--color-sage)] text-[9px] text-white">✓</span>
                  Done
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — app grid */}
        <div className="card-line rounded-3xl bg-card p-7">
          <p className="text-sm text-ink-soft">
            Sakhi works across these in <span className="text-ink">{cat.title.toLowerCase()}</span>:
          </p>
          <div className="mt-5 grid gap-x-4 gap-y-4 sm:grid-cols-2">
            {cat.apps.map((app) => (
              <div key={app.name} className="flex items-center gap-3">
                <AppChip name={app.name} tint={app.tint} size="sm" />
                <div className="min-w-0">
                  <p className="text-[14px] font-medium text-ink">{app.name}</p>
                  <p className="truncate text-[12.5px] text-ink-mute">{app.prompt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
