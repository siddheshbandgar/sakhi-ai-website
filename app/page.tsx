import { Glyph, Flourish, Sparkle } from "@/components/Motifs";
import WaitlistForm from "@/components/WaitlistForm";
import ImmersiveHero from "@/components/ImmersiveHero";
import CapabilityTabs from "@/components/CapabilityTabs";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Wordmark />
        <div className="hidden items-center gap-9 text-[14px] text-ink-soft md:flex">
          <a href="#capabilities" className="transition hover:text-ink">Use cases</a>
          <a href="#why" className="transition hover:text-ink">Why Sakhi</a>
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

/* ------------------------------ Capabilities ----------------------------- */
function Capabilities() {
  return (
    <section id="capabilities" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-medium tracking-tight text-ink sm:text-[52px] sm:leading-[1.06]">
            Tell it what to do.
            <br />
            <span className="italic font-normal">Sakhi gets it done.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft sm:text-base">
            Works with 2,000+ apps you already use. Summarize emails, update tasks,
            review PRs, and pull reports, all in one conversation.
          </p>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <div className="mt-14">
          <CapabilityTabs />
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------ Why / points ----------------------------- */
function Why() {
  const points = [
    { t: "Acts, doesn't just answer", d: "She completes the task across your apps, then reports back when it's done." },
    { t: "Lives in your stack", d: "2,000+ integrations, one conversation. No tab-switching, no copy-paste." },
    { t: "Speaks your language", d: "English, हिंदी, and the mix you actually type. Built for how Bharat works." },
  ];
  return (
    <section id="why" className="relative border-y border-line bg-paper-2/50 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {points.map((p, i) => (
            <Reveal key={p.t} delay={i * 110}>
              <div className="card-line h-full rounded-3xl bg-card p-7">
                <Sparkle className="h-4 w-4 text-[var(--color-sage)]" />
                <h3 className="mt-4 font-display text-xl font-medium text-ink">{p.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Stats ---------------------------------- */
function Stats() {
  const stats = [
    { node: <CountUp value={2000} suffix="+" />, l: "apps connected" },
    { node: <CountUp value={1} />, l: "conversation" },
    { node: <CountUp value={0} />, l: "tabs to switch" },
  ];
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="grid gap-10 sm:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal key={s.l} delay={i * 120}>
            <div className="text-center">
              <p className="font-display text-6xl font-normal tracking-tight text-ink sm:text-7xl">{s.node}</p>
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
          <a href="#capabilities" className="transition hover:text-ink">Use cases</a>
          <a href="#waitlist" className="transition hover:text-ink">Waitlist</a>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------- Page ---------------------------------- */
export default function Home() {
  return (
    <main id="top" className="bg-paper">
      <Nav />
      <ImmersiveHero />
      <Capabilities />
      <Why />
      <Stats />
      <FinalCTA />
      <Footer />
    </main>
  );
}
