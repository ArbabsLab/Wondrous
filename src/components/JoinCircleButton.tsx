"use client";

import { useState } from "react";
import { Button } from "./ui/button";

interface JoinCircleButtonProps {
  circleId: string;
}

export default function JoinCircleButton({ circleId }: JoinCircleButtonProps) {
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/circles/${circleId}/join`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to join circle");

      setIsJoined(true);
    } catch (err) {
      console.error(err);
      alert("Error joining circle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      variant={isJoined ? "secondary" : "default"}
      disabled={isJoined || loading}
      onClick={handleJoin}
    >
      {loading ? "Joining..." : isJoined ? "Joined" : "Join"}
    </Button>
  );
}
