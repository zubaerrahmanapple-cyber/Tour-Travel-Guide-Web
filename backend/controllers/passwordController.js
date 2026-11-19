
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Gmail configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Send OTP
exports.sendOTP = async (req, res) => {
    console.log("📩 SEND OTP REQUEST RECEIVED");

    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        console.log("🔍 Checking registered email...");

        const user = await User.findOne({
            email: email.trim()
        });

        if (!user) {
            console.log("❌ User not found");

            return res.status(404).json({
                message: "No account found with this email"
            });
        }

        console.log("✅ User found. Generating OTP...");

        const otp = crypto.randomInt(100000, 1000000).toString();

        const hashedOTP = crypto
            .createHash("sha256")
            .update(otp)
            .digest("hex");

        user.resetOTP = hashedOTP;
        user.resetOTPExpires = new Date(
            Date.now() + 10 * 60 * 1000
        );

        await user.save();

        console.log("📧 Sending OTP email...");

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "TravelMate Password Reset OTP",
            text: `Your TravelMate password reset OTP is ${otp}. It will expire in 10 minutes.`
        });

        console.log("✅ OTP EMAIL SENT SUCCESSFULLY");

        return res.json({
            message: "OTP sent successfully to your email"
        });

    } catch (error) {
        console.error("❌ OTP ERROR:", error);

        return res.status(500).json({
            message: "Failed to send OTP"
        });
    }
};


// Verify OTP and reset password
exports.resetPassword = async (req, res) => {

    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters"
            });
        }

        const user = await User.findOne({
            email: email.trim()
        });

        if (!user || !user.resetOTP || !user.resetOTPExpires) {
            return res.status(400).json({
                message: "Please request a new OTP"
            });
        }

        if (user.resetOTPExpires < new Date()) {

            user.resetOTP = null;
            user.resetOTPExpires = null;

            await user.save();

            return res.status(400).json({
                message: "OTP expired. Please request a new OTP"
            });
        }

        const hashedOTP = crypto
            .createHash("sha256")
            .update(otp)
            .digest("hex");

        if (hashedOTP !== user.resetOTP) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);

        user.resetOTP = null;
        user.resetOTPExpires = null;

        await user.save();

        return res.json({
            message: "Password reset successful"
        });

    } catch (error) {

        console.error("❌ PASSWORD RESET ERROR:", error);

        return res.status(500).json({
            message: "Password reset failed"
        });
    }
};
