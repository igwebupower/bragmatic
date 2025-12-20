import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyTurnstile } from "@/lib/turnstile";

const schema = z.object({
  email: z.string().email().max(160),
  name: z.string().max(120).optional(),
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

    // Check if already on waitlist
    const existing = await prisma.academyWaitlist.findUnique({
      where: { email: parsed.email },
    });

    if (existing) {
      return NextResponse.json({ ok: true, message: "You're already on the waitlist!" });
    }

    await prisma.academyWaitlist.create({
      data: {
        email: parsed.email,
        name: parsed.name,
      },
    });

    return NextResponse.json({ ok: true, message: "You're on the list! We'll notify you when enrollment opens." });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: err.flatten() }, { status: 400 });
    }
    console.error("[waitlist][POST]", err);
    return NextResponse.json({ ok: false, message: "Something went wrong" }, { status: 500 });
  }
}
