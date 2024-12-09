import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/150",
  },
  password: {
    type: String,
    required: true,
  },
});


export default mongoose.model('User', userSchema);