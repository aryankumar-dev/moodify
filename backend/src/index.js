require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const spotifyRoutes = require("./routes/spotify");
const authRoutes = require("./routes/auth");
const moodHistoryRoutes = require("./routes/moodHistory");
const authMiddleware = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://127.0.0.1:3000"] }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/spotify", authMiddleware, spotifyRoutes);
app.use("/api/mood-history", authMiddleware, moodHistoryRoutes);

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error", details: err.message });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Moodify backend running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
