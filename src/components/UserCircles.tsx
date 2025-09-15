"use client";

import Link from "next/link";

interface UserCirclesProps {
  initialCircles: { id: string; name: string; description?: string | null }[];
}

export default function UserCircles({ initialCircles }: UserCirclesProps) {
  return (
    <div className="space-y-4">
      {initialCircles.length > 0 ? (
        initialCircles.map((circle) => (
          <Link
            key={circle.id}
            href={`/circles/${circle.id}`}
            className="block p-4 border rounded-lg hover:bg-muted/50 transition"
          >
            <h2 className="font-semibold">{circle.name}</h2>
            {circle.description && (
              <p className="text-sm text-muted-foreground">{circle.description}</p>
            )}
          </Link>
        ))
      ) : (
        <p className="text-muted-foreground">You haven’t joined any circles yet.</p>
      )}
    </div>
  );
}