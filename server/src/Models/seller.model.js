import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  shopName: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  document: {
    pan: {
      type: String,
    },
  },
  phone: [
    {
      type: Number,
    },
  ],
  rating: {
    type: Number,
    max: 5,
  },
  address: {
    type: "String",
    trim: true,
  },
});

const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;
