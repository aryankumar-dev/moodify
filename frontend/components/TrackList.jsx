import Image from "next/image";

function formatDuration(ms) {
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function TrackList({ tracks }) {
  if (!tracks || tracks.length === 0) {
    return <p className="text-white/40 text-center py-8">No tracks found.</p>;
  }

  return (
    <div className="space-y-1">
      {tracks.map((track, index) => (
        <a
          key={track.id || index}
          href={track.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors group"
        >
          <span className="w-6 text-right text-sm text-white/40 shrink-0">{index + 1}</span>
          <div className="relative w-10 h-10 shrink-0 rounded overflow-hidden bg-white/10">
            {track.albumArt ? (
              <Image
                src={track.albumArt}
                alt={track.album}
                fill
                className="object-cover"
                sizes="40px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-lg">🎵</div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium truncate group-hover:text-green-400 transition-colors">
              {track.name}
            </p>
            <p className="text-sm text-white/50 truncate">{track.artists}</p>
          </div>
          <span className="text-sm text-white/40 shrink-0">{formatDuration(track.duration)}</span>
        </a>
      ))}
    </div>
  );
}
