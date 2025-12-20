"use client";

import { useState, useRef } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

type Status = { state: "idle" | "submitting" | "success" | "error"; message?: string };

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

async function postJSON(url: string, data: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json?.message || "Request failed");
  }
  return res.json();
}

export function BrandEnquiryForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [token, setToken] = useState<string>("");
  const turnstileRef = useRef<TurnstileInstance>(null);

  async function handleSubmit(formData: FormData) {
    const honeypot = formData.get("website_url");
    if (honeypot) return;

    if (!token && TURNSTILE_SITE_KEY) {
      setStatus({ state: "error", message: "Please complete the verification" });
      return;
    }

    setStatus({ state: "submitting" });
    try {
      await postJSON("/api/brands", {
        company: formData.get("company"),
        contact: formData.get("contact"),
        email: formData.get("email"),
        jobTitle: formData.get("jobTitle"),
        industry: formData.get("industry"),
        message: formData.get("message"),
        turnstileToken: token,
      });
      setStatus({ state: "success", message: "Enquiry submitted. We'll respond soon." });
      turnstileRef.current?.reset();
      setToken("");
    } catch (error) {
      setStatus({ state: "error", message: (error as Error).message });
      turnstileRef.current?.reset();
      setToken("");
    }
  }

  return (
    <form
      className="card space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(new FormData(e.currentTarget));
      }}
    >
      <div className="grid gap-3">
        <Input label="Company name*" name="company" placeholder="Acme Co." required />
        <Input label="Contact name*" name="contact" placeholder="Jordan Smith" required />
        <Input label="Email*" type="email" name="email" placeholder="you@company.com" required />
        <Input label="Job title" name="jobTitle" placeholder="Marketing Lead" />
        <Select
          label="Industry"
          name="industry"
          options={["Consumer", "Ecommerce", "SaaS", "Gaming", "Other"]}
        />
        <Textarea
          label="Message"
          name="message"
          placeholder="Campaign goals, budget, timeline..."
          rows={4}
        />
        <Honeypot />
      </div>
      {TURNSTILE_SITE_KEY && (
        <Turnstile
          ref={turnstileRef}
          siteKey={TURNSTILE_SITE_KEY}
          onSuccess={setToken}
          onError={() => setToken("")}
          onExpire={() => setToken("")}
          options={{ theme: "dark" }}
        />
      )}
      <button type="submit" className="btn btn-primary w-full" disabled={status.state === "submitting"}>
        {status.state === "submitting" ? "Submitting..." : "Submit Enquiry"}
      </button>
      {status.state === "success" ? (
        <p className="text-green-400 text-sm">{status.message}</p>
      ) : status.state === "error" ? (
        <p className="text-red-400 text-sm">{status.message}</p>
      ) : null}
    </form>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [token, setToken] = useState<string>("");
  const turnstileRef = useRef<TurnstileInstance>(null);

  async function handleSubmit(formData: FormData) {
    const honeypot = formData.get("website_url");
    if (honeypot) return;

    if (!token && TURNSTILE_SITE_KEY) {
      setStatus({ state: "error", message: "Please complete the verification" });
      return;
    }

    setStatus({ state: "submitting" });
    try {
      await postJSON("/api/contact", {
        name: formData.get("name"),
        email: formData.get("email"),
        type: formData.get("type"),
        message: formData.get("message"),
        turnstileToken: token,
      });
      setStatus({ state: "success", message: "Message sent. We'll reply soon." });
      turnstileRef.current?.reset();
      setToken("");
    } catch (error) {
      setStatus({ state: "error", message: (error as Error).message });
      turnstileRef.current?.reset();
      setToken("");
    }
  }

  return (
    <form
      className="card space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(new FormData(e.currentTarget));
      }}
    >
      <div className="grid gap-3">
        <Input label="Name" name="name" placeholder="Your name" />
        <Input label="Email" type="email" name="email" placeholder="you@example.com" required />
        <Select label="Type" name="type" options={["Creator enquiry", "Brand enquiry", "General"]} />
        <Textarea label="Message" name="message" placeholder="How can we help?" rows={4} />
        <Honeypot />
      </div>
      {TURNSTILE_SITE_KEY && (
        <Turnstile
          ref={turnstileRef}
          siteKey={TURNSTILE_SITE_KEY}
          onSuccess={setToken}
          onError={() => setToken("")}
          onExpire={() => setToken("")}
          options={{ theme: "dark" }}
        />
      )}
      <button type="submit" className="btn btn-primary w-full" disabled={status.state === "submitting"}>
        {status.state === "submitting" ? "Sending..." : "Send"}
      </button>
      {status.state === "success" ? (
        <p className="text-green-400 text-sm">{status.message}</p>
      ) : status.state === "error" ? (
        <p className="text-red-400 text-sm">{status.message}</p>
      ) : null}
    </form>
  );
}

export function CreatorInlineForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [token, setToken] = useState<string>("");
  const turnstileRef = useRef<TurnstileInstance>(null);

  async function handleSubmit(formData: FormData) {
    const honeypot = formData.get("website_url");
    if (honeypot) return;

    if (!token && TURNSTILE_SITE_KEY) {
      setStatus({ state: "error", message: "Please complete the verification" });
      return;
    }

    setStatus({ state: "submitting" });
    try {
      await postJSON("/api/creators", {
        name: formData.get("name"),
        email: formData.get("email"),
        portfolio: formData.get("portfolio"),
        niches: formData.get("niches"),
        message: formData.get("message"),
        turnstileToken: token,
      });
      setStatus({ state: "success", message: "Application submitted. We'll review shortly." });
      turnstileRef.current?.reset();
      setToken("");
    } catch (error) {
      setStatus({ state: "error", message: (error as Error).message });
      turnstileRef.current?.reset();
      setToken("");
    }
  }

  return (
    <form
      className="card space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(new FormData(e.currentTarget));
      }}
    >
      <div className="grid gap-3">
        <Input label="Name*" name="name" placeholder="Your name" required />
        <Input label="Email*" type="email" name="email" placeholder="you@example.com" required />
        <Input label="Portfolio" name="portfolio" placeholder="Links to TikTok/Reels/Shorts" />
        <Input label="Niches" name="niches" placeholder="e.g., beauty, fitness, tech" />
        <Textarea label="Message" name="message" placeholder="Tell us about your work" rows={3} />
        <Honeypot />
      </div>
      {TURNSTILE_SITE_KEY && (
        <Turnstile
          ref={turnstileRef}
          siteKey={TURNSTILE_SITE_KEY}
          onSuccess={setToken}
          onError={() => setToken("")}
          onExpire={() => setToken("")}
          options={{ theme: "dark" }}
        />
      )}
      <button type="submit" className="btn btn-primary w-full" disabled={status.state === "submitting"}>
        {status.state === "submitting" ? "Submitting..." : "Submit Application"}
      </button>
      {status.state === "success" ? (
        <p className="text-green-400 text-sm">{status.message}</p>
      ) : status.state === "error" ? (
        <p className="text-red-400 text-sm">{status.message}</p>
      ) : null}
    </form>
  );
}

function Input({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="text-sm text-text-secondary">
      {label}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-1 w-full rounded-md border border-border-subtle bg-surface-dark px-3 py-2 text-text-primary"
      />
    </label>
  );
}

function Textarea({
  label,
  name,
  placeholder,
  rows = 4,
}: {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="text-sm text-text-secondary">
      {label}
      <textarea
        name={name}
        placeholder={placeholder}
        rows={rows}
        className="mt-1 w-full rounded-md border border-border-subtle bg-surface-dark px-3 py-2 text-text-primary"
      />
    </label>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="text-sm text-text-secondary">
      {label}
      <select
        name={name}
        className="mt-1 w-full rounded-md border border-border-subtle bg-surface-dark px-3 py-2 text-text-primary"
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </label>
  );
}

function Honeypot() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
      <label>
        Website URL
        <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

