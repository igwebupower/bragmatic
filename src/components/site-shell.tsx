import Link from "next/link";
import React from "react";

type NavLink = {
  href: string;
  label: string;
};

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/creators", label: "Creators" },
  { href: "/brands", label: "Brands" },
  { href: "/academy", label: "Academy" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-black text-text-primary">
      <header className="sticky top-0 z-30 backdrop-blur bg-black/70 border-b border-border-subtle">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
            <span className="h-8 w-8 rounded-full bg-brand-yellow text-black grid place-items-center text-sm font-black">
              B
            </span>
            <span className="text-lg">Bragnetic</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-text-secondary">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-brand-yellow transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
          <Link href="/brands" className="btn btn-primary text-sm px-4 py-2">
            Work With Us
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subhead,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subhead?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`flex flex-col gap-3 ${align === "center" ? "items-center text-center" : ""}`}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="headline text-3xl md:text-4xl">{title}</h2>
      {subhead ? <p className="subhead max-w-3xl">{subhead}</p> : null}
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-brand-black">
      <div className="container py-12 grid gap-8 md:grid-cols-4">
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
            <span className="h-8 w-8 rounded-full bg-brand-yellow text-black grid place-items-center text-sm font-black">
              B
            </span>
            <span className="text-lg">Bragnetic</span>
          </Link>
          <p className="text-text-secondary text-sm">
            UGC creator network delivering scroll-stopping video ads.
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <div className="font-semibold text-text-primary">Pages</div>
          <div className="flex flex-col gap-2 text-text-secondary">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-brand-yellow">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <div className="font-semibold text-text-primary">Legal</div>
          <div className="flex flex-col gap-2 text-text-secondary">
            <Link href="/privacy" className="hover:text-brand-yellow">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-brand-yellow">
              Terms
            </Link>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <div className="font-semibold text-text-primary">Social</div>
          <div className="flex flex-col gap-2 text-text-secondary">
            <a href="https://www.instagram.com" className="hover:text-brand-yellow">
              Instagram
            </a>
            <a href="https://www.tiktok.com" className="hover:text-brand-yellow">
              TikTok
            </a>
            <a href="https://www.linkedin.com" className="hover:text-brand-yellow">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border-subtle py-4 text-center text-text-muted text-sm">
        © 2025 Bragnetic. All rights reserved.
      </div>
    </footer>
  );
}

