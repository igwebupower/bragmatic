import type { Metadata } from "next";
import { SectionHeading, SiteShell } from "../../components/site-shell";
import { ContactForm } from "../../components/forms";

export const metadata: Metadata = {
  title: "Contact Bragnetic | UGC Creator Agency",
  description:
    "Reach Bragnetic for creator enquiries, brand campaigns, or general questions. Let’s build scroll-stopping content.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="section bg-brand-black">
        <div className="container grid gap-8 md:grid-cols-2 items-start">
          <div className="space-y-4">
            <SectionHeading
              eyebrow="Contact"
              title="Let’s build scroll-stopping content"
              subhead="Pick a path: creator enquiry, brand enquiry, or general."
            />
            <div className="card space-y-2">
              <p className="text-text-secondary text-sm">Email: hello@bragnetic.com</p>
              <div className="flex gap-4 text-text-secondary text-sm">
                <a className="hover:text-brand-yellow" href="https://www.instagram.com">
                  Instagram
                </a>
                <a className="hover:text-brand-yellow" href="https://www.tiktok.com">
                  TikTok
                </a>
                <a className="hover:text-brand-yellow" href="https://www.linkedin.com">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </SiteShell>
  );
}

