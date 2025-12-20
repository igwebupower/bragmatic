import { resend, FROM_EMAIL, NOTIFY_EMAIL } from "./resend";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

type CreatorData = {
  name: string;
  email: string;
  portfolio?: string;
  niches?: string;
  message?: string;
};

type BrandData = {
  company: string;
  contact: string;
  email: string;
  jobTitle?: string;
  industry?: string;
  message?: string;
};

type ContactData = {
  name?: string;
  email: string;
  type: string;
  message?: string;
};

export async function notifyCreatorApplication(data: CreatorData) {
  if (!resend) return;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `New Creator Application: ${escapeHtml(data.name)}`,
      html: `
        <h2>New Creator Application</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        ${data.portfolio ? `<p><strong>Portfolio:</strong> ${escapeHtml(data.portfolio)}</p>` : ""}
        ${data.niches ? `<p><strong>Niches:</strong> ${escapeHtml(data.niches)}</p>` : ""}
        ${data.message ? `<p><strong>Message:</strong></p><p>${escapeHtml(data.message)}</p>` : ""}
      `,
    });
  } catch (err) {
    console.error("[email] Failed to send creator notification:", err);
  }
}

export async function notifyBrandEnquiry(data: BrandData) {
  if (!resend) return;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `New Brand Enquiry: ${escapeHtml(data.company)}`,
      html: `
        <h2>New Brand Enquiry</h2>
        <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
        <p><strong>Contact:</strong> ${escapeHtml(data.contact)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        ${data.jobTitle ? `<p><strong>Job Title:</strong> ${escapeHtml(data.jobTitle)}</p>` : ""}
        ${data.industry ? `<p><strong>Industry:</strong> ${escapeHtml(data.industry)}</p>` : ""}
        ${data.message ? `<p><strong>Message:</strong></p><p>${escapeHtml(data.message)}</p>` : ""}
      `,
    });
  } catch (err) {
    console.error("[email] Failed to send brand notification:", err);
  }
}

export async function notifyContactMessage(data: ContactData) {
  if (!resend) return;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `New Contact: ${escapeHtml(data.type)}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Type:</strong> ${escapeHtml(data.type)}</p>
        ${data.name ? `<p><strong>Name:</strong> ${escapeHtml(data.name)}</p>` : ""}
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        ${data.message ? `<p><strong>Message:</strong></p><p>${escapeHtml(data.message)}</p>` : ""}
      `,
    });
  } catch (err) {
    console.error("[email] Failed to send contact notification:", err);
  }
}
