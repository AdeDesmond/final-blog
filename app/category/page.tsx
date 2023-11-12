"use client";
import PostCategory from "@/components/PostCategory";
import React from "react";
import { useGetCategories } from "@/app/libs/services/categoryServices/useGetCategories";
import DisplayCategory from "@/components/DisplayCategory";
import { CategoriesSkeleton } from "@/components/Skeleton";
export default function CategoryPage() {
  const { data, error, isLoading } = useGetCategories();
  console.log(data);
  return (
    <main className="w-full min-h-screen">
      <PostCategory />
      {isLoading && <CategoriesSkeleton />}
      {error && <div className="text-white">Error...</div>}
      {data &&
        data.categories?.map((cat: any) => (
          <DisplayCategory key={cat._id} catData={cat} />
        ))}
    </main>
  );
}
