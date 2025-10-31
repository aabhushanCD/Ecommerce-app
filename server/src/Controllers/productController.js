import Product from "../Models/product.model";
import { uploadMedia } from "../Utils/cloudinary";

// adding product by seller
export const addProduct = async (req, res) => {
  try {
    const { name, category, description, price, discount, stock } = req.body;
    const userId = req.userId;
    const role = req.role;
    const files = req.files;
    if (!name || !price || !stock || !files || !category || !description) {
      return res
        .status(400)
        .json({ message: "Please Provide mandatory fields", success: false });
    }

    if (!userId || !role) {
      return res.status(404).json({ message: "UnAuthorized", success: false });
    }

    if (role !== "seller") {
      return res.status(403).json({ message: "Access denied", success: false });
    }

    // Upload images to Cloudinary
    let imageUrls = [];
    for (const file of files) {
      const cloudinaryResult = await uploadMedia(file.path);
      if (!cloudinaryResult || !cloudinaryResult.secure_url) {
        return res
          .status(500)
          .json({ success: false, message: "Image upload failed" });
      }
      imageUrls.push(cloudinaryResult.secure_url);
    }

    const product = await Product.create({
      sellerId: userId,
      name,
      category,
      description,
      price,
      discount: discount || 0,
      stock,
      imageUrls,
    });
    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding product",
      error: error.message,
    });
  }
};
