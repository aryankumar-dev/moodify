const express = require("express");
const router = express.Router();
const { recommendations } = require("../controllers/spotifyController");

router.get("/recommendations", recommendations);

module.exports = router;
