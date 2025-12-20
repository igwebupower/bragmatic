import type { Metadata } from "next";
import { SectionHeading, SiteShell } from "../../components/site-shell";
import { VideoEmbed } from "../../components/video-embed";
import { founderVideo } from "../../lib/videos";

export const metadata: Metadata = {
  title: "About Bragnetic | UGC Creator Agency",
  description:
    "Bragnetic connects brands with vetted creators to produce scroll-stopping UGC video ads. Learn the mission and founder story.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="section bg-brand-black">
        <div className="container grid gap-8 md:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-6">
            <span className="eyebrow">About</span>
            <h1 className="headline text-4xl md:text-6xl">Built for creators and brands</h1>
            <p className="subhead text-lg">
              Bragnetic is a UGC creator agency connecting brands with vetted creators to produce
              scroll-stopping video ads.
            </p>
            <div className="card space-y-3">
              <div className="eyebrow">Founder story</div>
              <p className="text-text-secondary">
                Placeholder for founder story. Share the journey, the why, and the proof. Make it
                personal, confident, and focused on outcomes.
              </p>
            </div>
          </div>
          <div className="card h-full space-y-4">
            <VideoEmbed
              src={founderVideo.src}
              thumbnail={founderVideo.thumbnail}
              title={founderVideo.title}
              placeholder="Founder video"
            />
            <p className="text-text-secondary text-sm">
              Use this space for a portrait or a short intro video. Keep it intentional, not filler.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-surface-dark border-y border-border-subtle">
        <div className="container space-y-6">
          <SectionHeading
            eyebrow="Mission"
            title="Create content that earns attention"
            subhead="Marrying creative excellence with performance discipline."
          />
          <div className="grid-cards">
            <div className="card space-y-2">
              <h3 className="headline text-xl">Confidence through scale</h3>
              <p className="text-text-secondary">
                Bold headlines, decisive CTAs, and content that commands attention.
              </p>
            </div>
            <div className="card space-y-2">
              <h3 className="headline text-xl">Purposeful contrast</h3>
              <p className="text-text-secondary">
                Yellow on black used sparingly to guide focus and signal primary actions.
              </p>
            </div>
            <div className="card space-y-2">
              <h3 className="headline text-xl">Social proof as architecture</h3>
              <p className="text-text-secondary">
                Logos, stats, and outcomes aren’t decoration—they’re credibility infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-brand-black">
        <div className="container grid gap-6 md:grid-cols-2">
          <div className="card space-y-3">
            <div className="eyebrow">CTA</div>
            <h3 className="headline text-2xl">Work with us</h3>
            <p className="text-text-secondary">
              Brands: get UGC ads that convert. Creators: get briefs that fit your style.
            </p>
            <a href="/contact" className="btn btn-primary w-fit">
              Contact
            </a>
          </div>
          <div className="card space-y-3">
            <div className="eyebrow">Creators</div>
            <h3 className="headline text-2xl">Join as a creator</h3>
            <p className="text-text-secondary">
              Apply to the network, access briefs, and level up with the Academy.
            </p>
            <a href="/creators" className="text-brand-yellow font-semibold">
              Apply now →
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

