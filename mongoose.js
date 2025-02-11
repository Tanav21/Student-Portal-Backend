const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/youtube"; // Fallback to local DB

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI); // ✅ Removed deprecated options
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1); // Stop server on DB connection failure
    }
};

module.exports = connectDB;
