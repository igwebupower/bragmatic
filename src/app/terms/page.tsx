import type { Metadata } from "next";
import { SiteShell } from "../../components/site-shell";

export const metadata: Metadata = {
  title: "Terms of Service | Bragnetic",
  description:
    "Terms and conditions for using Bragnetic's UGC creator agency services.",
};

export default function TermsPage() {
  return (
    <SiteShell>
      <section className="section bg-brand-black">
        <div className="container max-w-3xl">
          <span className="eyebrow">Legal</span>
          <h1 className="headline text-4xl md:text-5xl mt-4 mb-8">Terms of Service</h1>
          <p className="text-text-secondary mb-8">Last updated: January 2025</p>

          <div className="prose prose-invert space-y-8 text-text-secondary">
            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Bragnetic website and services, you agree to be bound
                by these Terms of Service. If you do not agree to these terms, please do not
                use our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">2. Description of Services</h2>
              <p>
                Bragnetic is a UGC (User-Generated Content) creator agency that connects brands
                with vetted content creators for video advertising campaigns. Our services include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Creator network and talent matching</li>
                <li>Brand campaign facilitation</li>
                <li>Creator Academy educational resources</li>
                <li>Content production coordination</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">3. Creator Terms</h2>
              <p>If you apply to join our creator network, you agree that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All information provided in your application is accurate and complete</li>
                <li>You have the legal right to create and license content</li>
                <li>You will maintain professional standards in all brand collaborations</li>
                <li>You will meet agreed deadlines and deliverables</li>
                <li>Content created for brands becomes the property of the brand upon payment</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">4. Brand Terms</h2>
              <p>If you engage our services as a brand, you agree that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You will provide clear and complete creative briefs</li>
                <li>Payment will be made according to agreed terms</li>
                <li>You will use content only as specified in the agreement</li>
                <li>You will not request content that violates laws or platform policies</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">5. Intellectual Property</h2>
              <p>
                All content on the Bragnetic website, including text, graphics, logos, and
                software, is the property of Bragnetic or its content suppliers and is
                protected by intellectual property laws.
              </p>
              <p>
                Content created through our services is subject to individual agreements
                between creators and brands, facilitated by Bragnetic.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">6. User Conduct</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use our services for any unlawful purpose</li>
                <li>Submit false or misleading information</li>
                <li>Interfere with the proper functioning of our website</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Harass, abuse, or harm other users</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">7. Payments and Fees</h2>
              <p>
                Specific payment terms, fees, and commission structures are outlined in
                individual agreements with creators and brands. Bragnetic reserves the right
                to modify pricing with reasonable notice.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">8. Limitation of Liability</h2>
              <p>
                Bragnetic provides its services &quot;as is&quot; without warranties of any kind.
                We are not liable for any indirect, incidental, special, or consequential
                damages arising from your use of our services.
              </p>
              <p>
                Our total liability shall not exceed the amount paid by you for services
                in the twelve months preceding the claim.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">9. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Bragnetic and its affiliates from
                any claims, damages, or expenses arising from your use of our services or
                violation of these terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">10. Termination</h2>
              <p>
                We may terminate or suspend your access to our services at any time, without
                prior notice, for conduct that we believe violates these Terms or is harmful
                to other users or our business.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">11. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Continued use of our
                services after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">12. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with applicable
                law, without regard to conflict of law principles.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">13. Contact</h2>
              <p>
                For questions about these Terms, please contact us at:{" "}
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
