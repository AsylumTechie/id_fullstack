const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        console.log("Raw Password Before Storing:", password);

        // Just create the user; password hashing happens automatically
        const user = new User({ name, email, password });
        await user.save();

        // Fetch stored user to verify saved password
        const savedUser = await User.findOne({ email });
        console.log("Stored Hashed Password After Saving:", savedUser.password);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});



router.post("/login", async (req, res) => {
    try {
        console.log("Received Request Body:", req.body);

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ User not found");
            return res.status(401).json({ message: "User not found" });
        }

        console.log("Entered Password:", password);
        console.log("Stored Hashed Password:", user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match Result:", isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});



module.exports = router;
