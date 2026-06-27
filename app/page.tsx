import { allApps } from "@/lib/data";
import { Flourish, Sparkle, Glyph, LotusDome } from "@/components/Motifs";
import WaitlistForm from "@/components/WaitlistForm";
import CapabilityTabs from "@/components/CapabilityTabs";

/* ----------------------------- Brand wordmark ---------------------------- */
function Wordmark() {
  return (
    <a href="#top" className="flex items-center gap-2.5">
      <Glyph className="h-5 w-5 text-ink" />
      <span className="flex items-baseline gap-1.5">
        <span className="font-display text-[22px] font-medium tracking-tight text-ink">Sakhi</span>
        <span className="font-deva text-base text-ink-mute leading-none">सखी</span>
      </span>
    </a>
  );
}

/* --------------------------------- Nav ----------------------------------- */
function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-paper/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Wordmark />
        <div className="hidden items-center gap-9 text-[14px] text-ink-soft md:flex">
          <a href="#capabilities" className="transition hover:text-ink">Capabilities</a>
          <a href="#why" className="transition hover:text-ink">Why Sakhi</a>
          <a href="#integrations" className="transition hover:text-ink">Integrations</a>
        </div>
        <a
          href="#waitlist"
          className="rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-paper transition hover:opacity-90 active:scale-[0.98]"
        >
          Join waitlist
        </a>
      </nav>
    </header>
  );
}

/* -------------------------------- Hero ----------------------------------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="glow-hero pointer-events-none absolute inset-x-0 top-0 h-[560px]" />
      <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-24 text-center sm:pt-32">
        <Flourish className="rise mx-auto h-7 w-44 text-warm/70" />
        <p className="rise mt-6 font-deva text-[15px] text-ink-soft">
          आपकी डिजिटल सखी · AI for Bharat
        </p>

        <h1 className="rise-2 mx-auto mt-7 max-w-4xl font-display text-[44px] font-normal leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-[76px]">
          The AI that
          <br />
          <span className="italic">actually does</span> the work
        </h1>

        <p className="rise-3 mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
          Sakhi takes action across 200+ apps you already use — and gets the work done.
        </p>

        <div className="rise-3 mt-10 flex flex-col items-center gap-4">
          <WaitlistForm />
          <a href="#capabilities" className="text-[14px] text-ink-mute transition hover:text-ink">
            See what she can do ↓
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Integrations marquee -------------------------- */
function Integrations() {
  const row = [...allApps, ...allApps];
  return (
    <section id="integrations" className="py-12">
      <p className="mb-8 text-center text-[12px] font-medium uppercase tracking-[0.22em] text-ink-mute">
        Works with the tools you already live in
      </p>
      <div className="marquee-mask relative overflow-hidden">
        <div className="marquee-track flex w-max gap-8 px-4">
          {row.map((app, i) => (
            <span key={i} className="whitespace-nowrap text-[17px] font-medium text-ink-mute/80">
              {app.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Why Sakhi -------------------------------- */
function Why() {
  const points = [
    { t: "Acts, doesn't just answer", d: "She completes the task across your apps, then reports back when it's done." },
    { t: "Lives in your stack", d: "200+ integrations, one conversation. No tab-switching, no copy-paste." },
    { t: "Speaks your language", d: "English, हिंदी, and the mix you actually type. Built for how Bharat works." },
  ];
  return (
    <section id="why" className="mx-auto max-w-6xl px-6 py-28">
      <div className="mx-auto max-w-2xl text-center">
        <Flourish className="mx-auto h-6 w-36 text-cool/60" />
        <h2 className="mt-6 font-display text-4xl font-normal tracking-tight text-ink sm:text-[52px] sm:leading-[1.08]">
          One assistant.
          <br />
          <span className="italic">Every</span> tool you use.
        </h2>
      </div>

      <div className="mt-16 grid items-stretch gap-4 lg:grid-cols-[1.1fr_1fr]">
        {/* Illustration panel */}
        <div className="panel-lav relative flex min-h-[340px] items-end justify-center overflow-hidden rounded-[28px] p-8">
          <LotusDome className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 text-[#3a3f7a]" />
          <p className="relative font-deva text-[15px] text-[#3a3f7a]/80">भारत की सुबह</p>
        </div>

        {/* Points */}
        <div className="flex flex-col justify-center gap-2">
          {points.map((p) => (
            <div key={p.t} className="card-line rounded-2xl bg-card p-6">
              <div className="flex items-start gap-3.5">
                <Sparkle className="mt-1 h-4 w-4 shrink-0 text-[var(--color-sage)]" />
                <div>
                  <h3 className="font-display text-xl font-medium text-ink">{p.t}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{p.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Capabilities ------------------------------ */
function Capabilities() {
  return (
    <section id="capabilities" className="relative overflow-hidden bg-paper-2/60 py-28">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-ink-mute">
            Capabilities
          </p>
          <h2 className="mt-4 font-display text-4xl font-normal tracking-tight text-ink sm:text-[52px] sm:leading-[1.08]">
            Tell it what to do.
            <br />
            Sakhi <span className="italic">gets it done.</span>
          </h2>
        </div>
        <div className="mt-14">
          <CapabilityTabs />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Stats ---------------------------------- */
function Stats() {
  const stats = [
    { n: "200+", l: "apps connected" },
    { n: "1", l: "conversation" },
    { n: "0", l: "tabs to switch" },
  ];
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="grid gap-10 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <p className="font-display text-6xl font-normal tracking-tight text-ink sm:text-7xl">
              {s.n}
            </p>
            <p className="mt-2 text-[14px] uppercase tracking-[0.16em] text-ink-mute">{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ Final CTA -------------------------------- */
function FinalCTA() {
  return (
    <section id="waitlist" className="px-6 pb-28">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[36px] border border-line bg-card px-6 py-20 text-center">
        <div className="glow-hero pointer-events-none absolute inset-x-0 top-0 h-72 opacity-90" />
        <div className="relative">
          <Flourish className="mx-auto h-7 w-44 text-warm/70" />
          <h2 className="mt-6 font-display text-4xl font-normal tracking-tight text-ink sm:text-[56px] sm:leading-[1.05]">
            Meet your AI <span className="italic">sakhi</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lg text-ink-soft">
            Join the waitlist for early access.
          </p>
          <div className="mt-9 flex justify-center">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Footer --------------------------------- */
function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <Wordmark />
        <p className="text-[13px] text-ink-mute">
          Made with care in Bharat · © {new Date().getFullYear()} Sakhi AI
        </p>
        <div className="flex gap-7 text-[13px] text-ink-soft">
          <a href="#capabilities" className="transition hover:text-ink">Capabilities</a>
          <a href="#waitlist" className="transition hover:text-ink">Waitlist</a>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------- Page ---------------------------------- */
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Integrations />
      <Why />
      <Capabilities />
      <Stats />
      <FinalCTA />
      <Footer />
    </main>
  );
}
