"use client";
import { getUser } from "../libs/action";
import Link from "next/link";
import React from "react";

export default function ProfilePage() {
  const [data, setData] = React.useState("");
  const getUserDetails = async () => {
    const res = await getUser();
    setData(res.userData._id);
  };
  return (
    <main className="w-full min-h-screen">
      <h1 className="text-center font-bold text-xl border-b-2 border-slate-900 ">
        Profile
      </h1>
      <div className="bg-slate-500 shadow-md w-[40rem] h-[20rem] mx-auto">
        <div className="flex gap-x-2 items-center justify-center mt-4">
          <Link
            href={`/profile/${data}`}
            className="border-2 border-white px-3 py-1 rounded-lg hover:border-slate-900 hover:font-extrabold transition-all hover:text-white mt-6"
          >
            <p>Go to profile</p>
          </Link>
          <button
            className="bg-slate-900 text-white shadow-sm rounded-lg px-3 py-1 hover:bg-slate-700 hover:font-extrabold focus:ring focus:ring-slate-400 focus:ring-offset-1 transition-all mt-6"
            onClick={getUserDetails}
          >
            Get User Details
          </button>
        </div>
      </div>
    </main>
  );
}
