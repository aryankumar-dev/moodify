import Link from "next/link";
import Image from "next/image";

export default function PlaylistCard({ playlist }) {
  return (
    <Link
      href={`/playlist/${playlist.id}?name=${encodeURIComponent(playlist.name || "")}&image=${encodeURIComponent(playlist.image || "")}&description=${encodeURIComponent(playlist.description || "")}`}
    >
      <div className="group relative bg-[#161616] hover:bg-[#1e1e1e] border border-white/5 hover:border-white/15 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/60">

        {/* Cover image */}
        <div className="relative aspect-square w-full bg-[#1a1a1a] overflow-hidden">
          {playlist.image ? (
            <Image
              src={playlist.image}
              alt={playlist.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">🎵</div>
          )}
          {/* Play button overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl shadow-green-500/40">
              <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-semibold text-white truncate text-sm leading-snug group-hover:text-green-400 transition-colors">
            {playlist.name}
          </h3>
          {playlist.owner && (
            <p className="text-xs text-white/30 mt-1 truncate">{playlist.owner}</p>
          )}
          {playlist.description && (
            <p
              className="text-xs text-white/40 mt-1.5 line-clamp-2 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: playlist.description }}
            />
          )}
        </div>
      </div>
    </Link>
  );
}
