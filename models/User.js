const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    skills: { type: String, default: "" }, // Skills as a single string
    image: { type: String },
    dob: { type: Date },
    education: [
        {
            degree: { type: String, required: true },
            institution: { type: String, required: true },
            year: { type: Number }
        }
    ]
});

module.exports = mongoose.model("User", UserSchema);
