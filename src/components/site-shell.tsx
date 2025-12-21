"use client";

import Link from "next/link";
import React, { useState } from "react";
import { CookieBanner } from "./cookie-banner";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-black text-text-primary">
      <header className="sticky top-0 z-30 backdrop-blur bg-black/70 border-b border-border-subtle">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
            <span className="h-8 w-8 rounded-full bg-brand-yellow text-brand-black grid place-items-center text-sm font-black">
              B
            </span>
            <span className="text-lg">Bragnetic</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-text-primary">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-brand-yellow transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/brands" className="hidden md:inline-flex btn btn-primary text-sm px-4 py-2">
              Work With Us
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-text-primary"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border-subtle bg-surface-dark">
            <div className="container py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-text-primary hover:text-brand-yellow transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/brands"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary text-sm mt-2"
              >
                Work With Us
              </Link>
            </div>
          </nav>
        )}
      </header>
      <main>{children}</main>
      <Footer />
      <CookieBanner />
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
      <div className="container py-16 grid gap-10 md:grid-cols-4">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
            <span className="h-8 w-8 rounded-full bg-brand-yellow text-brand-black grid place-items-center text-sm font-black">
              B
            </span>
            <span className="text-lg">Bragnetic</span>
          </Link>
          <p className="text-text-secondary text-sm leading-relaxed">
            UGC creator network delivering scroll-stopping video ads.
          </p>
        </div>
        <div className="space-y-4 text-sm">
          <div className="font-semibold text-text-primary">Pages</div>
          <div className="flex flex-col gap-3 text-text-secondary">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-brand-yellow transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-4 text-sm">
          <div className="font-semibold text-text-primary">Legal</div>
          <div className="flex flex-col gap-3 text-text-secondary">
            <Link href="/privacy" className="hover:text-brand-yellow transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand-yellow transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-brand-yellow transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
        <div className="space-y-4 text-sm">
          <div className="font-semibold text-text-primary">Social</div>
          <div className="flex flex-col gap-3 text-text-secondary">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">
              Instagram
            </a>
            <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">
              TikTok
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-brand-yellow/20">
        <div className="container py-6 text-center text-text-muted text-sm">
          © {new Date().getFullYear()} Bragnetic. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
