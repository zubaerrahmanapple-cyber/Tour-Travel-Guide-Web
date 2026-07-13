const express = require("express");
const router = express.Router();
const { registerUser, loginUser, verifyToken, profile } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, profile);

module.exports = router;
