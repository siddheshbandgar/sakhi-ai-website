"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import WaitlistForm from "@/components/WaitlistForm";

// WebGL can't render during SSR — load the scene on the client only.
const Scene = dynamic(() => import("@/components/gallery/Scene"), {
  ssr: false,
  loading: () => null,
});

type View = "sphere" | "cylinder";

export default function ImmersiveHero() {
  const [view, setView] = useState<View>("sphere");

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* warm Indian parchment / sunrise backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -8%, #f8d9a8 0%, #f6e8cf 38%, #f3ecdd 62%, #ece9f3 100%)",
        }}
      />
      {/* calm the centre so the headline reads cleanly over the logos */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_46%_at_50%_50%,rgba(248,242,229,0.82),rgba(248,242,229,0.35)_55%,transparent_75%)]" />

      {/* 3D gallery (transparent canvas over the gradient) */}
      <div className="absolute inset-0">
        <Scene view={view} />
      </div>

      {/* readability scrims fading to parchment, don't block orbit dragging */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#f3ecdd] via-[#f3ecdd]/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#f7e6cc] to-transparent" />

      {/* overlay content */}
      <div className="pointer-events-none relative z-10 flex h-full flex-col">
        <div className="flex-1" />

        <div className="px-6 text-center">
          <h1 className="mx-auto font-display text-[3.25rem] font-medium leading-[0.98] tracking-[-0.01em] text-ink sm:text-7xl md:text-[92px]">
            Every app you use,
            <br />
            <span className="italic font-normal">in one orbit</span>
          </h1>
          <p className="mx-auto mt-7 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
            Sakhi connects to 2,000+ tools and gets the work done — just ask.
          </p>
        </div>

        <div className="flex-1" />

        {/* controls dock */}
        <div className="px-6 pb-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
            <div className="pointer-events-auto flex items-center gap-3 text-[13px] text-ink-mute">
              <span className="uppercase tracking-[0.18em]">Change the view</span>
              <div className="flex items-center gap-1 rounded-full border border-ink/12 bg-white/60 p-1 backdrop-blur">
                {(["sphere", "cylinder"] as View[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`rounded-full px-4 py-1.5 capitalize transition ${
                      view === v ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="pointer-events-auto">
              <WaitlistForm />
            </div>

            <p className="text-[12px] uppercase tracking-[0.2em] text-ink-mute/70">
              drag to explore · scroll to zoom
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
