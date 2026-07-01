const express = require("express");
const router = express.Router();
const { register, verifyEmail, resendVerification, login, me } = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");

router.post("/register", register);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerification);
router.post("/login", login);
router.get("/me", authMiddleware, me);

module.exports = router;
