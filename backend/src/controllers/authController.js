const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendVerificationEmail } = require("../services/emailService");

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function generateVerificationToken() {
  return crypto.randomBytes(32).toString("hex");
}

async function register(req, res) {
  const { name, email, password, avatar } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email and password are required" });
  }
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ error: "Email already registered" });
  }

  const verificationToken = generateVerificationToken();
  const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

  const user = await User.create({
    name,
    email,
    password,
    avatar: avatar || "",
    verificationToken,
    verificationTokenExpiry,
  });

  try {
    await sendVerificationEmail(name, email, verificationToken);
  } catch (err) {
    console.error("Failed to send verification email:", err.message);
    return res.status(500).json({ error: "Account created but failed to send verification email. Check server email config." });
  }

  res.status(201).json({
    message: "Registration successful. Please check your email to verify your account.",
  });
}

async function verifyEmail(req, res) {
  const { token } = req.query;
  if (!token) {
    return res.status(400).json({ error: "Verification token is required" });
  }

  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpiry: { $gt: new Date() },
  });

  if (!user) {
    return res.status(400).json({ error: "Invalid or expired verification token" });
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiry = undefined;
  await user.save();

  const jwtToken = signToken(user._id);
  res.json({ token: jwtToken, user: user.toSafeObject() });
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  if (!user.isVerified) {
    return res.status(403).json({ error: "Please verify your email before logging in" });
  }
  const token = signToken(user._id);
  res.json({ token, user: user.toSafeObject() });
}

async function resendVerification(req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const user = await User.findOne({ email });
  // Always respond the same way to avoid user enumeration
  if (!user || user.isVerified) {
    return res.json({ message: "If that email exists and is unverified, a new link has been sent." });
  }

  const verificationToken = generateVerificationToken();
  user.verificationToken = verificationToken;
  user.verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await user.save();

  try {
    await sendVerificationEmail(user.name, email, verificationToken);
  } catch (err) {
    console.error("Failed to resend verification email:", err.message);
    return res.status(500).json({ error: "Failed to send verification email. Check server email config." });
  }

  res.json({ message: "If that email exists and is unverified, a new link has been sent." });
}

async function me(req, res) {
  res.json({ user: req.user.toSafeObject() });
}

module.exports = { register, verifyEmail, resendVerification, login, me };
