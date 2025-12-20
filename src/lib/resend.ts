import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.warn("[resend] RESEND_API_KEY not set - emails will be skipped");
}

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const FROM_EMAIL = process.env.FROM_EMAIL || "Bragnetic <notifications@bragnetic.com>";
export const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "hello@bragnetic.com";
