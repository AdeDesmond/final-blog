"use client";

import Cookies from "js-cookie";
import { logoutUser, getUser } from "@/app/libs/action";
import { useAuthManager } from "@/app/auth/context/useAuthManager";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Image from "next/image";

export default function Header() {
  const pathName = usePathname();
  const { state, dispatch } = useAuthManager();
  const [userInfo, setUserInfo] = React.useState<{
    userData: {
      _id: string;
      name: string;
      email: string;
      isVerified: boolean;
      isAdmin: boolean;
      __v: number;
      image: string;
    };
  } | null>(null);
  const router = useRouter();
  const { user } = state;
  const handleLogout = async () => {
    Cookies.remove("user");
    dispatch({ type: "LOGOUT" });
    await logoutUser();
    router.push("/");
  };
  useEffect(function () {
    const token = Cookies.get("user");
    const fetchUsers = async () => {
      if (token) {
        const res = await getUser();
        setUserInfo(res);
      }
    };
    fetchUsers();
  }, []);
  const activeLink =
    "bg-slate-600 px-4 py-1 flex items-center justify-center rounded-lg transition-bg  hover:shadow-lg ";
  return (
    <>
      <header className=" h-24 text-white flex justify-between items-center px-6 border-b border-slate-100 mb-4">
        <h1>Header</h1>
        <ul className="flex gap-x-2  max-w-fit px-2 py-2 rounded-lg items-center">
          <Link href={"/"} className={` ${pathName === "/" ? activeLink : ""}`}>
            Home
          </Link>
          <Link
            href={`/profile/${userInfo?.userData._id}/bookmarks`}
            className={`${pathName.includes("profile") ? activeLink : ""}`}
          >
            Bookmarks
          </Link>
          <Link
            href={"/blogs"}
            className={`${pathName === "/blogs" ? activeLink : ""}`}
          >
            Blogs
          </Link>
          <Link
            href={"/about"}
            className={`${pathName === "/about" ? activeLink : ""}`}
          >
            About
          </Link>
          <Link
            href={"/contact"}
            className={`${pathName === "/contact" ? activeLink : ""}`}
          >
            Contact Us
          </Link>
          <Link
            href={"/category"}
            className={`${pathName === "/category" ? activeLink : ""}`}
          >
            Categories
          </Link>
        </ul>
        <div className="flex items-center gap-x-1 bg-slate-600 rounded-lg px-4 py-2">
          {!user && (
            <Link
              href={"/login"}
              className=" bg-slate-900  px-6 py-1 rounded-lg"
            >
              Login
            </Link>
          )}
          {!user && (
            <Link
              href={"/signup"}
              className=" border-2 border-slate-100 px-4 py-1 flex items-center justify-center rounded-lg"
            >
              Sign Up
            </Link>
          )}
          {user && (
            <div className="flex items-center justify-center gap-x-2">
              <Link href={`/profile/${userInfo?.userData._id}/bookmarks`}>
                {userInfo && (
                  <Image
                    src={userInfo.userData.image}
                    alt={userInfo.userData.name}
                    height={50}
                    width={50}
                    className="h-10 w-10 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110  object-cover "
                  />
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-1 rounded-lg bg-slate-900"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
