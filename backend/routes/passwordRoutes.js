
const express = require("express");
const router = express.Router();

const {
    sendOTP,
    resetPassword
} = require("../controllers/passwordController");

router.post("/send-otp", sendOTP);
router.post("/reset-password", resetPassword);

module.exports = router;

