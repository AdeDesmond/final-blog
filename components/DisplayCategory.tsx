"use client";

import { useDeleteCategory } from "@/app/libs/services/categoryServices/useDeleteCategory";
import React from "react";
import { BsTrash } from "react-icons/bs";

interface CatProps {
  _id: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export default function DisplayCategory({ catData }: { catData: CatProps }) {
  const { deleteCat, error, isPending } = useDeleteCategory();
  const handleDelete = () => {
    deleteCat(catData._id);
  };
  return (
    <div className="flex justify-center ">
      <div className="flex items-center justify-between w-[48%] border border-purple-600 mb-2 px-3 py-2 rounded-lg">
        <p className="font-semibold">{catData.category}</p>
        <button
          onClick={handleDelete}
          className="hover:scale-110 font-bold transition-all hover:text-pink-500"
        >
          {isPending ? "deleting..." : <BsTrash className="text-red-500" />}
        </button>
      </div>
    </div>
  );
}
