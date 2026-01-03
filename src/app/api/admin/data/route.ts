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
  const status = searchParams.get("status");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");
  const skip = (page - 1) * limit;

  try {
    if (type === "creators") {
      const where: Record<string, unknown> = {};
      if (status) where.status = status;
      if (search) {
        where.OR = [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ];
      }
      const [data, total] = await Promise.all([
        prisma.creatorApplication.findMany({
          where,
          orderBy: { createdAt: "desc" },
          skip,
          take: limit,
        }),
        prisma.creatorApplication.count({ where }),
      ]);
      return NextResponse.json({ data, total, page, limit });
    }

    if (type === "brands") {
      const where: Record<string, unknown> = {};
      if (status) where.status = status;
      if (search) {
        where.OR = [
          { company: { contains: search, mode: "insensitive" } },
          { contact: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ];
      }
      const [data, total] = await Promise.all([
        prisma.brandEnquiry.findMany({
          where,
          orderBy: { createdAt: "desc" },
          skip,
          take: limit,
        }),
        prisma.brandEnquiry.count({ where }),
      ]);
      return NextResponse.json({ data, total, page, limit });
    }

    if (type === "contacts") {
      const where: Record<string, unknown> = {};
      if (status) where.status = status;
      if (search) {
        where.OR = [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ];
      }
      const [data, total] = await Promise.all([
        prisma.contactMessage.findMany({
          where,
          orderBy: { createdAt: "desc" },
          skip,
          take: limit,
        }),
        prisma.contactMessage.count({ where }),
      ]);
      return NextResponse.json({ data, total, page, limit });
    }

    if (type === "waitlist") {
      const where: Record<string, unknown> = {};
      if (status) where.status = status;
      if (search) {
        where.OR = [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ];
      }
      const [data, total] = await Promise.all([
        prisma.academyWaitlist.findMany({
          where,
          orderBy: { createdAt: "desc" },
          skip,
          take: limit,
        }),
        prisma.academyWaitlist.count({ where }),
      ]);
      return NextResponse.json({ data, total, page, limit });
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

export async function PATCH(request: Request) {
  const isAuthed = await verifyAdminAuth();
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, id, status, notes } = body;

    if (!type || !id) {
      return NextResponse.json({ error: "Missing type or id" }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    if (status !== undefined) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    updateData.reviewedAt = new Date();

    let result;
    switch (type) {
      case "creators":
        result = await prisma.creatorApplication.update({
          where: { id },
          data: updateData,
        });
        break;
      case "brands":
        result = await prisma.brandEnquiry.update({
          where: { id },
          data: updateData,
        });
        break;
      case "contacts":
        result = await prisma.contactMessage.update({
          where: { id },
          data: updateData,
        });
        break;
      case "waitlist":
        result = await prisma.academyWaitlist.update({
          where: { id },
          data: updateData,
        });
        break;
      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[admin/data PATCH]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const isAuthed = await verifyAdminAuth();
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  if (!type || !id) {
    return NextResponse.json({ error: "Missing type or id" }, { status: 400 });
  }

  try {
    switch (type) {
      case "creators":
        await prisma.creatorApplication.delete({ where: { id } });
        break;
      case "brands":
        await prisma.brandEnquiry.delete({ where: { id } });
        break;
      case "contacts":
        await prisma.contactMessage.delete({ where: { id } });
        break;
      case "waitlist":
        await prisma.academyWaitlist.delete({ where: { id } });
        break;
      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[admin/data DELETE]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
