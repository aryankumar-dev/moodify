"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { loginWithToken } = useAuth();

  const [status, setStatus] = useState("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setErrorMsg("No verification token found in the link.");
      setStatus("error");
      return;
    }

    fetch(`${API_URL}/api/auth/verify-email?token=${token}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Verification failed");
        return data;
      })
      .then((data) => {
        loginWithToken(data.token, data.user);
        setStatus("success");
        setTimeout(() => router.push("/"), 3000);
      })
      .catch((err) => {
        setErrorMsg(err.message);
        setStatus("error");
      });
  }, [searchParams, router, loginWithToken]);

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">

        {status === "loading" && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-10">
            <div className="flex justify-center mb-6">
              <svg className="animate-spin h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white">
              Verifying your email…
            </h2>
            <p className="text-white/40 text-sm mt-2">
              Please wait a moment.
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-10">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Email Verified!
            </h2>
            <p className="text-green-300/80 text-sm mb-6">
              Your account is now active. Redirecting you to the home page…
            </p>
            <Link
              href="/"
              className="inline-block bg-green-500 hover:bg-green-400 text-black font-semibold rounded-xl px-6 py-3 transition-all"
            >
              Go to Home
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-10">
            <div className="text-5xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Verification Failed
            </h2>
            <p className="text-red-300/80 text-sm mb-6">{errorMsg}</p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/register"
                className="inline-block bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl px-6 py-3 transition-all"
              >
                Back to Register
              </Link>

              <Link
                href="/login"
                className="inline-block bg-green-500 hover:bg-green-400 text-black font-semibold rounded-xl px-6 py-3 transition-all"
              >
                Go to Login
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}