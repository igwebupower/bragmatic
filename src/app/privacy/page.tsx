import type { Metadata } from "next";
import { SiteShell } from "../../components/site-shell";

export const metadata: Metadata = {
  title: "Privacy Policy | Bragnetic",
  description:
    "Learn how Bragnetic collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <SiteShell>
      <section className="section bg-brand-black">
        <div className="container max-w-3xl">
          <span className="eyebrow">Legal</span>
          <h1 className="headline text-4xl md:text-5xl mt-4 mb-8">Privacy Policy</h1>
          <p className="text-text-secondary mb-8">Last updated: January 2025</p>

          <div className="prose prose-invert space-y-8 text-text-secondary">
            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">1. Introduction</h2>
              <p>
                Bragnetic (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you visit our website or use our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">2. Information We Collect</h2>
              <p>We may collect information about you in various ways:</p>
              <h3 className="font-semibold text-text-primary">Personal Data</h3>
              <p>
                When you apply as a creator, submit a brand enquiry, or contact us, we collect
                information you voluntarily provide, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and contact information (email address)</li>
                <li>Company name and job title (for brand enquiries)</li>
                <li>Portfolio links and social media handles</li>
                <li>Content niches and areas of expertise</li>
                <li>Messages and communications you send to us</li>
              </ul>
              <h3 className="font-semibold text-text-primary mt-4">Automatically Collected Data</h3>
              <p>
                When you access our website, we may automatically collect certain information,
                including your IP address, browser type, operating system, access times, and
                pages viewed. This data helps us improve our services and user experience.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process creator applications and brand enquiries</li>
                <li>Match creators with relevant brand opportunities</li>
                <li>Communicate with you about our services</li>
                <li>Send you updates about the Creator Academy (if you opted in)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">4. Sharing Your Information</h2>
              <p>
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Brand partners (creator profiles only, with your consent)</li>
                <li>Service providers who assist in operating our platform</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your
                personal information against unauthorized access, alteration, disclosure, or
                destruction. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">6. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at{" "}
                <a href="mailto:hello@bragnetic.com" className="text-brand-yellow hover:underline">
                  hello@bragnetic.com
                </a>
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">7. Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience.
                For more information, please see our{" "}
                <a href="/cookies" className="text-brand-yellow hover:underline">
                  Cookie Policy
                </a>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">8. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any
                changes by posting the new Privacy Policy on this page and updating the
                &quot;Last updated&quot; date.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">9. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at:{" "}
                <a href="mailto:hello@bragnetic.com" className="text-brand-yellow hover:underline">
                  hello@bragnetic.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
