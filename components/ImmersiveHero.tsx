"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import WaitlistForm from "@/components/WaitlistForm";

// WebGL can't render during SSR, so load the scene on the client only.
const Scene = dynamic(() => import("@/components/gallery/Scene"), {
  ssr: false,
  loading: () => null,
});

type View = "sphere" | "cylinder";

export default function ImmersiveHero() {
  const [view, setView] = useState<View>("sphere");

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* warm Indian parchment backdrop (even, paper-like, Pahari feel) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(100% 90% at 50% 32%, #faf4e6 0%, #f3e9d4 52%, #e7dabf 100%)",
        }}
      />
      {/* gilded vignette for depth and a premium edge */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 50%, transparent 58%, rgba(120,84,28,0.10) 100%)",
        }}
      />
      {/* 3D gallery (transparent canvas over the gradient). The title lives
          inside the scene so apps pass in front of and behind it. */}
      <div className="absolute inset-0">
        <Scene view={view} />
      </div>

      {/* bottom scrim so the dock reads over the parchment */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#f3ecdd] via-[#f3ecdd]/45 to-transparent" />

      {/* overlay content: only the dock; the headline is 3D */}
      <div className="pointer-events-none relative z-10 flex h-full flex-col justify-end">
        <div className="px-6 pb-9">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5">
            <p className="max-w-md text-center text-[15px] leading-relaxed text-ink-soft">
              Sakhi connects to 2,000+ tools and gets the work done. Just ask.
            </p>

            <div className="pointer-events-auto">
              <WaitlistForm />
            </div>

            <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[13px] text-ink-mute">
              <span className="flex items-center gap-2">
                <span className="uppercase tracking-[0.16em]">View</span>
                <span className="flex items-center gap-1 rounded-full border border-ink/12 bg-white/60 p-1 backdrop-blur">
                  {(["sphere", "cylinder"] as View[]).map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      className={`rounded-full px-3.5 py-1 capitalize transition ${
                        view === v ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </span>
              </span>
              <span className="hidden text-ink-mute/40 sm:inline">·</span>
              <span className="uppercase tracking-[0.16em] text-ink-mute/70">
                drag to look · scroll to spin
              </span>
              <span className="hidden text-ink-mute/40 sm:inline">·</span>
              <a
                href="#capabilities"
                className="uppercase tracking-[0.16em] text-ink-soft underline-offset-4 transition hover:text-ink hover:underline"
              >
                See use cases ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
