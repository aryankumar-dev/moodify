const MoodHistory = require("../models/MoodHistory");

async function saveMood(req, res) {
  const { mood, playlistId, playlistName } = req.body;
  if (!mood) return res.status(400).json({ error: "mood is required" });
  try {
    const entry = await MoodHistory.create({ userId: req.user.id, mood, playlistId, playlistName });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: "Failed to save mood", details: err.message });
  }
}

async function getMoodHistory(req, res) {
  try {
    const history = await MoodHistory.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(20);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch mood history", details: err.message });
  }
}

module.exports = { saveMood, getMoodHistory };
