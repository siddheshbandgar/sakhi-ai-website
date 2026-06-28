import { Glyph, Flourish, Sparkle } from "@/components/Motifs";
import WaitlistForm from "@/components/WaitlistForm";
import ImmersiveHero from "@/components/ImmersiveHero";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";

/* ----------------------------- Brand wordmark ---------------------------- */
function Wordmark() {
  return (
    <a href="#top" className="flex items-center gap-2.5">
      <Glyph className="h-5 w-5 text-white" />
      <span className="flex items-baseline gap-1.5">
        <span className="font-display text-[22px] font-medium tracking-tight text-white">Sakhi</span>
        <span className="font-deva text-base text-white/45 leading-none">सखी</span>
      </span>
    </a>
  );
}

/* --------------------------------- Nav ----------------------------------- */
function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Wordmark />
        <div className="hidden items-center gap-9 text-[14px] text-white/55 md:flex">
          <a href="#how" className="transition hover:text-white">How it works</a>
          <a href="#why" className="transition hover:text-white">Why Sakhi</a>
        </div>
        <a
          href="#waitlist"
          className="rounded-full bg-white px-5 py-2.5 text-[14px] font-medium text-[#070709] transition hover:opacity-90 active:scale-[0.98]"
        >
          Join waitlist
        </a>
      </nav>
    </header>
  );
}

/* ------------------------------- How it works ---------------------------- */
function How() {
  const steps = [
    { k: "Tell her", d: "Ask in plain language — English, हिंदी, or your mix of both." },
    { k: "She acts", d: "Sakhi works across your apps, with your context, in one chat." },
    { k: "It's done", d: "Emails sent, reports pulled, tasks closed — the work, finished." },
  ];
  return (
    <section id="how" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <Flourish className="mx-auto h-6 w-36 text-[#ee7b3d]/60" />
          <h2 className="mt-6 font-display text-4xl font-normal tracking-tight text-white sm:text-[52px] sm:leading-[1.08]">
            Tell it what to do.
            <br />
            <span className="italic">Sakhi gets it done.</span>
          </h2>
        </div>
      </Reveal>
      <div className="mt-16 grid gap-4 sm:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.k} delay={i * 110}>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm">
              <span className="font-display text-sm text-[#c9a24b]">0{i + 1}</span>
              <h3 className="mt-2 font-display text-2xl font-medium text-white">{s.k}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/55">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
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
    <section id="why" className="relative border-y border-white/5 bg-white/[0.015] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {points.map((p, i) => (
            <Reveal key={p.t} delay={i * 110}>
              <div className="h-full rounded-3xl border border-white/10 bg-[#0d0d14]/60 p-7">
                <Sparkle className="h-4 w-4 text-[var(--color-sage)]" />
                <h3 className="mt-4 font-display text-xl font-medium text-white">{p.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/55">{p.d}</p>
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
              <p className="font-display text-6xl font-normal tracking-tight text-white sm:text-7xl">{s.node}</p>
              <p className="mt-2 text-[14px] uppercase tracking-[0.16em] text-white/35">{s.l}</p>
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
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[36px] border border-white/10 bg-[#0c0c13] px-6 py-20 text-center">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(238,123,61,0.22),transparent_70%)]" />
          <div className="relative">
            <Flourish className="mx-auto h-7 w-44 text-[#ee7b3d]/70" />
            <h2 className="mt-6 font-display text-4xl font-normal tracking-tight text-white sm:text-[56px] sm:leading-[1.05]">
              Meet your AI <span className="italic">sakhi</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-lg text-white/55">Join the waitlist for early access.</p>
            <div className="mt-9 flex justify-center">
              <WaitlistForm dark />
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
    <footer className="border-t border-white/8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <Wordmark />
        <p className="text-[13px] text-white/35">
          Made with care in Bharat · © {new Date().getFullYear()} Sakhi AI
        </p>
        <div className="flex gap-7 text-[13px] text-white/55">
          <a href="#how" className="transition hover:text-white">How it works</a>
          <a href="#waitlist" className="transition hover:text-white">Waitlist</a>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------- Page ---------------------------------- */
export default function Home() {
  return (
    <main id="top" className="bg-[#070709]">
      <Nav />
      <ImmersiveHero />
      <How />
      <Why />
      <Stats />
      <FinalCTA />
      <Footer />
    </main>
  );
}
