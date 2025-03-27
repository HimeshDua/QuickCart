import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    emails: {
      type: [String],
      required: true,
      unique: true,
      validate: {
        validator: function (emails) {
          return emails.length > 0;
        },
        message: "User must have at least one email address.",
      },
    },
    imageUrl: { type: String, required: true },
    cartItems: { type: Object, default: {} },
  },
  { minimize: false }
);

userSchema.index({ emails: 1 }, { unique: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
