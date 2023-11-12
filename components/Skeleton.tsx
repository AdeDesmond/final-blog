export function CategorySkeleton() {
  const shimmer =
    "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm mt-6 w-[50%] mx-auto h-8`}
    >
      <div className="h-full w-full rounded-md bg-gray-200 flex items-center"></div>
    </div>
  );
}

export function CategoriesSkeleton() {
  return (
    <div className="flex flex-col w-full">
      <CategorySkeleton />
      <CategorySkeleton />
      <CategorySkeleton />
      <CategorySkeleton />
      <CategorySkeleton />
      <CategorySkeleton />
      <CategorySkeleton />
      <CategorySkeleton />
    </div>
  );
}
