import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      url: { type: String, trim: true },
      publicId: { type: String, trim: true },
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Self-reference
      default: null,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
