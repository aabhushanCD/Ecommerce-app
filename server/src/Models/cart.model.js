import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

// Main Cart Schema
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [cartItemSchema], // array of items
  },

  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
