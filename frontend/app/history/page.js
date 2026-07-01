"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "../../components/ProtectedRoute";
import { getMoodHistory } from "../../lib/api";

const MOOD_META = {
  happy:    { emoji: "😊", gradient: "from-yellow-400 to-orange-400" },
  sad:      { emoji: "😢", gradient: "from-blue-500 to-indigo-600" },
  energetic:{ emoji: "⚡", gradient: "from-red-500 to-orange-500" },
  chill:    { emoji: "🌊", gradient: "from-teal-400 to-cyan-500" },
  romantic: { emoji: "💕", gradient: "from-pink-500 to-rose-500" },
  angry:    { emoji: "🔥", gradient: "from-red-700 to-gray-900" },
  focused:  { emoji: "🎯", gradient: "from-purple-500 to-violet-600" },
  party:    { emoji: "🎉", gradient: "from-fuchsia-500 to-pink-500" },
};

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

function HistoryContent() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMoodHistory()
      .then(setHistory)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <Link href="/" className="text-white/40 hover:text-white text-sm transition-colors">← Back to home</Link>
          <h1 className="text-3xl font-extrabold mt-4">Your Mood History</h1>
          <p className="text-white/40 text-sm mt-1">The last 20 moods you've explored</p>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <svg className="animate-spin h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          </div>
        )}

        {error && (
          <div className="bg-red-900/30 border border-red-500/30 text-red-300 rounded-xl px-5 py-4 text-sm">
            {error}
          </div>
        )}

        {!loading && !error && history.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🎵</div>
            <p className="text-white/40">No mood history yet. Pick a mood on the home page!</p>
            <Link href="/" className="inline-block mt-4 bg-green-500 hover:bg-green-400 text-black font-semibold rounded-xl px-6 py-2.5 transition-all">
              Explore Moods
            </Link>
          </div>
        )}

        {!loading && !error && history.length > 0 && (
          <div className="space-y-3">
            {history.map((entry) => {
              const meta = MOOD_META[entry.mood] || { emoji: "🎵", gradient: "from-gray-500 to-gray-700" };
              return (
                <div
                  key={entry._id}
                  className="flex items-center gap-4 bg-white/5 hover:bg-white/8 border border-white/10 rounded-2xl px-5 py-4 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center text-2xl shrink-0`}>
                    {meta.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white capitalize">{entry.mood}</p>
                    {entry.playlistName && (
                      <p className="text-sm text-white/40 truncate mt-0.5">
                        {entry.playlistId ? (
                          <Link
                            href={`/playlist/${entry.playlistId}?name=${encodeURIComponent(entry.playlistName)}`}
                            className="hover:text-green-400 transition-colors"
                          >
                            {entry.playlistName}
                          </Link>
                        ) : entry.playlistName}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-white/30 shrink-0">{timeAgo(entry.createdAt)}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function HistoryPage() {
  return (
    <ProtectedRoute>
      <HistoryContent />
    </ProtectedRoute>
  );
}
