"use client";

import React from "react";
import { signUpNewUser } from "../libs/action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPassowrdConfirm] = React.useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { name, email, password };
    await signUpNewUser(data);
    setName("");
    setEmail("");
    setPassword("");
    setPassowrdConfirm("");
    router.push("/login");
  };

  return (
    <main className="flex gap-x-2 justify-center">
      <div>
        <p className="text-center mt-4 mb-4">
          Privilegdes are granted to community member{" "}
        </p>
        <div>
          <Image
            src="/signup.svg"
            width={500}
            height={500}
            alt="welcome to the blog community"
          />
        </div>
      </div>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-1 justify-center mb-10"
      >
        <h2 className="mb-4 text-xl font-bold text-center mt-4">
          Welcome to the blogs community
        </h2>
        <label htmlFor="name">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          className="w-[35rem] h-8 rounded-lg outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:ring-offset-slate-100 placeholder:text-sm shadow-sm"
        />
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
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          className="w-[35rem] h-8 rounded-lg outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:ring-offset-slate-100 placeholder:text-sm shadow-sm"
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          value={passwordConfirm}
          onChange={(e) => setPassowrdConfirm(e.target.value)}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm your password"
          className="w-[35rem] h-8 rounded-lg outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:ring-offset-slate-100 placeholder:text-sm mb-2 shadow-sm"
        />
        <button
          className="bg-slate-500 px-10 py-2 self-center rounded-lg text-white shadow-md hover:bg-slate-600 hover:shadow-lg transition-all focus:shadow-sm focus:outline-none hover:font-extrabold"
          type="submit"
        >
          Sign Up
        </button>
        <p className="text-center mt-3 text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-slate-500">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}
