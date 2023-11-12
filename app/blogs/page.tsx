import BlogDisplay from "@/components/BlogDisplay";
import Link from "next/link";
import React from "react";

export default function BlogsPage() {
  return (
    <main className="px-6 w-full min-h-screen ">
      <h1 className="text-3xl font-bold  mt-3 border-b-2  text-white">Blogs</h1>
      <div className="mt-3 mb-3">
        <Link
          href={"/blogs/new"}
          className="font-semibold text-white bg-slate-900 px-3 py-1 hover:font-extrabold hover:scale-105 hover:bg-slate-700 transition-all focus:ring focus:ring-white focus:ring-offset-1 rounded-lg shadow-lg "
        >
          New Blog
        </Link>
      </div>
      <div className="">
        <BlogDisplay />
      </div>
    </main>
  );
}
