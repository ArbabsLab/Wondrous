"use server";

import prisma from "@/lib/prisma";
import { getDbUserId } from "./userActions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCircle({
  name,
  description,
  type,
}: {
  name: string;
  description?: string;
  type?: string;
}) {
  const userId = await getDbUserId();
  if (!userId) throw new Error("Not authenticated");

  const circle = await prisma.circle.create({
    data: {
      name,
      description,
      type,
      creatorId: userId,
      members: {
        create: { userId },
      },
    },
    include: { members: true },
  });

  
  revalidatePath("/circles");

  return circle;
}

export async function getRandomCircles() {
  try {
    const userId = await getDbUserId();
    if (!userId) return [];

    return await prisma.circle.findMany({
      where: {
        creatorId: { not: userId },
        members: { none: { userId } },
      },
      select: {
        id: true,
        name: true,
        type: true,
        description: true,
        _count: { select: { members: true } },
      },
      take: 3,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.log("Error fetching random circles", error);
    return [];
  }
}

export async function getUserCircles() {
  const userId = await getDbUserId();
  if (!userId) return [];

  return await prisma.circle.findMany({
    where: {
      OR: [
        { creatorId: userId },
        { members: { some: { userId } } },
      ],
    },
    include: { _count: { select: { members: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function joinCircle(circleId: string) {
  const userId = await getDbUserId();
  if (!userId) throw new Error("Not authenticated");

  const existing = await prisma.circleMember.findUnique({
    where: { circleId_userId: { circleId, userId } },
  });
  if (existing) return existing;

  const membership = await prisma.circleMember.create({ data: { circleId, userId } });

  
  revalidatePath("/circles");
  revalidatePath(`/circles/${circleId}`);

  return membership;
}

export async function leaveCircle(circleId: string) {
  const userId = await getDbUserId();
  if (!userId) throw new Error("Not authenticated");

  await prisma.circleMember.deleteMany({
    where: { circleId, userId },
  });

  redirect("/circles");
}

export async function deleteCircle(circleId: string) {
  const userId = await getDbUserId();
  if (!userId) throw new Error("Not authenticated");

  const circle = await prisma.circle.findUnique({
    where: { id: circleId },
    select: { creatorId: true },
  });

  if (!circle) throw new Error("Circle not found");
  if (circle.creatorId !== userId) throw new Error("Not authorized");

  await prisma.circle.delete({ where: { id: circleId } });

  redirect("/circles");

  return { success: true };
}

interface CreateCirclePostInput {
  circleId: string;
  content?: string;
}

export async function createCirclePost({ circleId, content }: CreateCirclePostInput) {
  const userId = await getDbUserId();
  if (!userId) return { success: false, error: "Not authenticated" };

  try {
    const post = await prisma.circlePost.create({
      data: { circleId, content, authorId: userId },
      include: {
        author: { select: { id: true, name: true, username: true, image: true } },
      },
    });

    
    revalidatePath(`/circles/${circleId}`);

    return { success: true, post };
  } catch (error) {
    console.error("Failed to create circle post:", error);
    return { success: false, error: "Failed to create circle post" };
  }
}
