import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { notifyContactMessage } from "@/lib/emails";
import { verifyTurnstile } from "@/lib/turnstile";

const schema = z.object({
  name: z.string().max(160).optional(),
  email: z.string().email().max(160),
  type: z.enum(["Creator enquiry", "Brand enquiry", "General"]),
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

    await prisma.contactMessage.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        type: parsed.type,
        message: parsed.message,
      },
    });

    await notifyContactMessage(parsed);

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: err.flatten() }, { status: 400 });
    }
    console.error("[contact][POST]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

