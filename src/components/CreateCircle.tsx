"use client";

import { useState } from "react";
import { createCircle } from "@/actions/circleActions";

interface CreateCircleButtonProps {
  onCreated?: () => void; 
}

export default function CreateCircleButton({ onCreated }: CreateCircleButtonProps) {
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
  if (!name) return alert("Circle name is required");
  setLoading(true);
  try {
    await fetch("/api/circles", {
      method: "POST",
      body: JSON.stringify({ action: "create", name, type, description }),
      headers: { "Content-Type": "application/json" },
    });
    setName(""); setType(""); setDescription("");
    onCreated?.();
    setOpen(false);
  } catch (err) {
    console.error(err);
    alert("Failed to create circle");
  } finally { setLoading(false); }
};


  return (
    <div>
      {/* Toggle button */}
      <button
        className="px-4 py-2 rounded bg-purple-700 text-white hover:bg-purple-800"
        onClick={() => setOpen(!isOpen)}
      >
        {isOpen ? "Cancel" : "Create New Circle"}
      </button>

      {/* Form */}
      {isOpen && (
        <div className="mt-2 space-y-2 p-2 border rounded-lg bg-purple-50 dark:bg-purple-900">
          <input
            className="w-full p-2 rounded border"
            placeholder="Circle Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full p-2 rounded border"
            placeholder="Type (optional)"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <textarea
            className="w-full p-2 rounded border"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="px-4 py-2 rounded bg-purple-700 text-white hover:bg-purple-800 disabled:opacity-50"
            onClick={handleCreate}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Circle"}
          </button>
        </div>
      )}
    </div>
  );
}
