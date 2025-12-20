import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { notifyBrandEnquiry } from "@/lib/emails";
import { verifyTurnstile } from "@/lib/turnstile";

const schema = z.object({
  company: z.string().min(1).max(160),
  contact: z.string().min(1).max(160),
  email: z.string().email().max(160),
  jobTitle: z.string().max(160).optional(),
  industry: z.string().max(160).optional(),
  message: z.string().max(1000).optional(),
  turnstileToken: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.parse(body);

    const isValid = await verifyTurnstile(parsed.turnstileToken || "");
    if (!isValid) {
      return NextResponse.json({ ok: false, message: "Verification failed" }, { status: 400 });
    }

    await prisma.brandEnquiry.create({
      data: {
        company: parsed.company,
        contact: parsed.contact,
        email: parsed.email,
        jobTitle: parsed.jobTitle,
        industry: parsed.industry,
        message: parsed.message,
      },
    });

    await notifyBrandEnquiry(parsed);

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: err.flatten() }, { status: 400 });
    }
    console.error("[brands][POST]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

