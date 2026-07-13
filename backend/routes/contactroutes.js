const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST: Save contact info
router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.json({ message: "✅ Message saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: "❌ Error saving message", error: err });
  }
});

module.exports = router;
