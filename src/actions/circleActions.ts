import prisma from "@/lib/prisma";
import { getDbUserId } from "./userActions";

export async function getRandomCircles() {
  try {
    const userId = await getDbUserId();
    if (!userId) return [];

    // Fetch 3 random circles the user isn't a member of and didn't create
    const randomCircles = await prisma.circle.findMany({
      where: {
        creatorId: { not: userId },
        members: {
          none: {
            userId: userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        type: true,
        description: true,
        _count: {
          select: {
            members: true,
          },
        },
      },
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
    });

    return randomCircles;
  } catch (error) {
    console.log("Error fetching random circles", error);
    return [];
  }
}
