"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    //optionally log the error to an error reporting service
    console.log(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center w-full">
      <h2 className="text-center"> Something went wrong! </h2>
      <button
        onClick={() => reset()}
        className="mt-4 rounded-md bg-blue-500 px-4 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Try again
      </button>
    </main>
  );
}
