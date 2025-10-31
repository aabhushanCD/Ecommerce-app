import mongoose from "mongoose";

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
    phoneNumber: [
      {
        type: Number,
      },
    ],
    imageUrl: {
      type: String,
    },
    preferences: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
