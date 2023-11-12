import { multiFormatDateString } from "@/helpers/dateHelper";
import { useDeleteBookMarked } from "@/app/libs/services/blogsServices/useDeleteBookMarked";
import { BsTrash } from "react-icons/bs";
import Image from "next/image";
import React from "react";
import Spinners from "./Spinners";

export default function DisplayBookMarked({
  bookMarkedItem,
}: {
  bookMarkedItem: any;
}) {
  const { deleteBookMarkedById, error, isPending } = useDeleteBookMarked();
  const handleDeleteBookMarked = () => {
    const existingBookMarkedId = bookMarkedItem?.blog?._id;
    if (!existingBookMarkedId) return;
    deleteBookMarkedById(existingBookMarkedId);
  };
  if (!bookMarkedItem.blog) {
    return (
      <div>
        {" "}
        <Spinners />{" "}
      </div>
    );
  }

  return (
    <>
      <main className="w-full ">
        {isPending && (
          <div className="w-full flex items-center justify-center">
            <Spinners />
          </div>
        )}
        {error && <div className="text-red-500">{error.message}</div>}
        <div className="w-[20rem] bg-white rounded-lg shadow-md hover:scale-105 transition-all hover:shadow-lg p-3 relative group">
          <BsTrash
            className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 z-99999 cursor-pointer hover:font-bold hover:skew-x-1 transition-all text-purple-600 "
            role="button"
            onClick={handleDeleteBookMarked}
          />
          <div>
            <Image
              src={bookMarkedItem?.blog?.image}
              alt={bookMarkedItem?.blog?.title}
              width={400}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="mt-1 flex justify-between">
            <p>{bookMarkedItem?.blog?.category}</p>
            <p className="">{bookMarkedItem?.blog?.time}</p>
          </div>
          <h1 className="text-l text-center font-bold">
            {bookMarkedItem.blog.title.toUpperCase()}
          </h1>
          <p className="text-slate-400 mb-2">
            {bookMarkedItem?.blog?.subtitle}
          </p>
          <div className="flex justify-between items-center ">
            <div className="flex justify-between border border-slate-900 rounded-lg items-center p-1 gap-x-3">
              <Image
                src={bookMarkedItem?.user?.image}
                alt={bookMarkedItem?.user?.name}
                width={20}
                height={20}
                className="h-5 w-5 rounded-full object-cover"
              />
              <p>{bookMarkedItem?.user?.name}</p>
            </div>
            <p className="text-xs text-slate-300">
              bookmarked &#183;{" "}
              {multiFormatDateString(bookMarkedItem?.createdAt)}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
