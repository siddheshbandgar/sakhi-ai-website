import { allApps } from "@/lib/data";
import { Flourish, Sparkle, Glyph } from "@/components/Motifs";
import WaitlistForm from "@/components/WaitlistForm";
import CapabilityTabs from "@/components/CapabilityTabs";
import Reveal from "@/components/Reveal";
import HeroGlow from "@/components/HeroGlow";
import CountUp from "@/components/CountUp";

/* ----------------------------- Brand wordmark ---------------------------- */
function Wordmark() {
  // To use your own logo: drop it at /public/logo.svg and swap <Glyph/> for
  // <img src="/logo.svg" alt="Sakhi" className="h-6 w-auto" />
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
      <HeroGlow />
      <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-24 text-center sm:pt-32">
        <Reveal><Flourish className="mx-auto h-7 w-44 text-warm/70" /></Reveal>
        <Reveal delay={60}>
          <p className="mt-6 font-deva text-[15px] text-ink-soft">आपकी डिजिटल सखी · AI for Bharat</p>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="mx-auto mt-7 max-w-4xl font-display text-[44px] font-normal leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-[76px]">
            The AI that
            <br />
            <span className="italic">actually does</span> the work
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
            Sakhi takes action across 200+ apps you already use — and gets the work done.
          </p>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-10 flex flex-col items-center gap-4">
            <WaitlistForm />
            <a href="#capabilities" className="text-[14px] text-ink-mute transition hover:text-ink">
              See what she can do ↓
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------- Integrations marquee -------------------------- */
function Integrations() {
  const row = [...allApps, ...allApps];
  return (
    <section id="integrations" className="py-12">
      <Reveal>
        <p className="mb-8 text-center text-[12px] font-medium uppercase tracking-[0.22em] text-ink-mute">
          Works with the tools you already live in
        </p>
      </Reveal>
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
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <Flourish className="mx-auto h-6 w-36 text-cool/60" />
          <h2 className="mt-6 font-display text-4xl font-normal tracking-tight text-ink sm:text-[52px] sm:leading-[1.08]">
            One assistant.
            <br />
            <span className="italic">Every</span> tool you use.
          </h2>
        </div>
      </Reveal>

      <div className="mt-16 grid items-stretch gap-4 lg:grid-cols-[1.1fr_1fr]">
        {/* Real image — City Palace archway, echoing the dome/arch motif */}
        <Reveal img className="img-zoom relative min-h-[360px] overflow-hidden rounded-[28px]">
          <img
            src="/images/archway.jpg"
            alt="Intricately painted archway of an Indian palace"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent" />
          <p className="absolute bottom-6 left-6 font-deva text-[15px] text-white/90">भारत की सुबह</p>
        </Reveal>

        {/* Points */}
        <div className="flex flex-col justify-center gap-2">
          {points.map((p, i) => (
            <Reveal key={p.t} delay={i * 110}>
              <div className="card-line lift rounded-2xl bg-card p-6">
                <div className="flex items-start gap-3.5">
                  <Sparkle className="mt-1 h-4 w-4 shrink-0 text-[var(--color-sage)]" />
                  <div>
                    <h3 className="font-display text-xl font-medium text-ink">{p.t}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{p.d}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Cinematic image band ------------------------ */
function Band() {
  return (
    <section className="relative h-[420px] overflow-hidden sm:h-[500px]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url(/images/temple.jpg)" }}
      />
      <div className="absolute inset-0 bg-ink/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />
      <div className="relative mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center">
        <Reveal>
          <Flourish className="mx-auto h-6 w-36 text-warm/80" />
          <h2 className="mt-6 font-display text-4xl font-normal leading-tight tracking-tight text-white sm:text-6xl">
            Frontier AI, <span className="italic">made for Bharat</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-white/75">
            Built to understand how you work, in the languages you actually speak.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- Capabilities ------------------------------ */
function Capabilities() {
  return (
    <section id="capabilities" className="relative overflow-hidden bg-paper-2/60 py-28">
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-ink-mute">Capabilities</p>
            <h2 className="mt-4 font-display text-4xl font-normal tracking-tight text-ink sm:text-[52px] sm:leading-[1.08]">
              Tell it what to do.
              <br />
              Sakhi <span className="italic">gets it done.</span>
            </h2>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-14">
            <CapabilityTabs />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- Stats ---------------------------------- */
function Stats() {
  const stats = [
    { node: <CountUp value={200} suffix="+" />, l: "apps connected" },
    { node: <CountUp value={1} />, l: "conversation" },
    { node: <CountUp value={0} />, l: "tabs to switch" },
  ];
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="grid gap-10 sm:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal key={s.l} delay={i * 120}>
            <div className="text-center">
              <p className="font-display text-6xl font-normal tracking-tight text-ink sm:text-7xl">
                {s.node}
              </p>
              <p className="mt-2 text-[14px] uppercase tracking-[0.16em] text-ink-mute">{s.l}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ Final CTA -------------------------------- */
function FinalCTA() {
  return (
    <section id="waitlist" className="px-6 pb-28">
      <Reveal>
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[36px] border border-line bg-card px-6 py-20 text-center">
          {/* soft marigold warmth behind the glow */}
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url(/images/marigold.jpg)" }}
          />
          <div className="glow-hero pointer-events-none absolute inset-x-0 top-0 h-72 opacity-90" />
          <div className="relative">
            <Flourish className="mx-auto h-7 w-44 text-warm/70" />
            <h2 className="mt-6 font-display text-4xl font-normal tracking-tight text-ink sm:text-[56px] sm:leading-[1.05]">
              Meet your AI <span className="italic">sakhi</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-lg text-ink-soft">Join the waitlist for early access.</p>
            <div className="mt-9 flex justify-center">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </Reveal>
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
      <Band />
      <Capabilities />
      <Stats />
      <FinalCTA />
      <Footer />
    </main>
  );
}
