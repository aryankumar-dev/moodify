"use client";

import { useState } from "react";
import MoodSelector from "../components/MoodSelector";
import PlaylistGrid from "../components/PlaylistGrid";
import ProtectedRoute from "../components/ProtectedRoute";
import { getRecommendations, saveMoodHistory } from "../lib/api";
import { useAuth } from "../context/AuthContext";

function HomeContent() {
  const { user } = useAuth();
  const [selectedMood, setSelectedMood] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleMoodSelect(mood) {
    setSelectedMood(mood);
    setError(null);
    setLoading(true);
    setPlaylists([]);
    try {
      const data = await getRecommendations(mood);
      const playlists = data.playlists || [];
      setPlaylists(playlists);
      saveMoodHistory(mood, playlists[0]?.id || "", playlists[0]?.name || "");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-white/50 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Hey {firstName}, what's your vibe today?
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4">
            Music for{" "}
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              every mood
            </span>
          </h1>
          <p className="text-white/40 text-lg max-w-md mx-auto">
            Pick how you feel and get Spotify playlists tailored to your moment.
          </p>
        </div>
      </section>

      {/* Mood Selector */}
      <section className="max-w-4xl mx-auto px-6 pb-12">
        <MoodSelector activeMood={selectedMood} onSelect={handleMoodSelect} loading={loading} />
      </section>

      {/* Results */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-green-500/20 border-t-green-400 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-2xl">🎵</div>
            </div>
            <p className="text-white/40 text-base">Finding the perfect playlists…</p>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-16">
            <div className="bg-red-900/20 border border-red-500/30 text-red-300 rounded-2xl px-8 py-6 max-w-sm text-center">
              <div className="text-3xl mb-3">😕</div>
              <p className="font-semibold mb-1">Something went wrong</p>
              <p className="text-sm opacity-70">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && playlists.length === 0 && !selectedMood && (
          <div className="text-center py-16 text-white/20 text-sm">
            ↑ Choose a mood to get started
          </div>
        )}

        {!loading && !error && playlists.length > 0 && (
          <PlaylistGrid playlists={playlists} mood={selectedMood} />
        )}
      </section>
    </div>
  );
}

export default function HomePage() {
  return (
    <ProtectedRoute>
      <HomeContent />
    </ProtectedRoute>
  );
}
