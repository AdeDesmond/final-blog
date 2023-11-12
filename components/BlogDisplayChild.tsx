"use client";
import Image from "next/image";
import { useDeleteBookMarked } from "@/app/libs/services/blogsServices/useDeleteBookMarked";
import { useGetBookMarkedBlogs } from "@/app/libs/services/blogsServices/useGetBookMarkedBlogs";
import { useBookMarkedBlog } from "@/app/libs/services/blogsServices/useBookMarkedBlog";
import { getUser } from "@/app/libs/action";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BsBookmarks, BsBookmarksFill } from "react-icons/bs";
import { changeTimeColors } from "@/helpers/colorsChange";
import { changeColors } from "@/helpers/colorsChange";

interface Props {
  userData: {
    _id: string;
  };
}

export default function BlogDisplayChild({ blog }: any) {
  const [user, setUser] = useState<any>();
  const {
    bookedMarkedBlog,
    error: bookMarkedError,
    isPending,
  } = useBookMarkedBlog();
  const {
    deleteBookMarkedById,
    isPending: isDeletingBookMarked,
    error: isDeletingError,
  } = useDeleteBookMarked();
  const { data, error, isLoading } = useGetBookMarkedBlogs(user?.userData?._id);
  const [addRemoveBookMark, setAddRemoveBookMark] = useState(false);

  const handleAddBookMarks = (blog: any) => {
    if (!user?.userData?._id && !blog?._id) return;
    const existingBookMarkedId = data?.bookMarkedData
      ?.map((bookMarkedItem: any) => bookMarkedItem?.blog?._id)
      .find((id: any) => id === blog._id);
    if (existingBookMarkedId) {
      setAddRemoveBookMark(false);
      deleteBookMarkedById(existingBookMarkedId);
    } else {
      bookedMarkedBlog({
        blogId: blog._id,
        userId: user?.userData?._id,
      });
      setAddRemoveBookMark(true);
    }
  };

  useEffect(function () {
    const token = Cookies.get("user");
    const fetchUser = async () => {
      if (token) {
        const res = await getUser();
        setUser(res);
      }
    };
    fetchUser();
  }, []);
  return (
    <div
      key={blog._id}
      className="w-[20rem] px-4 bg-white py-4 rounded-lg hover:scale-105 shadow-md hover:shadow-lg transition-all mt-6 relative group"
    >
      {isDeletingError && <div>{isDeletingError.message}</div>}
      <div className="absolute top-0 right-0">
        <button
          onClick={() => handleAddBookMarks(blog)}
          className="opacity-0 group-hover:opacity-100"
        >
          {addRemoveBookMark ? (
            <BsBookmarksFill className="hover:font-bold transition-all" />
          ) : (
            <BsBookmarks />
          )}
        </button>
      </div>
      <div className="flex flex-col items-center">
        <Image
          src={blog.image}
          alt="blog image"
          height={500}
          width={500}
          className="rounded-lg object-cover w-full "
        />
        <div
          className={`flex w-full justify-between mt-2 ${changeColors(blog)}`}
        >
          <p className="font-semibold">{blog.category.category}</p>
          <p className={`${changeTimeColors(blog)}`}>
            {blog.time}mins &#183; <span className="text-black">Read</span>{" "}
          </p>
        </div>
        <div className="w-full mb-2">
          <h1 className="text-center text-l font-semibold">
            {blog.title.toUpperCase()}
          </h1>
          <p className="text-center">{blog.subtitle}</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-x-2 border-2 border-slate-700 rounded-lg justify-between px-2 ">
            <Image
              src={blog.author.image}
              alt={blog.author.name}
              width={15}
              height={15}
              className="rounded-full h-8 w-8 object-cover border-2 border-slate-50"
            />
            <p className="text-xl text-slate-400">{blog.author.name}</p>
          </div>
          <p className="truncate">
            {new Date(blog.createdAt).toLocaleString().split(",")[0]}
          </p>
        </div>
      </div>
    </div>
  );
}
