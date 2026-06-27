"use client";

import { useState } from "react";

export default function WaitlistForm() {
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
      <div className="flex items-center gap-3 rounded-full border border-line bg-card px-6 py-3.5 text-ink">
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
      className="group flex w-full max-w-md items-center gap-1.5 rounded-full border border-line bg-card p-1.5 shadow-[0_1px_2px_rgba(25,25,38,0.04)] transition focus-within:border-ink/25"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        aria-label="Email address"
        className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-ink placeholder:text-ink-mute outline-none"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:opacity-90 active:scale-[0.98]"
      >
        Join waitlist
      </button>
    </form>
  );
}
