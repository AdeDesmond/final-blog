import { multiFormatDateString } from "@/helpers/dateHelper";
import Image from "next/image";
import React from "react";
export default function DisplayComments({ comment }: any) {
  return (
    <main>
      <div className="flex items-center justify-between w-[30rem]">
        <div className="flex items-center gap-x-1">
          <div className="flex items-center gap-x-1">
            <Image
              src={comment.user.image}
              alt={comment.user.name}
              height={20}
              width={20}
              className="h-5 w-5 rounded-full object-cover"
            />
            <p className="text-xs font-semibold ">{comment.user.name}</p>
          </div>
          <p className="mt-8 text-slate-300">{comment.comment}</p>
        </div>
        <p className="text-xs text-slate-400">
          {multiFormatDateString(comment.createdAt)}
        </p>
      </div>
    </main>
  );
}
