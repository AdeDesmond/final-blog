"use client";
import { useGetQuery } from "@/app/libs/services/blogsServices/useGetBlogs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Spinners from "./Spinners";

export default function DisplayBlogsItems() {
  const { blogsData, error, isLoading } = useGetQuery();
  return (
    <main className="w-full bg-white">
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinners />
        </div>
      )}
      {error && <div>{error.message}</div>}
      {blogsData && (
        <div className="w-[80%] grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-6 mx-auto place-items-center">
          {blogsData.blogsData.slice(4).map((blog: any) => (
            <div key={blog._id} className="">
              <div className="max-w-[20rem]">
                <Link href={`/blogs/content/${blog._id}`}>
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={300}
                    height={90}
                    className=" cursor-pointer rounded-lg hover:scale-105 transition duration-300 ease-in-out object-cover mb-1"
                  />
                </Link>
                <p className="text-sm text-slate-400">
                  {new Date(blog.createdAt).toLocaleString()}
                </p>
                <h2 className="text-xl font-semibold truncate">{blog.title}</h2>
                <p className="text-slate-400 w-full">{blog.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
