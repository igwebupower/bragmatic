import type { Metadata } from "next";
import { SiteShell } from "../../components/site-shell";

export const metadata: Metadata = {
  title: "Cookie Policy | Bragnetic",
  description:
    "Learn how Bragnetic uses cookies and similar technologies on our website.",
};

export default function CookiesPage() {
  return (
    <SiteShell>
      <section className="section bg-brand-black">
        <div className="container max-w-3xl">
          <span className="eyebrow">Legal</span>
          <h1 className="headline text-4xl md:text-5xl mt-4 mb-8">Cookie Policy</h1>
          <p className="text-text-secondary mb-8">Last updated: January 2025</p>

          <div className="prose prose-invert space-y-8 text-text-secondary">
            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit a
                website. They are widely used to make websites work more efficiently and to
                provide information to website owners.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">2. How We Use Cookies</h2>
              <p>
                Bragnetic uses cookies and similar technologies for various purposes:
              </p>

              <div className="card mt-4 space-y-3">
                <h3 className="font-semibold text-text-primary">Necessary Cookies</h3>
                <p>
                  These cookies are essential for the website to function properly. They enable
                  basic functions like page navigation, secure areas access, and remembering
                  your cookie preferences. The website cannot function properly without these cookies.
                </p>
                <p className="text-sm text-text-muted">
                  Examples: Session cookies, authentication cookies, security cookies
                </p>
              </div>

              <div className="card mt-4 space-y-3">
                <h3 className="font-semibold text-text-primary">Analytics Cookies</h3>
                <p>
                  These cookies help us understand how visitors interact with our website by
                  collecting and reporting information anonymously. This helps us improve our
                  website and services.
                </p>
                <p className="text-sm text-text-muted">
                  Examples: Page views, traffic sources, user behavior patterns
                </p>
              </div>

              <div className="card mt-4 space-y-3">
                <h3 className="font-semibold text-text-primary">Marketing Cookies</h3>
                <p>
                  These cookies are used to track visitors across websites. The intention is to
                  display ads that are relevant and engaging for the individual user.
                </p>
                <p className="text-sm text-text-muted">
                  Examples: Retargeting cookies, social media pixels
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">3. Third-Party Cookies</h2>
              <p>
                Some cookies on our website are placed by third-party services. These may include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Cloudflare Turnstile:</strong> Used for spam protection and bot
                  detection on our forms
                </li>
                <li>
                  <strong>Analytics providers:</strong> To help us understand website usage
                </li>
                <li>
                  <strong>Social media platforms:</strong> If you interact with social
                  sharing features
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">4. Managing Cookies</h2>
              <p>
                You can manage your cookie preferences at any time through our cookie consent
                banner. You can also control cookies through your browser settings:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Chrome:</strong> Settings → Privacy and security → Cookies
                </li>
                <li>
                  <strong>Firefox:</strong> Settings → Privacy & Security → Cookies
                </li>
                <li>
                  <strong>Safari:</strong> Preferences → Privacy → Cookies
                </li>
                <li>
                  <strong>Edge:</strong> Settings → Cookies and site permissions
                </li>
              </ul>
              <p className="mt-4">
                Note that disabling certain cookies may affect the functionality of our website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">5. Cookie Duration</h2>
              <p>Cookies can be either session or persistent:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Session cookies:</strong> Deleted when you close your browser
                </li>
                <li>
                  <strong>Persistent cookies:</strong> Remain on your device for a set period
                  or until you delete them
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">6. Your Consent</h2>
              <p>
                When you first visit our website, we ask for your consent to use non-essential
                cookies. You can change your preferences at any time by clicking the cookie
                settings in our website footer or by clearing your browser cookies and
                revisiting our site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">7. Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in
                technology, legislation, or our data practices. Any changes will be posted
                on this page with an updated revision date.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">8. Contact Us</h2>
              <p>
                If you have questions about our use of cookies, please contact us at:{" "}
                <a href="mailto:hello@bragnetic.com" className="text-brand-yellow hover:underline">
                  hello@bragnetic.com
                </a>
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="headline text-2xl text-text-primary">9. More Information</h2>
              <p>
                For more information about cookies and your privacy, please see our{" "}
                <a href="/privacy" className="text-brand-yellow hover:underline">
                  Privacy Policy
                </a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
