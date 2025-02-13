const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./mongoose");
const authRoute = require("./routes/Auth");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/course"); // ✅ Add course routes

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoutes);
app.use("/api/courses", courseRoutes); // ✅ Added course routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
