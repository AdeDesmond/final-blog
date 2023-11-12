"use client";
import { useGetQuery } from "@/app/libs/services/blogsServices/useGetBlogs";
import Image from "next/image";
import Link from "next/link";
import Spinners from "./Spinners";

export default function HighLightBlog() {
  const { blogsData, error, isLoading } = useGetQuery();
  return (
    <main className="w-full bg-slate-950 ">
      {isLoading && (
        <div className="w-full min-h-screen flex items-center justify-center">
          <Spinners />
        </div>
      )}
      {error && <div>{error.message}</div>}
      <h1 className="text-white text-center font-bold text-[10rem] ">
        THE BLOG
      </h1>
      <div className="">
        <div className=" flex ">
          {blogsData?.blogsData?.slice(0, 1).map((blog: any) => (
            <>
              <section
                key={blog._id}
                className="flex gap-y-2  justify-center p-4 mx-auto gap-x-6"
              >
                <div className=" w-[30rem] h-[20rem]">
                  <div className=" w-[30rem] h-[20rem] mb-2">
                    <Link href={`/blogs/content/${blog._id}`}>
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        width={900}
                        height={500}
                        className="rounded-lg hover:scale-105 transition duration-300 ease-in-out object-fill"
                      />
                    </Link>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-slate-400 text-xs">
                      {blog.category.category}
                    </p>
                    <p className="text-slate-400 text-xs">
                      {blog.time}mins Read
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">
                      {new Date(blog.createdAt).toLocaleString()}
                    </p>
                    <h1 className="text-l font-bold text-white">
                      {blog.title}
                    </h1>
                    <p className="text-sm text-slate-400">{blog.subtitle}</p>
                  </div>
                </div>
                <div className="">
                  {blogsData?.blogsData?.slice(1, 4).map((blog: any) => (
                    <div key={blog._id}>
                      <div className="flex gap-x-2 items-center mb-4">
                        <Link href={`/blogs/content/${blog._id}`}>
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            width={200}
                            height={200}
                            className=" rounded-lg hover:scale-105 transition duration-300 ease-in-out"
                          />
                        </Link>
                        <div>
                          <p className="text-slate-400 text-xs ">
                            {new Date(blog.createdAt).toLocaleString()}
                          </p>
                          <Link href={`/blogs/content/${blog._id}`}>
                            <p className="text-sm font-bold text-white w-[20rem]">
                              {blog.title}
                            </p>
                          </Link>
                          <p className="w-[20rem] text-slate-400 text-l truncate">
                            {blog.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          ))}
        </div>
      </div>
      <div></div>
    </main>
  );
}
