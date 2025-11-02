import Wishlist from "../Models/wishlist.model.js";
import Product from "../Models/product.model.js";

/**
 * @desc Toggle wishlist (Add/Remove a product)
 * @route POST /wishlist/:productId
 */
export const toggleWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "Missing user or product ID", success: false });
    }

    // Check if product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    // Find user wishlist
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({ userId, productId: [productId] });
      return res
        .status(200)
        .json({
          message: "Product added to wishlist",
          success: true,
          wishlist,
        });
    }

    // If product already exists in wishlist, remove it
    const alreadyAdded = wishlist.productId.includes(productId);
    if (alreadyAdded) {
      wishlist.productId.pull(productId);
      await wishlist.save();
      return res
        .status(200)
        .json({
          message: "Product removed from wishlist",
          success: true,
          wishlist,
        });
    }

    // Otherwise, add it
    wishlist.productId.push(productId);
    await wishlist.save();
    return res
      .status(200)
      .json({ message: "Product added to wishlist", success: true, wishlist });
  } catch (error) {
    console.error("Error toggling wishlist:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

/**
 * @desc Get user wishlist
 * @route GET /wishlist
 */
export const viewWishlist = async (req, res) => {
  try {
    const userId = req.userId;

    const wishlist = await Wishlist.findOne({ userId }).populate("productId");

    if (!wishlist) {
      return res
        .status(200)
        .json({ message: "Wishlist is empty", success: true, wishlist: [] });
    }

    return res
      .status(200)
      .json({ message: "Wishlist fetched", success: true, wishlist });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

/**
 * @desc Clear all products from wishlist
 * @route DELETE /wishlist/clear
 */
export const clearWishlist = async (req, res) => {
  try {
    const userId = req.userId;

    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res
        .status(404)
        .json({ message: "Wishlist not found", success: false });
    }

    wishlist.productId = [];
    await wishlist.save();

    return res.status(200).json({ message: "Wishlist cleared", success: true });
  } catch (error) {
    console.error("Error clearing wishlist:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
