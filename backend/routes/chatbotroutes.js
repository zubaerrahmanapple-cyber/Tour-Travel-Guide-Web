const express = require("express");
const router = express.Router();

const faq = {
  "hi": "Hello! How can I help you today?",
  "alvi": "He is our admin.",
  "zubaer": "He is our admin.",
  "hello": "Hi there! Ask me about places or hotels.",

  "how to book hotel": "Go to Hotels section and click 'Book Now'.",
  "contact info": "You can reach us at travelbd@gmail.com.",
  

};

router.post("/chatbot", (req, res) => {
  console.log("Received from frontend:", req.body); // Debug log

  const { question } = req.body;
  if (!question) {
    return res.json({ answer: "❌ No question received from frontend." });
  }

  const lowerQ = question.toLowerCase().trim();
  let answer = "Sorry, I don't understand. Please try another question.";

  if (faq[lowerQ]) {
    answer = faq[lowerQ];
  } else {
    for (let key in faq) {
      if (lowerQ.includes(key)) {
        answer = faq[key];
        break;
      }
    }
  }

  res.json({ answer });
});

module.exports = router;

