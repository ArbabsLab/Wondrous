import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getDbUserId } from "@/actions/userActions";

export async function POST(req: NextRequest) {
  const { action, circleId, name, type, description } = await req.json();
  const userId = await getDbUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  try {
    if (action === "create") {
      const circle = await prisma.circle.create({
        data: { name, type, description, creatorId: userId },
      });
      return NextResponse.json(circle);
    }

    if (action === "join") {
      const membership = await prisma.circleMember.create({
        data: { circleId, userId },
      });
      return NextResponse.json(membership);
    }

    if (action === "leave") {
      await prisma.circleMember.delete({
        where: { circleId_userId: { circleId, userId } },
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
