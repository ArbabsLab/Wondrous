import prisma from "@/lib/prisma";
import { getDbUserId } from "@/actions/userActions";
import JoinCircleButton from "@/components/JoinCircleButton";
import LeaveCircleButton from "@/components/LeaveCircleButton";
import DeleteCircleButton from "@/components/DeleteCircleButton";
import CreatePostForm from "@/components/CreatePostForm";
import { notFound } from "next/navigation";

interface CirclePageProps {
  params: { id: string };
}

export default async function CirclePage({ params }: CirclePageProps) {
  const { id } = await params;
  const userId = await getDbUserId();

  const circle = await prisma.circle.findUnique({
    where: { id },
    include: {
      members: { select: { userId: true } },
      _count: { select: { members: true, posts: true } },
      posts: {
        include: {
          author: { select: { id: true, name: true, username: true, image: true } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!circle) return notFound();

  const isCreator = circle.creatorId === userId;
  const isMember = circle.members.some((m) => m.userId === userId);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Circle Header */}
      <div className="p-6 rounded-lg border bg-card shadow-sm">
        <h1 className="text-2xl font-bold">{circle.name}</h1>
        <p className="text-muted-foreground">{circle.description}</p>
        <p className="text-sm mt-2">
          {circle._count.members} members · {circle._count.posts} posts
        </p>
        <div className="mt-4 flex gap-2">
          {isCreator ? (
            <DeleteCircleButton circleId={circle.id} />
          ) : isMember ? (
            <LeaveCircleButton circleId={circle.id} />
          ) : (
            <JoinCircleButton circleId={circle.id} />
          )}
        </div>
      </div>

      {/* Post creation form */}
      {(isCreator || isMember) && (
        <div className="p-4 rounded-lg border bg-card shadow-sm">
          <CreatePostForm circleId={circle.id} />
        </div>
      )}

      {/* Circle Posts */}
      <div className="space-y-4">
        {circle.posts.length > 0 ? (
          circle.posts.map((post) => (
            <div
              key={post.id}
              className="p-4 border rounded-lg bg-muted/30"
            >
              <p className="font-semibold">
                {post.author.name} (@{post.author.username})
              </p>
              {post.content && <p className="mt-1">{post.content}</p>}
              <p className="text-xs text-muted-foreground mt-1">
                {post.createdAt.toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">No posts yet in this circle.</p>
        )}
      </div>
    </div>
  );
}
