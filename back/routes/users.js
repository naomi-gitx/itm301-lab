import express from "express";
import bcrypt from "bcrypt"; // Import bcrypt to hash passwords
import User from "../models/User.js";
const router = express.Router();
import jwt from "jsonwebtoken";

// Create a new user
router.post("/signup", async (req, res) => {
  const { name, email, password, image } = req.body;

  // Check if all required fields are present
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

const testPassword = async () => {
    const plainPassword = "ss12345678";
    const hashedPassword = "$2a$10$p3PeTSefO.H1wc7oob.lzu0oS6sekq64lPxTpvdA4crNP6e2fM82a"; // Replace with your DB hash
  
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    console.log("Passwords match:", isMatch);
  };

//login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not exists" });
    }   
    
    testPassword();
    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }
  
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expiration time (e.g., 1 hour)
    );
  
    // Send the token to the client
    res.json({ token });
  });


// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password from response
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get user
router.get('/user', async (req, res) => {
    try {
      const { email } = req.body; // Get email from query parameters
  
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
  
      const user = await User.findOne({ email }); // Query the database
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user); // Return the user data
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

export default router;