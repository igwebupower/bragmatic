/**
 * Academy configuration.
 * Update these values to control pricing and enrollment.
 */

export const academyConfig = {
  /**
   * Status: "coming_soon" | "open" | "closed"
   * - coming_soon: Shows waitlist form
   * - open: Shows price and enroll button
   * - closed: Shows "enrollment closed" message
   */
  status: "coming_soon" as "coming_soon" | "open" | "closed",

  /**
   * Price display (e.g., "$199", "£149", "Free")
   */
  price: "$199",

  /**
   * Original price for showing discount (optional)
   */
  originalPrice: "$299",

  /**
   * Enrollment URL (Gumroad, Podia, Stripe, etc.)
   */
  enrollUrl: "https://example.com/enroll",

  /**
   * Pricing headline
   */
  headline: "Launch pricing",

  /**
   * Pricing description
   */
  description: "One-time payment. Lifetime access. No upsells.",

  /**
   * What's included (shown in pricing section)
   */
  includes: [
    "4 comprehensive modules",
    "Templates & scripts",
    "Private community access",
    "Weekly office hours",
    "Lifetime updates",
  ],
};
