const express = require("express");
const User = require("../models/user");
const auth = require("../middlewares/auth"); // Middleware for JWT authentication

const router = express.Router();

// @route   GET /api/profile
// @desc    Get the logged-in user's profile
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
                email: user.email, // Email is returned but not updatable
                phone: user.phone || "",
                address: user.address || "",
                skills: user.skills || "",
                image: user.image || "",
                dob: user.dob || "",
                education: user.education || []
            }
        });
    } catch (error) {
        console.error("Error fetching profile:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// @route   PUT /api/profile/:id
// @desc    Update a specific student's profile (Email cannot be changed)
// @access  Private (Requires Authentication)
router.put("/:id", auth, async (req, res) => {
    try {
        const { name, phone, address, skills, image, dob, education } = req.body;
        const studentId = req.params.id;

        let user = await User.findById(studentId);

        if (!user) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Ensure the user cannot update their email
        if (req.body.email && req.body.email !== user.email) {
            return res.status(400).json({ message: "Email cannot be changed" });
        }

        // Update only if fields are provided
        user.name = name || user.name;
        user.phone = phone || user.phone;
        user.address = address || user.address;
        user.skills = skills || user.skills;
        user.image = image || user.image;
        user.dob = dob || user.dob;
        user.education = Array.isArray(education) ? education : user.education;

        await user.save();

        res.json({
            message: "Profile updated successfully",
            profile: {
                id: user.id,
                name: user.name,
                email: user.email, // Email remains unchanged
                phone: user.phone,
                address: user.address,
                skills: user.skills,
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
