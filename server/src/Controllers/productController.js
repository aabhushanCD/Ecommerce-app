import Product from "../Models/product.model";
import { deleteMedia, uploadMedia } from "../Utils/cloudinary";

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
      imageUrls.push({
        url: cloudinaryResult.secure_url,
        publicId: cloudinaryResult.public_id,
      });
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

export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      discount,
      stock,
      isAvailable,
      isFlashSale,
    } = req.body;
    const { productId } = req.params;
    const userId = req.userId;
    const role = req.role;

    const product = await Product.findById(productId);

    if (role !== "seller" && role !== "admin") {
      return res.status(403).json({ message: "Access denied", success: false });
    }

    if (product.sellerId.toString() !== userId && role !== "admin") {
      return res
        .status(404)
        .json({ message: "unAuthorized to update product" });
    }

    product.name = name || product.name;
    product.category = category || product.category;
    product.description = description || product.description;
    product.price = price || product.price;
    product.discount = discount ?? product.discount;
    product.stock = stock ?? product.stock;
    product.isAvailable = isAvailable ?? product.isAvailable;
    product.isFlashSale = isFlashSale ?? product.isFlashSale;

    const updatedProduct = await product.save();
    return res.status(200).json({
      message: "Successfully update Product details",
      updatedProduct,
      success: true,
    });
  } catch (error) {
    console.error("Error while updating Product ", error.message);
    return res.status(500).json({
      message: "Server Error,while update Product details",
      success: false,
    });
  }
};

export const updateProductImage = async (req, res) => {
  try {
    const userId = req.userId;
    const role = req.role;
    const files = req.files;
    const { productId } = req.params;
    const { removedImageIds } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (role !== "seller" && role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    if (product.sellerId.toString() !== userId && role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to modify this product",
      });
    }

    if (removedImageIds && Array.isArray(removedImageIds)) {
      for (const publicId of removedImageIds) {
        await deleteMedia(publicId);
        product.imageUrls = product.imageUrls.filter(
          (img) => img.publicId !== publicId
        );
      }
    }

    if (files) {
      for (const file of files) {
        const cloudinaryResult = await uploadMedia(file.path);
        if (cloudinaryResult && cloudinaryResult.secure_url) {
          product.imageUrls.push({
            url: cloudinaryResult.secure_url,
            publicId: cloudinaryResult.public_id,
          });
        }
      }
    }
    await product.save();

    return res.status(200).json({
      message: "Product Picture Uploaded Successfully",
      success: false,
    });
  } catch (error) {
    console.error(
      "Something went wrong while updating product image",
      error.message
    );
    return res.status(500).json({
      message: "Server Error, while Picture Uploading",
      success: false,
      error: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { category, flash, page = 1, limit = 10, search, sort } = req.query;
    const query = {};

    // 1 Filter by category
    if (category) query.category = category;

    // 2 Flash sale products
    if (flash === "true") query.isFlashSale = true;

    // 3 Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // 4 Pagination
    const skip = (page - 1) * limit;

    // 5 Sorting (price, rating, date, etc.)
    const sortOptions = {};

    if (sort === "priceAsc") sortOptions.price = 1;
    if (sort === "priceDesc") sortOptions.price = -1;
    if (sort === "newest") sortOptions.createdAt = -1;
    else sortOptions.createdAt = -1;

    const products = await Product.find(query)
      .populate("category", "name")
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .lean();
    const total = await Product.countDocuments(query);

    return res.status(200).json({
      success: true,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.userId;
    const role = req.role;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(403).json({ message: "Access Denied", success: false });
    }
    if (product.sellerId !== userId && role === "customer") {
      return res.status(401).json({ message: "UnAuthorized", success: false });
    }
    if (product.imageUrls.length > 0) {
      for (const img of product.imageUrls) {
        try {
          await deleteMedia(img.publicId);
        } catch (err) {
          console.warn("Failed to delete media:", img.publicId, err.message);
        }
      }
    }

    await product.deleteOne();
    return res
      .status(200)
      .json({ success: true, message: "Successfully Removed Product" });
  } catch (error) {
    console.error("Something went Wrong!", error.message);
    return res
      .status(500)
      .json({ message: "Server Errro While deleting Product" });
  }
};


