"use client";

import { useEffect, useState } from "react";
import { getRandomCircles, joinCircle } from "@/actions/circleActions";

export default function WhoToJoin() {
  const [circles, setCircles] = useState<any[]>([]);

  const fetchCircles = async () => {
    const data = await getRandomCircles();
    setCircles(data);
  };

  
  const handleJoin = async (circleId: string) => {
  await fetch("/api/circles", {
    method: "POST",
    body: JSON.stringify({ action: "join", circleId }),
    headers: { "Content-Type": "application/json" },
  });
  fetchCircles();
};


  useEffect(() => {
    fetchCircles();
  }, []);

  if (circles.length === 0) return <p>No circles to join right now.</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Who to Join</h2>
      {circles.map((circle) => (
        <div
          key={circle.id}
          className="flex justify-between items-center p-4 border rounded-lg bg-purple-50 dark:bg-purple-800"
        >
          <div>
            <p className="font-medium">{circle.name}</p>
            <p className="text-sm text-gray-500">{circle._count.members} members</p>
          </div>
          <button
            className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
            onClick={() => handleJoin(circle.id)}
          >
            Join
          </button>
        </div>
      ))}
    </div>
  );
}
