import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["home", "office", "other"],
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fullName: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
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
});

const Address = mongoose.model("Address", addressSchema);

export default Address;
