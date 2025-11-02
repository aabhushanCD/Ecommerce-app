import Category from "../Models/categories.model.js";
import { deleteMedia, uploadMedia } from "../Utils/cloudinary.js";

// ____Add Catefories_____________
export const addCategories = async (req, res) => {
  try {
    const role = req.role;
    const { name, description } = req.body;
    const { parentId } = req.params;
    const file = req.file;

    // Only admin can create category
    if (role !== "admin") {
      return res.status(403).json({ message: "Access denied", success: false });
    }

    // Check duplicate category name
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res
        .status(400)
        .json({ message: "Category already exists", success: false });
    }

    // Upload image if provided
    let imageData = null;
    if (file) {
      try {
        const uploadResult = await uploadMedia(file.path);
        imageData = {
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
        };
      } catch (error) {
        return res.status(500).json({
          message: "Error uploading image. Try again later.",
          success: false,
        });
      }
    }

    // Create category
    const category = await Category.create({
      name,
      description,
      imageUrl: imageData,
      parentCategory: parentId || null,
    });

    return res.status(200).json({
      message: parentId ? "New Sub-category added" : "New category added",
      success: true,
      category,
    });
  } catch (error) {
    console.error("Error adding category:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// -------------------- VIEW CATEGORIES --------------------
export const viewCategories = async (_, res) => {
  try {
    const categories = await Category.find()
      .populate("parentCategory", "name _id")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// -------------------- UPDATE CATEGORY --------------------
export const updateCategories = async (req, res) => {
  try {
    const role = req.role;
    const { id } = req.params;
    const { name, description } = req.body;
    const file = req.file;

    if (role !== "admin") {
      return res.status(403).json({ message: "Access denied", success: false });
    }

    const category = await Category.findById(id);
    if (!category) {
      return res
        .status(404)
        .json({ message: "Category not found", success: false });
    }

    // If new image uploaded, delete old one from Cloudinary
    if (file) {
      if (category.imageUrl?.publicId) {
        await deleteMedia(category.imageUrl.publicId);
      }

      const uploadResult = await uploadMedia(file.path);
      category.imageUrl = {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      };
    }

    // Update name and description
    if (name) category.name = name;
    if (description) category.description = description;

    await category.save();

    return res.status(200).json({
      message: "Category updated successfully",
      success: true,
      category,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// -------------------- DELETE CATEGORY --------------------
export const removeCategories = async (req, res) => {
  try {
    const role = req.role;
    const { id } = req.params;

    if (role !== "admin") {
      return res.status(403).json({ message: "Access denied", success: false });
    }

    const category = await Category.findById(id);
    if (!category) {
      return res
        .status(404)
        .json({ message: "Category not found", success: false });
    }

    // Delete image from Cloudinary if exists
    if (category.imageUrl?.publicId) {
      try {
        await deleteMedia(category.imageUrl.publicId);
      } catch (err) {
        console.error("Cloudinary deletion failed:", err);
      }
    }

    // Delete subcategories if any (optional cleanup)
    await Category.deleteMany({ parentCategory: id });

    // Delete category itself
    await category.deleteOne();

    return res.status(200).json({
      message: "Category and its subcategories deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
