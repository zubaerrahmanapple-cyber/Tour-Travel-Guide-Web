const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // ✅ Body parser
app.use(cors());         // ✅ Allow cross-origin requests

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Connection failed:", err));

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/auth", require("./routes/passwordRoutes"));
app.use("/places", require("./routes/place"));
app.use("/hotels", require("./routes/hotel"));
app.use("/bookings", require("./routes/booking"));
app.use("/api", require("./routes/contactRoutes"));   // ✅ Contact routes
app.use("/api", require("./routes/chatbotRoutes"));  // ✅ Chatbot routes

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Server run
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
