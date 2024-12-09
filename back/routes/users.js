import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
const router = express.Router();
import jwt from "jsonwebtoken";
import authenticateUser from "../middleware/auth.js";

// Create a new user
router.post("/signup", async (req, res) => {
  const { name, email, password, image } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password with salt rounds

    const user = new User({
      name,
      email,
      password: hashedPassword, // Save hashed password
      image: image || "https://via.placeholder.com/150", // Set default image if none provided
    });

    await user.save();
    res.status(201).json(user); // Return created user without password
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    const ismatch = await bcrypt.compare(password, user.password);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid  password" });
    }

    // Generate JWT access token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get a user by ID
router.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).select("name");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
