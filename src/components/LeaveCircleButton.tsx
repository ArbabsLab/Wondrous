"use client";

import { useState } from "react";
import { leaveCircle } from "@/actions/circleActions";

interface LeaveCircleButtonProps {
  circleId: string;
  onLeft?: () => void; 
}

export default function LeaveCircleButton({ circleId, onLeft }: LeaveCircleButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleLeave = async () => {
  if (!confirm("Are you sure you want to leave this circle?")) return;
  setLoading(true);
  try {
    await fetch("/api/circles", {
      method: "POST",
      body: JSON.stringify({ action: "leave", circleId }),
      headers: { "Content-Type": "application/json" },
    });
    onLeft?.();
  } catch (err) {
    console.error(err);
    alert("Failed to leave circle");
  } finally { setLoading(false); }
};


  return (
    <button
      className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
      onClick={handleLeave}
      disabled={loading}
    >
      {loading ? "Leaving..." : "Leave"}
    </button>
  );
}
