import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading, SiteShell } from "../../components/site-shell";
import { CreatorInlineForm } from "../../components/forms";
import { VideoEmbed } from "../../components/video-embed";
import { creatorSpotlightVideo } from "../../lib/videos";

export const metadata: Metadata = {
  title: "Paid UGC Creator Network | Bragnetic",
  description:
    "Join Bragnetic’s vetted UGC creator network. Get paid briefs from brands, build your portfolio, and level up with the Creator Academy.",
};

const benefits = [
  { title: "Get Paid", copy: "Work with paying brands, not just gifted products." },
  { title: "Build Portfolio", copy: "Create for recognizable brands and grow your reel." },
  { title: "Flexible", copy: "Work from anywhere, choose the briefs that fit you." },
  { title: "Support", copy: "Access Creator Academy and community." },
];

const steps = ["Apply", "Review", "Match", "Create"];

export default function CreatorsPage() {
  return (
    <SiteShell>
      <section className="section bg-brand-black">
        <div className="container grid gap-8 md:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <span className="eyebrow">Creators</span>
            <h1 className="headline text-4xl md:text-6xl">Turn Your Content Into a Career</h1>
            <p className="subhead text-lg">
              Join our network of creators producing paid video content for global brands.
            </p>
            <div className="flex gap-3">
              <Link href="https://tally.so/r/lbaedB" className="btn btn-primary">
                Apply Now
              </Link>
              <Link href="/academy" className="btn btn-outline-light">
                Creator Academy
              </Link>
            </div>
          </div>
          <div className="card space-y-4">
            <VideoEmbed
              src={creatorSpotlightVideo.src}
              thumbnail={creatorSpotlightVideo.thumbnail}
              title={creatorSpotlightVideo.title}
              placeholder="Creator spotlight"
              aspect="9:16"
            />
            <p className="text-text-secondary text-sm">
              Showcase your best TikTok/Reels/Shorts work. We pair you with briefs that fit your style.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-brand-black">
        <div className="container space-y-6">
          <SectionHeading eyebrow="Benefits" title="Why creators choose Bragnetic" />
          <div className="grid-cards">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="card space-y-2">
                <h3 className="headline text-xl">{benefit.title}</h3>
                <p className="text-text-secondary">{benefit.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface-dark border-t border-border-subtle border-b">
        <div className="container space-y-6">
          <SectionHeading eyebrow="How to join" title="Simple, fast onboarding" />
          <div className="grid gap-4 md:grid-cols-4">
            {steps.map((step, idx) => (
              <div key={step} className="card space-y-2">
                <div className="text-brand-yellow font-extrabold text-xl">0{idx + 1}</div>
                <h4 className="headline text-lg">{step}</h4>
                <p className="text-text-secondary">
                  {idx === 0 && "Fill out the application with links to your work."}
                  {idx === 1 && "We assess your portfolio for quality and fit."}
                  {idx === 2 && "Start receiving briefs matched to your niche."}
                  {idx === 3 && "Deliver, get paid, and grow your reputation."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-brand-black">
        <div className="container grid gap-6 md:grid-cols-2">
          <div className="card space-y-3">
            <div className="eyebrow">Academy</div>
            <h3 className="headline text-2xl">Level Up with Creator Academy</h3>
            <p className="text-text-secondary">
              30-day course to launch your UGC career: briefs, scripts, pitches, and community.
            </p>
            <Link href="/academy" className="text-brand-yellow font-semibold">
              Learn More →
            </Link>
          </div>
          <div className="card space-y-3">
            <div className="eyebrow">Application</div>
            <h3 className="headline text-2xl">Ready to join?</h3>
            <p className="text-text-secondary">
              Fill out the Tally form. We review every submission with care.
            </p>
            <Link href="https://tally.so/r/lbaedB" className="btn btn-primary w-fit">
              Open Application
            </Link>
          </div>
          <CreatorInlineForm />
        </div>
      </section>
    </SiteShell>
  );
}

