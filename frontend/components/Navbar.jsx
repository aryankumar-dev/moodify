"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

function Avatar({ user }) {
  if (user.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.name}
        className="w-9 h-9 rounded-full object-cover border-2 border-white/20"
      />
    );
  }
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-sm font-bold text-white border-2 border-white/20 shrink-0">
      {initials}
    </div>
  );
}

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0d0d0d]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🎵</span>
          <span
            className="text-xl font-extrabold tracking-tight"
            style={{
              background: "linear-gradient(135deg, #1db954 0%, #1ed760 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Moodify
          </span>
        </Link>

        {!loading && (
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link
                  href="/history"
                  className="hidden sm:flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  History
                </Link>
                <Avatar user={user} />
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-white leading-none">{user.name}</p>
                  <p className="text-xs text-white/40 mt-0.5 truncate max-w-[140px]">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-1 text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/30 rounded-lg px-3 py-1.5 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm text-white/70 hover:text-white border border-white/10 hover:border-white/30 rounded-lg px-4 py-1.5 transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-semibold text-black bg-green-400 hover:bg-green-300 rounded-lg px-4 py-1.5 transition-all"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
