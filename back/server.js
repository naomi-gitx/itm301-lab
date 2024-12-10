import express from "express";
import connectDB from "./database/db.js";
import userRoutes from "./routes/users.js";
import placeRoutes from "./routes/places.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
connectDB();

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cors());
// Use routes
app.use('/api', userRoutes);
app.use('/api', placeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
