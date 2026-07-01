const mongoose = require("mongoose");

const moodHistorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mood: { type: String, required: true, trim: true },
    playlistId: { type: String, default: "" },
    playlistName: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MoodHistory", moodHistorySchema);
