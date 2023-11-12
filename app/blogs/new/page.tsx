import PostBlogEditBlog from "@/components/PostBlogEditBlog";
import React from "react";

export default function NewBlogsPage() {
  return (
    <main className="min-h-screen px-6 w-full">
      <PostBlogEditBlog serviceTitle="Post New Blog" />
    </main>
  );
}
