import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  emails: { type: [String], required: true, unique: true, trim: true }, // Multiple emails
  imageUrl: { type: String, required: true },
  cartItems: { type: Object, default: {} },
}, { minimize: false });


const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
