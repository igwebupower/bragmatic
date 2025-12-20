import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminAuth } from "@/lib/admin-auth";

export async function GET(request: Request) {
  const isAuthed = await verifyAdminAuth();
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  try {
    if (type === "creators") {
      const data = await prisma.creatorApplication.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
      });
      return NextResponse.json(data);
    }

    if (type === "brands") {
      const data = await prisma.brandEnquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
      });
      return NextResponse.json(data);
    }

    if (type === "contacts") {
      const data = await prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
      });
      return NextResponse.json(data);
    }

    if (type === "waitlist") {
      const data = await prisma.academyWaitlist.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
      });
      return NextResponse.json(data);
    }

    // Return counts for dashboard overview
    const [creators, brands, contacts, waitlist] = await Promise.all([
      prisma.creatorApplication.count(),
      prisma.brandEnquiry.count(),
      prisma.contactMessage.count(),
      prisma.academyWaitlist.count(),
    ]);

    return NextResponse.json({ creators, brands, contacts, waitlist });
  } catch (error) {
    console.error("[admin/data]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
