"use client";

import DisplayBlogsItems from "@/components/DisplayBlogsItems";
import HighLightBlog from "@/components/HighLightBlog";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full min-h-screen ">
      <HighLightBlog />
      <DisplayBlogsItems />
    </main>
  );
}
