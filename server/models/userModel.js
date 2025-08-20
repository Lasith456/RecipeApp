import mongoose from "mongoose";

const favoriteRecipeSchema = new mongoose.Schema({
  idMeal: { type: String, required: true },
  strMeal: { type: String, required: true },
  strMealThumb: { type: String, required: true },
});


const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "staff"],
      default: "staff",
    },
    department: {
      type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    favorites: [favoriteRecipeSchema],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);