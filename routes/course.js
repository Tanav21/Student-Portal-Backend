const express = require("express");
const Course = require("../models/course");
const auth = require("../middlewares/auth"); // Protect routes with authentication

const router = express.Router();

// @route   POST /api/courses
// @desc    Create a new course
// @access  Private (Requires Authentication)
router.post("/", auth, async (req, res) => {
    try {
        const { coursename, description, brief, amount, courseImage } = req.body;

        // Check if all fields are provided
        if (!coursename || !description || !brief || !amount) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newCourse = new Course({
            coursename,
            description,
            brief,
            amount,
            courseImage
        });

        await newCourse.save();
        res.status(201).json({
            message: "Course created successfully",
            course: newCourse
        });

    } catch (error) {
        console.error("Error creating course:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// @route   GET /api/courses
// @desc    Get all courses
// @access  Public
router.get("/", async (req, res) => {
    try {
        const courses = await Course.find();
        res.json({
            message: "Courses fetched successfully",
            courses
        });
    } catch (error) {
        console.error("Error fetching courses:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
