import Cart from "../Models/cart.model";

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

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity = 1 } = req.body; // optional: how many to remove
    const userId = req.userId;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const itemIndex = cart.cartItems.findIndex(
      (cartItem) => cartItem.item.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    const existingItem = cart.cartItems[itemIndex];

    // Decrease quantity or remove item
    if (existingItem.quantity > quantity) {
      existingItem.quantity -= quantity;
    } else {
      cart.cartItems.splice(itemIndex, 1); // remove item completely
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    console.error("Error removing product from cart:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while removing from cart",
    });
  }
};

export const viewCart = async (req, res) => {
  try {
    const userId = req.userId;

    let cart = await Cart.findOne({ userId }).populate({
      path: "cartItems.item",
      select: "name price discount imageUrl stock", // only useful fields
    });

    if (!cart) {
      cart = await Cart.create({ userId, cartItems: [] });
    }

    return res
      .status(200)
      .json({ message: "cart fetched ", success: true, cart });
  } catch (error) {
    console.error("Something went wrong to view Cart", error.message);

    return res
      .status(500)
      .json({ message: "Server Error!  fetching cart ", success: false });
  }
};

