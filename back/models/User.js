import mongoose from "mongoose";
import bcrypt from "bcrypt";


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


userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password); 
    return isMatch;
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// module.exports = mongoose.model('User', userSchema);

export default mongoose.model('User', userSchema);