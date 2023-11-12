"use client";
import Cookies from "js-cookie";
import { loginUser } from "../libs/action";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { useAuthManager } from "../auth/context/useAuthManager";

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { dispatch } = useAuthManager();
  const router = useRouter();
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { email, password };
    const userData = await loginUser(data);
    Cookies.set("user", userData.userToken);
    dispatch({ type: "LOGIN", payload: userData.userToken });
    setEmail("");
    setPassword("");
    router.push("/");
  };
  return (
    <main className="flex gap-x-2 justify-center">
      <div>
        <p className="text-center mt-4 mb-4">
          Privilegdes are granted to community member{" "}
        </p>
        <div>
          <Image
            src="/login.svg"
            width={500}
            height={500}
            alt="welcome to the blog community"
          />
        </div>
      </div>
      <form
        onSubmit={handleLogin}
        action=""
        className="flex flex-col gap-y-1 justify-center mb-[10rem]"
      >
        <h2 className="text-xl font-bold text-center mb-2">
          Welcome to Blogs Community
        </h2>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="email"
          id="email"
          placeholder="Enter your email"
          className="w-[35rem] h-8 rounded-lg outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:ring-offset-slate-100 placeholder:text-sm shadow-sm"
        />
        <label htmlFor="password">Password</label>
        <div className="relative max-w-fit">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Enter your password"
            className="w-[35rem] h-8 rounded-lg outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:ring-offset-slate-100 placeholder:text-sm shadow-sm"
          />
          <button
            type="button"
            onClick={handleShowPassword}
            className="absolute top-2 right-2"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        <button className="bg-slate-500 px-10 py-2 self-center rounded-lg text-white shadow-md hover:bg-slate-600 hover:shadow-lg transition-all focus:shadow-sm focus:outline-none hover:font-extrabold mt-2">
          Login
        </button>
        <p className="text-center text-slate-400">
          Dont have an account?{" "}
          <Link href="/signup" className="text-slate-500">
            Sign up
          </Link>
        </p>
        <p className="text-center flex items-center gap-x-1 justify-center">
          <Link href="/forgotpassword" className="text-slate-500 text-xs ">
            Forgot password?
          </Link>
        </p>
      </form>
    </main>
  );
}
