import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    street: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    area: {
      type: String,
    },
  },
  {
    _id: false,
  },
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "customer", "seller"],
      default: "customer",
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    address: [addressSchema],
    imageUrl: {
      type: String,
    },
    preferences: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
