"use client";

import BlogDisplayChild from "./BlogDisplayChild";
import { useGetQuery } from "@/app/libs/services/blogsServices/useGetBlogs";
import Spinners from "./Spinners";
export default function BlogDisplay() {
  const { blogsData, error, isLoading } = useGetQuery();
  return (
    <main className="w-full grid grid-cols-3 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
      {isLoading ? (
        <div className="w-full  flex h-full justify-center">
          <Spinners />
        </div>
      ) : (
        blogsData.blogsData.map((blog: any) => (
          <BlogDisplayChild key={blog._id} blog={blog} />
        ))
      )}
      {error && <div className="text-red-500">{error.message}</div>}
    </main>
  );
}

/*
  


*/
