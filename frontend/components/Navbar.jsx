"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    setMenuOpen(false);
    logout();
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0d0d0d]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
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
          <>
            {/* Desktop nav */}
            <div className="hidden sm:flex items-center gap-3">
              {user ? (
                <>
                  <Link
                    href="/history"
                    className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    History
                  </Link>
                  <Avatar user={user} />
                  <div>
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

            {/* Mobile: avatar + hamburger */}
            <div className="flex sm:hidden items-center gap-3">
              {user && <Avatar user={user} />}
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Toggle menu"
                className="text-white/70 hover:text-white p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Mobile menu drawer */}
      {!loading && menuOpen && (
        <div className="sm:hidden border-t border-white/10 bg-[#0d0d0d]/95 px-4 py-4 flex flex-col gap-3">
          {user ? (
            <>
              <div className="pb-2 border-b border-white/10">
                <p className="text-sm font-semibold text-white leading-none">{user.name}</p>
                <p className="text-xs text-white/40 mt-1 truncate">{user.email}</p>
              </div>
              <Link
                href="/history"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                History
              </Link>
              <button
                onClick={handleLogout}
                className="text-left text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/30 rounded-lg px-3 py-2 transition-all w-fit"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-white/70 hover:text-white border border-white/10 hover:border-white/30 rounded-lg px-4 py-2 transition-all text-center"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-semibold text-black bg-green-400 hover:bg-green-300 rounded-lg px-4 py-2 transition-all text-center"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
