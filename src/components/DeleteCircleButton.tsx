"use client";

import { useTransition } from "react";
import { deleteCircle } from "@/actions/circleActions";

interface DeleteCircleButtonProps {
  circleId: string;
  onDeleted?: () => void;
}

export default function DeleteCircleButton({ circleId, onDeleted }: DeleteCircleButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this circle? This cannot be undone.")) return;

    startTransition(async () => {
      try {
        await deleteCircle(circleId);
        onDeleted?.();
      } catch (err) {
        console.error(err);
        alert("Failed to delete circle");
      }
    });
  };

  return (
    <button
      className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? "Deleting..." : "Delete Circle"}
    </button>
  );
}
