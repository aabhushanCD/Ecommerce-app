import Cart from "../Models/cart.model.js";
import Product from "../Models/product.model.js";
import Order from "../Models/order.model.js";

export const placedOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { selectItems, paymentMethod, transactionId } = req.body;

    if (!paymentMethod || !["Online", "COD"].includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    if (
      !selectItems ||
      !Array.isArray(selectItems) ||
      selectItems.length === 0
    ) {
      return res.status(400).json({
        message: "Please select at least one product",
        success: false,
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(400).json({
        message: "Your cart was not found",
        success: false,
      });
    }

    // Build order items
    const orderItems = [];
    let totalAmount = 0;

    for (const item of cart.cartItems) {
      if (selectItems.includes(item.item.toString())) {
        const product = await Product.findById(item.item);
        if (product) {
          const price = product.price;
          const discount = product.discount || 0;
          const subtotal = price * item.quantity - discount;

          orderItems.push({
            productId: product._id,
            sellerId: product.sellerId,
            name: product.name,
            quantity: item.quantity,
            price,
            discount,
            subtotal,
          });

          totalAmount += subtotal;
        }
      }
    }

    if (orderItems.length === 0) {
      return res.status(400).json({
        message: "No valid products found in selection",
        success: false,
      });
    }

    const paymentStatus =
      paymentMethod === "Online"
        ? req.paymentVerified // set by middleware
          ? "Paid"
          : "Failed"
        : "Pending";

    //  Create new order
    const newOrder = await Order.create({
      userId,
      items: orderItems,
      totalAmount,
      paymentMethod,
      paymentStatus,
      transactionId: transactionId || null,
    });

    // Remove ordered items from cart
    cart.cartItems = cart.cartItems.filter(
      (item) => !selectItems.includes(item.item.toString())
    );
    await cart.save();

    return res.status(201).json({
      message: "Order placed successfully",
      success: true,
      order: newOrder,
    });
  } catch (error) {
    console.error("Something went wrong while placing order:", error.message);
    return res.status(500).json({
      message: "Server Error while placing order",
      success: false,
    });
  }
};
