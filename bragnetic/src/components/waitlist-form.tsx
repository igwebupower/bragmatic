"use client";

import { useState, useRef } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

type Status = { state: "idle" | "submitting" | "success" | "error"; message?: string };

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

export function WaitlistForm({ dark = false }: { dark?: boolean }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [token, setToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const honeypot = formData.get("website_url");
    if (honeypot) return;

    if (!token && TURNSTILE_SITE_KEY) {
      setStatus({ state: "error", message: "Please complete the verification" });
      return;
    }

    setStatus({ state: "submitting" });

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          name: formData.get("name"),
          turnstileToken: token,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ state: "success", message: data.message || "You're on the list!" });
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus({ state: "error", message: data.message || "Something went wrong" });
      }

      turnstileRef.current?.reset();
      setToken("");
    } catch {
      setStatus({ state: "error", message: "Something went wrong" });
      turnstileRef.current?.reset();
      setToken("");
    }
  }

  const inputClass = dark
    ? "w-full rounded-md border border-black/20 bg-white/10 px-3 py-2 text-black placeholder:text-black/50"
    : "w-full rounded-md border border-border-subtle bg-surface-dark px-3 py-2 text-text-primary";

  const labelClass = dark ? "text-sm text-black/70" : "text-sm text-text-secondary";

  if (status.state === "success") {
    return (
      <div className={`rounded-xl p-6 ${dark ? "bg-black/10" : "bg-surface-dark"}`}>
        <p className={`text-center font-medium ${dark ? "text-black" : "text-green-400"}`}>
          {status.message}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className={labelClass}>
          Name
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className={`mt-1 ${inputClass}`}
          />
        </label>
        <label className={labelClass}>
          Email*
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            className={`mt-1 ${inputClass}`}
          />
        </label>
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        <label>
          Website URL
          <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {TURNSTILE_SITE_KEY && (
        <Turnstile
          ref={turnstileRef}
          siteKey={TURNSTILE_SITE_KEY}
          onSuccess={setToken}
          onError={() => setToken("")}
          onExpire={() => setToken("")}
          options={{ theme: dark ? "light" : "dark" }}
        />
      )}

      <button
        type="submit"
        disabled={status.state === "submitting"}
        className={dark ? "btn btn-dark w-full" : "btn btn-primary w-full"}
      >
        {status.state === "submitting" ? "Joining..." : "Join Waitlist"}
      </button>

      {status.state === "error" && (
        <p className={`text-sm ${dark ? "text-red-700" : "text-red-400"}`}>{status.message}</p>
      )}
    </form>
  );
}
