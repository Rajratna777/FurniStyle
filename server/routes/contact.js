const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/send", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    await Contact.create({ name, email, subject, message });

    res.json({ success: true, msg: "We will resolve your query soon" });

  } catch (err) {
    res.status(500).json({ success: false, msg: "Error sending message" });
  }
});

module.exports = router;