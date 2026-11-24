const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const User = require("../models/User");
const Otp = require("../models/Otp");

// ================= MAIL SETUP =================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ================= REGISTER (SEND OTP) =================
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.deleteMany({ email });

    // ⭐ Save address also
    await Otp.create({
      email,
      otp,
      name,
      phone,
      password,
      address
    });

    await transporter.sendMail({
      from: `"FurniStyle" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "FurniStyle OTP Verification",
      html: `
        <div style="font-family:Arial">
          <h2 style="color:#b68d40">FurniStyle</h2>
          <p>Hello ${name},</p>
          <p>Your <b>6-digit OTP</b> is:</p>
          <h1 style="letter-spacing:4px">${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
        </div>
      `
    });

    res.json({ message: "OTP sent to email" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= VERIFY OTP & CREATE USER =================
router.post("/verify", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await Otp.findOne({ email, otp });
    if (!record) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // ⭐ Create permanent user with address
    await User.create({
      name: record.name,
      email: record.email,
      phone: record.phone,
      password: record.password,
      address: record.address
    });

    await Otp.deleteMany({ email });

    res.json({
      success: true,
      message: "Registration successful"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= USER LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ================= ADMIN LOGIN =================
router.post("/admin-login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@furnistyle.com" && password === "admin123") {
    return res.json({ admin: true });
  }

  return res.status(401).json({ message: "Invalid admin credentials" });
});

module.exports = router;