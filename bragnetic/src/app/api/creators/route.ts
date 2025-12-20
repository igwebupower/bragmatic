import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { notifyCreatorApplication } from "@/lib/emails";
import { verifyTurnstile } from "@/lib/turnstile";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(160),
  portfolio: z.string().max(500).optional(),
  niches: z.string().max(200).optional(),
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

    await prisma.creatorApplication.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        portfolio: parsed.portfolio,
        niches: parsed.niches,
        message: parsed.message,
      },
    });

    await notifyCreatorApplication(parsed);

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: err.flatten() }, { status: 400 });
    }
    console.error("[creators][POST]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

