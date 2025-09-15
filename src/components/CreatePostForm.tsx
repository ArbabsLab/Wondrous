"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCirclePost } from "@/actions/circleActions";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface CreatePostFormProps {
  circleId: string;
}

export default function CreatePostForm({ circleId }: CreatePostFormProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const result = await createCirclePost({ circleId, content });
      if (!result.success) throw new Error(result.error);
      setContent("");
      router.refresh(); // Refresh the page to show the new post
    } catch (error) {
      console.error(error);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        placeholder="Write your post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={loading}
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Posting..." : "Post"}
      </Button>
    </form>
  );
}
