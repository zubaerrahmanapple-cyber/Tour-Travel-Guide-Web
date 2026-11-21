
const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    verifyToken,
    profile,
    updateProfile
} = require("../controllers/authController");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", verifyToken, profile);

// UPDATE USER PROFILE
router.put("/profile", verifyToken, updateProfile);

module.exports = router;
