const { getPlaylistsByMood } = require("../services/spotifyService");

async function recommendations(req, res) {
  const { mood } = req.query;
  if (!mood) return res.status(400).json({ error: "mood query param is required" });
  try {
    const playlists = await getPlaylistsByMood(mood);
    res.json({ mood, playlists });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch recommendations", details: err.message });
  }
}

module.exports = { recommendations };
