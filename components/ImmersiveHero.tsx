"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Flourish } from "@/components/Motifs";
import WaitlistForm from "@/components/WaitlistForm";

// WebGL can't render during SSR — load the scene on the client only.
const Scene = dynamic(() => import("@/components/gallery/Scene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#070709]" />,
});

type View = "sphere" | "cylinder";

export default function ImmersiveHero() {
  const [view, setView] = useState<View>("sphere");

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#070709]">
      {/* 3D gallery */}
      <div className="absolute inset-0">
        <Scene view={view} />
      </div>

      {/* vignette + readability scrims (don't block orbit dragging) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_45%,rgba(7,7,9,0.6)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#070709] via-[#070709]/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#070709] to-transparent" />

      {/* overlay content */}
      <div className="pointer-events-none relative z-10 flex h-full flex-col">
        <div className="flex-1" />

        {/* center label + title */}
        <div className="px-6 text-center">
          <Flourish className="mx-auto h-6 w-36 text-[#ee7b3d]/70" />
          <p className="mt-5 font-deva text-[14px] tracking-wide text-white/55">
            आपकी डिजिटल सखी · AI for Bharat
          </p>
          <h1 className="mt-4 font-display text-5xl font-normal leading-[1.04] tracking-tight text-white sm:text-7xl md:text-[88px]">
            Every app you use,
            <br />
            <span className="italic text-white/90">in one orbit</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/55 sm:text-lg">
            Sakhi connects to 2,000+ tools and gets the work done — just ask.
          </p>
        </div>

        <div className="flex-1" />

        {/* controls dock */}
        <div className="pointer-events-none px-6 pb-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
            {/* view toggle — the Pahari "Change the View" control */}
            <div className="pointer-events-auto flex items-center gap-3 text-[13px] text-white/50">
              <span className="uppercase tracking-[0.18em]">Change the view</span>
              <div className="flex items-center gap-1 rounded-full border border-white/12 bg-white/[0.04] p-1 backdrop-blur">
                {(["sphere", "cylinder"] as View[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`rounded-full px-4 py-1.5 capitalize transition ${
                      view === v ? "bg-white text-[#070709]" : "text-white/60 hover:text-white"
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

            <p className="text-[12px] uppercase tracking-[0.2em] text-white/30">
              drag to explore · scroll to zoom
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
