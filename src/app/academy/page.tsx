import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading, SiteShell } from "../../components/site-shell";
import { VideoEmbed } from "../../components/video-embed";
import { WaitlistForm } from "../../components/waitlist-form";
import { academyTeaserVideo } from "../../lib/videos";
import { academyConfig } from "../../lib/academy";

export const metadata: Metadata = {
  title: "Bragnetic Creator Academy | Launch Your UGC Career",
  description:
    "30-day course to master UGC for performance: scripting, shooting, editing, pitching. Templates, tutorials, community access.",
};

const modules = [
  "Module 1: Foundations of UGC for performance",
  "Module 2: Scripting and shooting for vertical video",
  "Module 3: Editing for scroll-stopping hooks",
  "Module 4: Pitching, pricing, and closing deals",
];

const inclusions = ["Templates: briefs, scripts, pitches", "Video tutorials", "Community access", "Office hours (TBD)"];

export default function AcademyPage() {
  return (
    <SiteShell>
      <section className="section bg-brand-black">
        <div className="container grid gap-8 md:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <span className="eyebrow">Academy</span>
            <h1 className="headline text-4xl md:text-6xl">Bragnetic Creator Academy</h1>
            <p className="subhead text-lg">
              A 30-day course to launch your UGC career. Learn the craft, ship the work, win the briefs.
            </p>
            <div className="flex gap-3">
              <Link href="#enroll" className="btn btn-primary">
                Enroll Now
              </Link>
              <Link href="/contact" className="btn btn-outline-light">
                Ask a question
              </Link>
            </div>
          </div>
          <div className="card space-y-4">
            <div className="eyebrow">Included</div>
            <ul className="text-text-secondary space-y-2">
              {inclusions.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <VideoEmbed
              src={academyTeaserVideo.src}
              thumbnail={academyTeaserVideo.thumbnail}
              title={academyTeaserVideo.title}
              placeholder="Course teaser"
            />
          </div>
        </div>
      </section>

      <section className="section bg-surface-dark border-y border-border-subtle">
        <div className="container space-y-6">
          <SectionHeading eyebrow="Curriculum" title="What you'll learn" />
          <div className="grid-cards">
            {modules.map((module) => (
              <div key={module} className="card space-y-2">
                <h3 className="headline text-lg">{module}</h3>
                <p className="text-text-secondary">
                  Tight lessons, actionable frameworks, and assignments that ship.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="enroll" className="section bg-brand-yellow text-brand-black">
        <div className="container">
          {academyConfig.status === "coming_soon" && (
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="space-y-4">
                <div className="eyebrow text-black">Coming Soon</div>
                <h3 className="headline text-3xl">Be the first to know</h3>
                <p className="text-base">
                  Join the waitlist to get notified when enrollment opens. Early supporters get exclusive pricing.
                </p>
              </div>
              <div className="bg-black/5 rounded-xl p-6">
                <WaitlistForm dark />
              </div>
            </div>
          )}

          {academyConfig.status === "open" && (
            <div className="grid gap-8 md:grid-cols-2 items-start">
              <div className="space-y-4">
                <div className="eyebrow text-black">Pricing</div>
                <h3 className="headline text-3xl">{academyConfig.headline}</h3>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-bold">{academyConfig.price}</span>
                  {academyConfig.originalPrice && (
                    <span className="text-xl line-through opacity-60">{academyConfig.originalPrice}</span>
                  )}
                </div>
                <p className="text-base">{academyConfig.description}</p>
                <Link href={academyConfig.enrollUrl} className="btn btn-dark inline-block">
                  Enroll Now
                </Link>
              </div>
              <div className="bg-black/5 rounded-xl p-6">
                <h4 className="font-semibold mb-4">What&apos;s included:</h4>
                <ul className="space-y-2">
                  {academyConfig.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-black mt-1">&#10003;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {academyConfig.status === "closed" && (
            <div className="text-center space-y-4">
              <div className="eyebrow text-black">Enrollment Closed</div>
              <h3 className="headline text-3xl">We&apos;re not accepting new students right now</h3>
              <p className="text-base max-w-xl mx-auto">
                Join the waitlist to be notified when enrollment opens again.
              </p>
              <div className="max-w-md mx-auto">
                <WaitlistForm dark />
              </div>
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}

