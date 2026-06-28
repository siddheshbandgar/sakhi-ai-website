"use client";

import { useState } from "react";

export default function WaitlistForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // No backend yet — acknowledge locally. Wire this to your waitlist API.
    setDone(true);
  }

  if (done) {
    return (
      <div
        className={`flex items-center gap-3 rounded-full px-6 py-3.5 ${
          dark ? "border border-white/15 bg-white/5 text-white" : "border border-line bg-card text-ink"
        }`}
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--color-sage)] text-xs text-white">
          ✓
        </span>
        <p className="text-sm font-medium">
          You&apos;re on the list — we&apos;ll be in touch with early access.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`group flex w-full max-w-md items-center gap-1.5 rounded-full p-1.5 transition ${
        dark
          ? "border border-white/15 bg-white/[0.06] backdrop-blur focus-within:border-white/35"
          : "border border-line bg-card shadow-[0_1px_2px_rgba(25,25,38,0.04)] focus-within:border-ink/25"
      }`}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        aria-label="Email address"
        className={`min-w-0 flex-1 bg-transparent px-4 py-2.5 outline-none ${
          dark ? "text-white placeholder:text-white/40" : "text-ink placeholder:text-ink-mute"
        }`}
      />
      <button
        type="submit"
        className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition active:scale-[0.98] ${
          dark ? "bg-white text-[#070709] hover:opacity-90" : "bg-ink text-paper hover:opacity-90"
        }`}
      >
        Join waitlist
      </button>
    </form>
  );
}
