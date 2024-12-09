import express from "express";
import Place from "../models/Place.js";
import User from "../models/User.js";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";


router.post("/places", async (req, res) => {
  const { userId, name, description, address, location, image } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
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
router.get("/places/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const places = await Place.find({ userId: userId });
    res.status(200).json(places);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get one place
router.get("/places/:placeId", async (req, res) => {
  const {placeId} = req.params;
  console.log("Received placeId:", placeId);
  try{
    const place = await Place.findById(placeId);
    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }
    res.status(200).json(place);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

//add place
router.post("/places/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name, description, address, location, image } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
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

// Delete a place
router.delete("/places/:placeId", async (req, res) => {
  const { placeId } = req.params;

  try {
    const place = await Place.findByIdAndDelete(placeId);
    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }

    res.status(200).json({ message: "Place deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Update a place
router.put("/places/:placeId", async (req, res) => {
  const { placeId } = req.params;
  const { name, description, address, location, image } = req.body;

  try {
    const place = await Place.findById(placeId);
    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }

    // Update the place with the new details
    place.name = name || place.name;
    place.description = description || place.description;
    place.address = address || place.address;
    place.location = location || place.location;
    place.image = image || place.image;

    const updatedPlace = await place.save();
    res.status(200).json(updatedPlace);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


export default router;
