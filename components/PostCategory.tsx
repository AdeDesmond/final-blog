"use client";

import React from "react";
import DisplayCategory from "./DisplayCategory";
import { useCreateCategory } from "@/app/libs/services/categoryServices/useCreatCategory";

export default function PostCategory() {
  const {
    mutate: createCategory,
    isPending,
    error: categoryError,
  } = useCreateCategory();
  const [category, setCategory] = React.useState("");
  const handleSubmitCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { category };
    createCategory(data);
    setCategory("");
  };
  return (
    <main className=" w-full">
      <form
        action=""
        className="flex items-center justify-center flex-col mt-4"
        onSubmit={handleSubmitCategory}
      >
        <label htmlFor="category" className="mb-2">
          Category
        </label>
        <div className="flex items-center gap-x-2 justify-center mb-3">
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            name="category"
            id="category"
            placeholder="Enter your category"
            className="w-[35rem] h-8 rounded-lg outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:ring-offset-slate-100 placeholder:text-sm  shadow-sm"
          />
          <button
            className="bg-slate-500 px-10 py-1 self-center rounded-lg text-white shadow-md hover:bg-slate-600 hover:shadow-lg transition-all focus:shadow-sm focus:outline-none hover:font-extrabold"
            type="submit"
          >
            Submit
          </button>
        </div>
        {isPending && <div className="text-white">Loading...</div>}
      </form>
    </main>
  );
}
