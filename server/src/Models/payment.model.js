import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["complete", "pending", "cancel"],
    required: true,
    default: "pending",
  },

  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "",
    required: true,
  },
  transactionId: {
    type: String,
  },
  method: {
    type: String,
    enum: ["cod", "card", "wallet"],
  },
});

export default mongoose.model("Payment", paymentSchema);
