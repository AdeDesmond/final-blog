"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { resetPassword } from "../libs/action";

export default function ResetPassWordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter();
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || " ");
  }, []);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword)
      return alert("Password and Confirm Password must be the same");
    const data = { password, token };
    try {
      await resetPassword(data);
      alert("Password reset successfully");
      setPassword("");
      setConfirmPassword("");
      router.push("/login");
    } catch (err: any) {
      setError(true);
      console.log(err.message);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <form
        action=""
        className="flex flex-col items-center justify-center "
        onSubmit={handleResetPassword}
      >
        <h2 className="mt-4 mb-2 text-xl font-semibold border-b-2 border-slate-600">
          Reset Your Password
        </h2>
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
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm your password"
          className="w-[35rem] h-8 rounded-lg outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:ring-offset-slate-100 placeholder:text-sm shadow-sm"
        />
        <button
          className="bg-slate-500 px-10 py-2 self-center rounded-lg text-white shadow-md hover:bg-slate-600 hover:shadow-lg transition-all focus:shadow-sm focus:outline-none hover:font-extrabold mt-2"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
