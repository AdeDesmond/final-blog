"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  console.log(token);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || " ");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      const verifyUserEmail = async () => {
        try {
          await axios.post("/api/users/verifyemail", { token });
          setVerified(true);
        } catch (err: any) {
          setError(true);
          console.log(err.message);
        }
      };
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center bg-slate-400 text-white shadow-sm px-4 py-2">
        <h1 className="text-4xl">Verify your email</h1>
        <h2>{token ? `${token}` : "no token"}</h2>
        {verified && (
          <div>
            <Link
              href="/login"
              className="font-semibold px-4 py-1 bg-slate-900 shadow-sm text-white hover:bg-slate-700 hover:font-extrabold focus:ring focus:ring-offset-1 focus:ring-slate-950 "
            >
              Login
            </Link>
          </div>
        )}

        {error && <div>{error}</div>}
      </div>
    </div>
  );
}
