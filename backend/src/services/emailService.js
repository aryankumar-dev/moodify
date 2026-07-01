const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendVerificationEmail(name, email, token) {
  const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"${process.env.EMAIL_FROM_NAME || "Moodify"}" <${process.env.EMAIL_FROM_ADDRESS || process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your Moodify account",
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

        <!-- Header -->
        <tr><td align="center" style="padding-bottom:32px;">
          <div style="font-size:40px;line-height:1;">🎵</div>
          <h1 style="margin:12px 0 0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">Moodify</h1>
          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;">Music for every mood</p>
        </td></tr>

        <!-- Card -->
        <tr><td style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:20px;padding:40px 36px;">

          <!-- Greeting -->
          <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#ffffff;">
            Welcome, ${name}! 👋
          </h2>
          <p style="margin:0 0 28px;font-size:15px;color:#9ca3af;line-height:1.6;">
            Thanks for joining Moodify. One quick step — verify your email address to activate your account and start discovering music that matches your mood.
          </p>

          <!-- Button -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center" style="padding-bottom:28px;">
              <a href="${verifyUrl}"
                 style="display:inline-block;padding:14px 40px;background:linear-gradient(135deg,#22c55e,#16a34a);color:#000000;font-size:15px;font-weight:700;border-radius:12px;text-decoration:none;letter-spacing:0.3px;">
                ✉️ &nbsp;Verify My Email
              </a>
            </td></tr>
          </table>

          <!-- Divider -->
          <hr style="border:none;border-top:1px solid #2a2a2a;margin:0 0 24px;">

          <!-- Fallback link -->
          <p style="margin:0 0 6px;font-size:13px;color:#6b7280;">Button not working? Copy and paste this link:</p>
          <p style="margin:0;font-size:12px;word-break:break-all;">
            <a href="${verifyUrl}" style="color:#22c55e;text-decoration:none;">${verifyUrl}</a>
          </p>

          <!-- Expiry notice -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
            <tr><td style="background:#292524;border-left:3px solid #f59e0b;border-radius:4px;padding:12px 16px;">
              <p style="margin:0;font-size:13px;color:#fbbf24;">
                ⏳ &nbsp;This link expires in <strong>24 hours</strong>. If you didn't sign up, you can safely ignore this email.
              </p>
            </td></tr>
          </table>

        </td></tr>

        <!-- Footer -->
        <tr><td align="center" style="padding-top:28px;">
          <p style="margin:0;font-size:12px;color:#4b5563;">
            © 2025 Moodify &nbsp;·&nbsp; Made with 🎶 &nbsp;·&nbsp; You received this because you registered at Moodify
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
    `,
  });
}

module.exports = { sendVerificationEmail };
