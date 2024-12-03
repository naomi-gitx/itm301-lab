import express from "express";
import Place from "../models/Place.js"
import User from "../models/User.js";
const router = express.Router();

router.post('/places', async (req, res) => {
  const { userId, name, description, address, location, image } = req.body;

  try {
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const place = new Place({
      userId,
      name,
      description,
      address,
      location,
      image,
    });

    await place.save();
    res.status(201).json(place);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get places for a specific user
router.get('/places/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const places = await Place.find({ userId });
    res.status(200).json(places);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
