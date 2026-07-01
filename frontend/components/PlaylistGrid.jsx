import PlaylistCard from "./PlaylistCard";

const MOOD_EMOJI = {
  happy: "😊", sad: "😢", energetic: "⚡", chill: "🌊",
  romantic: "💕", angry: "🔥", focused: "🎯", party: "🎉",
};

export default function PlaylistGrid({ playlists, mood }) {
  if (!playlists || playlists.length === 0) return null;

  const moodLabel = mood.charAt(0).toUpperCase() + mood.slice(1);

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{MOOD_EMOJI[mood] || "🎵"}</span>
        <div>
          <h2 className="text-xl font-bold text-white">{moodLabel} Playlists</h2>
          <p className="text-white/30 text-sm">{playlists.length} playlists found for you</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </section>
  );
}
