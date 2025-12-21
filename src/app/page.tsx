"use client";
import Link from "next/link";
import { SiteShell, SectionHeading } from "../components/site-shell";
import { VideoEmbed, VideoGrid } from "../components/video-embed";
import { showcaseVideos, heroVideo } from "../lib/videos";
import { useState } from "react";

const creatorSteps = [
  { title: "Apply", copy: "Submit your portfolio and join our vetted network." },
  { title: "Match", copy: "Get paired with brands that fit your style." },
  { title: "Create", copy: "Produce content, get paid, build your portfolio." },
];

const brandSteps = [
  { title: "Brief", copy: "Tell us about your campaign and goals." },
  { title: "Match", copy: "We select perfect creators for your brand." },
  { title: "Receive", copy: "Get scroll-stopping content, ready to deploy." },
];

const stats = [
  { value: "50+", label: "Creators" },
  { value: "100+", label: "Videos Delivered" },
  { value: "5M+", label: "Views Generated" },
  { value: "10", label: "Platforms Covered" },
];

const logos = ["TikTok", "Instagram", "YouTube", "Meta", "Snapchat"];

const pathways = [
  {
    title: "For Creators",
    copy: "Join our network and work with top brands on paid video ads.",
    cta: "Apply Now →",
    href: "/creators",
  },
  {
    title: "For Brands",
    copy: "Get authentic UGC content that drives results across platforms.",
    cta: "Work With Us →",
    href: "/brands",
  },
];

function ToggleSteps() {
  const [view, setView] = useState<"creators" | "brands">("creators");
  const steps = view === "creators" ? creatorSteps : brandSteps;
  return (
    <section className="section bg-brand-black">
      <div className="container space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SectionHeading
            eyebrow="How it works"
            title="One workflow, two audiences"
            subhead="Toggle between creator and brand pathways without losing the premium feel."
          />
          <div className="pill-toggle">
            <button
              className={view === "creators" ? "active" : ""}
              onClick={() => setView("creators")}
              aria-pressed={view === "creators"}
            >
              For Creators
            </button>
            <button
              className={view === "brands" ? "active" : ""}
              onClick={() => setView("brands")}
              aria-pressed={view === "brands"}
            >
              For Brands
            </button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="card space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-brand-yellow text-3xl font-extrabold">{index + 1}</span>
                <span className="text-text-muted text-sm">Step {index + 1}</span>
              </div>
              <h3 className="headline text-xl">{step.title}</h3>
              <p className="text-text-secondary">{step.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <SiteShell>
      <section className="section bg-brand-black">
        <div className="container grid gap-10 md:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <span className="eyebrow">UGC CREATOR NETWORK</span>
            <h1 className="headline text-4xl md:text-6xl">
              Create Content.
              <br />
              Drive Results.
            </h1>
            <p className="subhead text-lg md:text-xl max-w-xl">
              Connect with brands. Produce scroll-stopping video ads. Get paid.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/creators" className="btn btn-primary">
                Join as Creator
              </Link>
              <Link href="/brands" className="btn btn-outline-light">
                I&apos;m a Brand
              </Link>
            </div>
          </div>
          <div className="card h-full">
            <div className="space-y-4">
              <h3 className="headline text-2xl">Built for video-first brands</h3>
              <p className="text-text-secondary">
                Premium yet simple. Designed to showcase UGC that converts across TikTok, Reels,
                Shorts, and more.
              </p>
              <VideoEmbed
                src={heroVideo.src}
                thumbnail={heroVideo.thumbnail}
                title={heroVideo.title}
                placeholder="Hero video coming soon"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-surface-dark border-t border-border-subtle border-b">
        <div className="container space-y-6">
          <div className="eyebrow">Content that performs across</div>
          <div className="logo-strip">
            {logos.map((logo) => (
              <div key={logo} className="text-lg font-semibold text-text-secondary">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ToggleSteps />

      <section className="section bg-brand-yellow text-brand-black">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-4 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-2">
                <div className="headline text-4xl">{stat.value}</div>
                <div className="text-base font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-brand-black">
        <div className="container space-y-8">
          <SectionHeading eyebrow="Recent work" title="Video showcase" subhead="Scroll-stopping content from our creators." />
          <VideoGrid videos={showcaseVideos} />
        </div>
      </section>

      <section className="section bg-brand-black">
        <div className="container grid gap-4 md:grid-cols-2">
          {pathways.map((path) => (
            <Link href={path.href} key={path.title} className="card space-y-3">
              <div className="eyebrow">{path.title}</div>
              <h3 className="headline text-2xl">{path.title}</h3>
              <p className="text-text-secondary">{path.copy}</p>
              <span className="text-brand-yellow font-semibold">{path.cta}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section bg-brand-yellow text-brand-black">
        <div className="container flex flex-col items-center gap-4 text-center">
          <h3 className="headline text-3xl md:text-4xl">Ready to create content that converts?</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/creators" className="btn btn-dark">
              Join as Creator
            </Link>
            <Link href="/contact" className="btn btn-outline-dark">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
