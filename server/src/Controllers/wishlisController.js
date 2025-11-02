import Wishlist from "../Models/wishlist.model.js";
import Product from "../Models/product.model.js";

// -------------------- ADD PRODUCT TO WISHLIST --------------------
export const addToWishlist = async (req, res) => {
  try {
    const userId = req.userId; // assume set by auth middleware
    const { productId } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Find wishlist for user
    let wishlist = await Wishlist.findOne({ userId });

    // If wishlist doesn't exist, create one
    if (!wishlist) {
      wishlist = await Wishlist.create({
        userId,
        productId: [productId],
      });
      return res.status(200).json({
        success: true,
        message: "Wishlist created and product added",
        wishlist,
      });
    }

    // Prevent duplicate entries
    if (wishlist.productId.includes(productId)) {
      return res.status(400).json({
        success: false,
        message: "Product already in wishlist",
      });
    }

    // Add product
    wishlist.productId.push(productId);
    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      wishlist,
    });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// -------------------- VIEW USER WISHLIST --------------------
export const viewWishlist = async (req, res) => {
  try {
    const userId = req.userId;

    const wishlist = await Wishlist.findOne({ userId }).populate({
      path: "productId",
      select: "name price imageUrl description category",
    });

    if (!wishlist) {
      return res.status(200).json({
        success: true,
        message: "No wishlist found for user",
        products: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully",
      products: wishlist.productId,
    });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// -------------------- REMOVE PRODUCT FROM WISHLIST --------------------
export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res
        .status(404)
        .json({ success: false, message: "Wishlist not found" });
    }

    const index = wishlist.productId.indexOf(productId);
    if (index === -1) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found in wishlist" });
    }

    // Remove product
    wishlist.productId.splice(index, 1);
    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      wishlist,
    });
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// -------------------- CLEAR ENTIRE WISHLIST --------------------
export const clearWishlist = async (req, res) => {
  try {
    const userId = req.userId;

    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res
        .status(404)
        .json({ success: false, message: "Wishlist not found" });
    }

    wishlist.productId = [];
    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Wishlist cleared successfully",
    });
  } catch (error) {
    console.error("Error clearing wishlist:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST-> /wishlist/add
// GET	/wishlist/view
// DELETE	/wishlist/remove/:productId	Remove a product
// DELETE	/wishlist/clea
