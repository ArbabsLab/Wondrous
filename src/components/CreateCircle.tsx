"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation"; 
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
  const router = useRouter();

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Circle name is required");
      return;
    }

    setLoading(true);
    try {
      await createCircle({
        name: name.trim(),
        description: description.trim(),
        type: type.trim(),
      });

      
      setName("");
      setType("");
      setDescription("");
      setOpen(false);

      onCreated?.();
      router.refresh(); 
    } catch (err) {
      console.error(err);
      alert("Failed to create circle");
    } finally {
      setLoading(false);
    }
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
        <form
          onSubmit={handleCreate}
          className="mt-2 space-y-2 p-2 border rounded-lg bg-purple-50 dark:bg-purple-900"
        >
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
            type="submit"
            className="px-4 py-2 rounded bg-purple-700 text-white hover:bg-purple-800 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Circle"}
          </button>
        </form>
      )}
    </div>
  );
}
