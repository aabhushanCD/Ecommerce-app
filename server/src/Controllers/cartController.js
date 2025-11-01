import Cart from "../Models/cart.model";
import cartModel from "../Models/cart.model";
import Product from "../Models/product.model";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const userId = req.userId;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    if (product.sellerId.toString() === userId.toString()) {
      return res.status(400).json({
        message: "Sellers cannot add their own products",
        success: false,
      });
    }
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        cartItems: [{ item: productId, quantity }],
      });

      return res
        .status(200)
        .json({ message: "Product added to cart ", success: true, cart });
    }
    // If cart exists, check if product already in cart
    const existingItem = cart.cartItems.find(
      (cartItem) => cartItem.item.toString() === productId
    );
    if (existingItem) {
      // Update quantity
      existingItem.quantity += quantity;
    } else {
      // Add new item
      cart.cartItems.push({ item: productId, quantity });
    }
    
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      cart,
    });
  } catch (error) {
    console.error("Something went wrong! Add to cart error:", error.message);
    return res
      .status(500)
      .json({ message: "Server Error add to cart error", success: false });
  }
};
