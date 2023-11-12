"use client";
import { useState } from "react";
import { forgotPassword } from "../libs/action";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { email };
    await forgotPassword(data);
    setEmail("");
  };
  return (
    <main className="w-full min-h-screen">
      <form
        action=""
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl mb-2 mt-4 font-semibold border-b-2 border-slate-600">
          Enter your email
        </h1>
        <label htmlFor="email" className="mb-1">
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="email"
          id="email"
          placeholder="Enter your email"
          className="w-[35rem] h-8 rounded-lg outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:ring-offset-slate-100 placeholder:text-sm shadow-sm"
        />
        <button
          className="bg-slate-500 px-10 py-2 self-center rounded-lg text-white shadow-md hover:bg-slate-600 hover:shadow-lg transition-all focus:shadow-sm focus:outline-none hover:font-extrabold mt-2"
          type="submit"
        >
          Send
        </button>
      </form>
    </main>
  );
}
