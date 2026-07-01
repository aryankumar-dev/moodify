"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import ProtectedRoute from "../../../components/ProtectedRoute";

function PlaylistContent() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "Playlist";
  const image = searchParams.get("image") || null;
  const description = searchParams.get("description") || "";

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <div className="max-w-3xl mx-auto px-6 py-10">

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to playlists
        </button>

        {/* Playlist header */}
        <div className="flex flex-col sm:flex-row gap-6 mb-8 items-start">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-40 h-40 rounded-xl object-cover shadow-2xl shadow-black/60 flex-shrink-0"
            />
          ) : (
            <div className="w-40 h-40 rounded-xl bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
              <span className="text-5xl">🎵</span>
            </div>
          )}
          <div className="flex flex-col justify-center gap-2">
            <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">Playlist</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">{name}</h1>
            {description && (
              <p
                className="text-white/50 text-sm max-w-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
            <a
              href={`https://open.spotify.com/playlist/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-1 text-[#1DB954] hover:text-[#1ed760] text-sm font-medium transition-colors w-fit"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Open in Spotify
            </a>
          </div>
        </div>

        {/* Spotify embed player — free previews, no API quota */}
        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
          <iframe
            src={`https://open.spotify.com/embed/playlist/${id}?utm_source=generator&theme=0`}
            width="100%"
            height="500"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ borderRadius: "16px" }}
          />
        </div>

        <p className="text-center text-white/20 text-xs mt-4">
          Free users get 30-second previews · Spotify Premium for full songs
        </p>

      </div>
    </div>
  );
}

export default function PlaylistPage() {
  return (
    <ProtectedRoute>
      <PlaylistContent />
    </ProtectedRoute>
  );
}
