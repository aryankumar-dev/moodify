const express = require("express");
const router = express.Router();
const { saveMood, getMoodHistory } = require("../controllers/moodHistoryController");

router.post("/", saveMood);
router.get("/", getMoodHistory);

module.exports = router;
