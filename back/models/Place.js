import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Ensures that every place must be associated with a user
  },
  name: {
    type: String,
    required: true, // Ensures every place must have a name
  },
  description: {
    type: String,
    default: '', // Optional description with a default empty string
  },
  address: {
    type: String,
    default: '', // Optional address with a default empty string
  },
  location: {
    latitude: {
      type: Number,
      required: false, // Optional latitude
    },
    longitude: {
      type: Number,
      required: false, // Optional longitude
    },
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/150", // Default image URL
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// module.exports = mongoose.model('Place', placeSchema);

export default mongoose.model('Place', placeSchema);