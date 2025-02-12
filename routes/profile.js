const express = require("express");
const User = require("../models/user");
const auth = require("../middlewares/auth"); // Middleware for JWT authentication

const router = express.Router();

// @route   GET /api/profile
// @desc    Get user profile
// @access  Private (Requires Authentication)
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            message: "Profile fetched successfully",
            profile: {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
                dob: user.dob,
                education: user.education || []
            }
        });
    } catch (error) {
        console.error("Error fetching profile:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// @route   PUT /api/profile
// @desc    Update user profile
// @access  Private (Requires Authentication)
router.put("/", auth, async (req, res) => {
    try {
        const { name, email, image, dob, education } = req.body;

        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (name) user.name = name;
        if (image) user.image = image;
        if (dob) user.dob = dob;
        if (education) user.education = education; // Expecting an array

        await user.save();

        res.json({
            message: "Profile updated successfully",
            profile: {
                id: user.id,
                name: user.name,
                image: user.image,
                dob: user.dob,
                education: user.education
            }
        });

    } catch (error) {
        console.error("Error updating profile:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
