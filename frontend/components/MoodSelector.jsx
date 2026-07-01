"use client";

const MOODS = [
  { key: "happy",    label: "Happy",    emoji: "😊", gradient: "from-yellow-400 to-orange-400",      glow: "shadow-yellow-500/30" },
  { key: "sad",      label: "Sad",      emoji: "😢", gradient: "from-blue-500 to-indigo-600",        glow: "shadow-blue-500/30" },
  { key: "energetic",label: "Energetic",emoji: "⚡", gradient: "from-red-500 to-orange-500",         glow: "shadow-red-500/30" },
  { key: "chill",    label: "Chill",    emoji: "🌊", gradient: "from-teal-400 to-cyan-500",          glow: "shadow-cyan-500/30" },
  { key: "romantic", label: "Romantic", emoji: "💕", gradient: "from-pink-500 to-rose-500",          glow: "shadow-pink-500/30" },
  { key: "angry",    label: "Angry",    emoji: "🔥", gradient: "from-red-700 to-gray-800",           glow: "shadow-red-700/30" },
  { key: "focused",  label: "Focused",  emoji: "🎯", gradient: "from-purple-500 to-violet-600",      glow: "shadow-purple-500/30" },
  { key: "party",    label: "Party",    emoji: "🎉", gradient: "from-fuchsia-500 via-pink-500 to-yellow-400", glow: "shadow-fuchsia-500/30" },
];

export default function MoodSelector({ activeMood, onSelect, loading }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {MOODS.map((mood) => {
        const isActive = activeMood === mood.key;
        const isLoadingThis = isActive && loading;

        return (
          <button
            key={mood.key}
            onClick={() => onSelect(mood.key)}
            disabled={loading}
            className={`
              relative group rounded-2xl p-5 flex flex-col items-center gap-2.5 cursor-pointer
              bg-gradient-to-br ${mood.gradient}
              transition-all duration-200 select-none
              hover:scale-[1.04] active:scale-[0.97]
              ${isActive
                ? `scale-[1.04] ring-2 ring-white/60 shadow-xl ${mood.glow}`
                : "opacity-80 hover:opacity-100"}
              ${loading && !isActive ? "opacity-40 cursor-not-allowed" : ""}
            `}
          >
            {/* Shine overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />

            <span className="text-3xl relative z-10 transition-transform duration-200 group-hover:scale-110">
              {mood.emoji}
            </span>
            <span className="text-white font-semibold text-sm relative z-10 tracking-wide">
              {mood.label}
            </span>

            {isLoadingThis && (
              <div className="absolute inset-0 rounded-2xl bg-black/30 flex items-center justify-center z-20">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
