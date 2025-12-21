"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
};

const CONSENT_KEY = "bragnetic_cookie_consent";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  function saveConsent(consent: CookieConsent) {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    setShowBanner(false);
    setShowPreferences(false);
  }

  function acceptAll() {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    });
  }

  function rejectAll() {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    });
  }

  function savePreferences() {
    saveConsent({
      necessary: true,
      analytics: preferences.analytics,
      marketing: preferences.marketing,
      timestamp: Date.now(),
    });
  }

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="container">
        <div className="bg-surface-card border border-border-subtle rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto">
          {!showPreferences ? (
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="hidden sm:block text-2xl">🍪</div>
                <div className="flex-1 space-y-2">
                  <h3 className="headline text-lg">We value your privacy</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                    By clicking &quot;Accept All&quot;, you consent to our use of cookies. You can manage your preferences
                    or learn more in our{" "}
                    <Link href="/privacy" className="text-brand-yellow hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="btn btn-outline-light text-sm order-3 sm:order-1"
                >
                  Manage Preferences
                </button>
                <button
                  onClick={rejectAll}
                  className="btn btn-outline-light text-sm order-2"
                >
                  Reject All
                </button>
                <button
                  onClick={acceptAll}
                  className="btn btn-primary text-sm order-1 sm:order-3"
                >
                  Accept All
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="space-y-2">
                <h3 className="headline text-lg">Cookie Preferences</h3>
                <p className="text-text-secondary text-sm">
                  Choose which cookies you want to allow. Your preferences will be saved for future visits.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface-dark rounded-xl border border-border-subtle">
                  <div className="space-y-1">
                    <div className="font-semibold text-sm">Necessary Cookies</div>
                    <p className="text-text-muted text-xs">
                      Required for the website to function. Cannot be disabled.
                    </p>
                  </div>
                  <div className="bg-brand-yellow/20 text-brand-yellow text-xs font-semibold px-3 py-1 rounded-full">
                    Always On
                  </div>
                </div>

                <label className="flex items-center justify-between p-4 bg-surface-dark rounded-xl border border-border-subtle cursor-pointer hover:border-brand-yellow/50 transition-colors">
                  <div className="space-y-1">
                    <div className="font-semibold text-sm">Analytics Cookies</div>
                    <p className="text-text-muted text-xs">
                      Help us understand how visitors interact with our website.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="w-5 h-5 rounded accent-brand-yellow cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-surface-dark rounded-xl border border-border-subtle cursor-pointer hover:border-brand-yellow/50 transition-colors">
                  <div className="space-y-1">
                    <div className="font-semibold text-sm">Marketing Cookies</div>
                    <p className="text-text-muted text-xs">
                      Used to deliver personalized ads and track campaign performance.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    className="w-5 h-5 rounded accent-brand-yellow cursor-pointer"
                  />
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-2">
                <button
                  onClick={() => setShowPreferences(false)}
                  className="btn btn-outline-light text-sm"
                >
                  Back
                </button>
                <button
                  onClick={savePreferences}
                  className="btn btn-primary text-sm"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
