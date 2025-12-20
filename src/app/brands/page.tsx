import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading, SiteShell } from "../../components/site-shell";
import { BrandEnquiryForm } from "../../components/forms";

export const metadata: Metadata = {
  title: "UGC Video Production for Brands | Bragnetic",
  description:
    "Partner with vetted UGC creators for authentic, high-performing video ads. Fast turnaround, platform-native content, full service.",
};

const reasons = [
  { title: "Vetted Creators", copy: "Hand-picked, quality-checked creators across niches." },
  { title: "Platform-Native", copy: "Made for TikTok, Reels, Shorts, and platform best practices." },
  { title: "Fast Turnaround", copy: "Days, not weeks. Agile production to hit campaign windows." },
  { title: "Full Service", copy: "Briefing, casting, production, delivery—handled." },
];

const process = [
  "Brief — share your goals",
  "Match — we select creators",
  "Create — content production",
  "Deliver — ready-to-use assets",
];

const platforms = ["TikTok", "Instagram", "YouTube", "Meta", "Snapchat"];

export default function BrandsPage() {
  return (
    <SiteShell>
      <section className="section bg-brand-black">
        <div className="container grid gap-8 md:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <span className="eyebrow">Brands</span>
            <h1 className="headline text-4xl md:text-6xl">Content That Converts</h1>
            <p className="subhead text-lg">
              Partner with vetted creators to produce authentic, high-performing video ads.
            </p>
            <div className="flex gap-3">
              <Link href="#enquiry" className="btn btn-primary">
                Get Started
              </Link>
              <Link href="/contact" className="btn btn-outline-light">
                Talk to us
              </Link>
            </div>
          </div>
          <div className="card space-y-4">
            <div className="eyebrow">Platform coverage</div>
            <div className="logo-strip">
              {platforms.map((p) => (
                <div key={p} className="text-lg font-semibold text-text-secondary">
                  {p}
                </div>
              ))}
            </div>
            <p className="text-text-secondary text-sm">
              UGC tailored to each channel’s norms and attention patterns.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-brand-black">
        <div className="container space-y-6">
          <SectionHeading eyebrow="Why Bragnetic" title="Built for performance" />
          <div className="grid-cards">
            {reasons.map((item) => (
              <div key={item.title} className="card space-y-2">
                <h3 className="headline text-xl">{item.title}</h3>
                <p className="text-text-secondary">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface-dark border-y border-border-subtle">
        <div className="container space-y-6">
          <SectionHeading eyebrow="Process" title="Fast, clear, reliable" />
          <div className="grid gap-4 md:grid-cols-4">
            {process.map((item, idx) => (
              <div key={item} className="card space-y-2">
                <div className="text-brand-yellow font-extrabold text-xl">0{idx + 1}</div>
                <h4 className="headline text-lg">{item.split(" — ")[0]}</h4>
                <p className="text-text-secondary">{item.split(" — ")[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="enquiry" className="section bg-brand-black">
        <div className="container grid gap-8 md:grid-cols-2 items-start">
          <div className="space-y-4">
            <SectionHeading
              eyebrow="Enquiry"
              title="Tell us about your campaign"
              subhead="We’ll respond within 1 business day."
            />
            <p className="text-text-secondary text-sm">
              Prefer a form? Use the contact page. This section stays simple for speed.
            </p>
          </div>
          <BrandEnquiryForm />
        </div>
      </section>
    </SiteShell>
  );
}

