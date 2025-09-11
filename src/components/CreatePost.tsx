"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";
import { Button } from "./ui/button";
import { createPost } from "@/actions/postActions";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";

function CreatePost() {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [writer, setWriter] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !genre.trim() || !writer.trim() || (!content.trim() && !imageUrl)) {
      toast.error("Please fill in all fields before posting");
      return;
    }

    setIsPosting(true);
    try {
      const result = await createPost(title, genre, writer, content, imageUrl);
      if (result?.success) {
        setTitle("");
        setGenre("");
        setWriter("");
        setContent("");
        setImageUrl("");
        setShowImageUpload(false);

        toast.success("Book logged successfully");
      }
    } catch (error) {
      console.error("Failed to create book log:", error);
      toast.error("Failed to create book log");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6 space-y-4">
        {/* AVATAR + BOOK METADATA */}
        <div className="flex space-x-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user?.imageUrl || "/avatar.png"} />
          </Avatar>
          <div className="flex-1 grid gap-3">
            <Input
              placeholder="Book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isPosting}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="Author"
                value={writer}
                onChange={(e) => setWriter(e.target.value)}
                disabled={isPosting}
              />
              <Input
                placeholder="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                disabled={isPosting}
              />
            </div>
          </div>
        </div>

        {/* THOUGHTS */}
        <Textarea
          placeholder="Write your thoughts about this book..."
          className="min-h-[100px] resize-none text-base"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isPosting}
        />
        {(showImageUpload || imageUrl) && (
            <div className="border rounded-lg p-4">
              <ImageUpload
                endpoint="postImage"
                value={imageUrl}
                onChange={(url) => {
                  setImageUrl(url);
                  if (!url) setShowImageUpload(false);
                }}
              />
            </div>
          )}
        {/* IMAGE + SUBMIT BUTTONS */}
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary"
              onClick={() => setShowImageUpload(!showImageUpload)}
              disabled={isPosting}
            >
              <ImageIcon className="size-4 mr-2" />
              Photo
            </Button>
          </div>
          <Button
            className="flex items-center"
            onClick={handleSubmit}
            disabled={
              (!title.trim() || !writer.trim() || !genre.trim() || (!content.trim() && !imageUrl)) ||
              isPosting
            }
          >
            {isPosting ? (
              <>
                <Loader2Icon className="size-4 mr-2 animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <SendIcon className="size-4 mr-2" />
                Post
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default CreatePost;
