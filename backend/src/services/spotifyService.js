const axios = require("axios");

const MOOD_QUERIES = {
  happy:    "happy upbeat pop feel good",
  sad:      "sad emotional melancholy heartbreak",
  energetic:"workout energetic pump up hits",
  chill:    "chill lofi relaxing calm",
  romantic: "romantic love songs date night",
  angry:    "angry rock metal intense",
  focused:  "focus study instrumental concentration",
  party:    "party dance hits club",
};

function rapidHeaders() {
  return {
    "x-rapidapi-host": process.env.RAPIDAPI_HOST,
    "x-rapidapi-key":  process.env.RAPIDAPI_KEY,
  };
}

const BASE = `https://${process.env.RAPIDAPI_HOST || "spotify23.p.rapidapi.com"}`;

const cache = new Map();
const CACHE_TTL = 10 * 60 * 1000;

function cacheGet(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) { cache.delete(key); return null; }
  return entry.data;
}
function cacheSet(key, data) {
  cache.set(key, { data, expiresAt: Date.now() + CACHE_TTL });
}

function checkRateLimit(data, endpoint) {
  if (data?.error?.status === 429) {
    throw new Error("RapidAPI rate limit exceeded. Please wait and try again.");
  }
  if (data?.message && !data.name && !data.id && !data.items) {
    throw new Error(`RapidAPI error on ${endpoint}: ${data.message}`);
  }
}

async function getPlaylistsByMood(mood) {
  const cached = cacheGet(`mood:${mood}`);
  if (cached) return cached;

  const response = await axios.get(`${BASE}/search/`, {
    headers: rapidHeaders(),
    params: { q: MOOD_QUERIES[mood] || mood, type: "multi", offset: 0, limit: 6, numberOfTopResults: 3 },
  });

  checkRateLimit(response.data, "search");

  const playlists = response.data?.playlists?.items || response.data?.albums?.items || [];

  const result = playlists.filter(Boolean).map((p) => {
    const data = p.data || p;
    const images = data.images?.items?.[0]?.sources || data.coverArt?.sources || [];
    return {
      id:          data.uri?.split(":").pop() || data.id || "",
      name:        data.name || "",
      description: data.description || "",
      image:       images[0]?.url || null,
      tracks:      data.tracks?.total || 0,
      spotifyUrl:  `https://open.spotify.com/playlist/${data.uri?.split(":").pop() || data.id}`,
      owner:       data.owner?.name || data.owner?.display_name || "",
    };
  });

  cacheSet(`mood:${mood}`, result);
  return result;
}

module.exports = { getPlaylistsByMood };
