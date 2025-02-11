const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./mongoose");
const authRoutes = require("./routes/auth"); // Import Register API

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use Authentication Routes
app.use("/api", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
