import Address from "../Models/address.model.js";
import Cart from "../Models/cart.model.js";
import Product from "../Models/product.model.js";
import Order from "../Models/order.model.js";
import mongoose from "mongoose";

const session = mongoose.startSession();

export const placedOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { selectItems, paymentMethod, transactionId, addressId } = req.body;

    //  Validate payment method
    if (!["Online", "COD"].includes(paymentMethod)) {
      return res.status(400).json({
        message: "Invalid payment method",
        success: false,
      });
    }

    //  Validate selected items
    if (!Array.isArray(selectItems) || selectItems.length === 0) {
      return res.status(400).json({
        message: "Please select at least one product",
        success: false,
      });
    }

    //  Get address
    const selectedAddress = await Address.findById(addressId);
    if (!selectedAddress) {
      return res.status(404).json({
        message: "Address not found",
        success: false,
      });
    }

    // Get cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(400).json({
        message: "Cart not found",
        success: false,
      });
    }

    //  Fetch all selected products in ONE query
    const products = await Product.find({
      _id: { $in: selectItems },
    });
    // Convert products to map for O(1) lookup
    const productMap = new Map();
    products.forEach((p) => productMap.set(p._id.toString(), p));

    const orderItems = [];
    let totalAmount = 0;

    session.startTransaction();

    //  Loop through cart items
    for (const item of cart.cartItems) {
      const productId = item.item.toString();

      if (!selectItems.includes(productId)) continue;

      const product = productMap.get(productId);
      if (!product) continue;

      //  Stock validation
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} is out of stock`,
          success: false,
        });
      }

      const price = product.price;
      const discount = product.discount || 0;

      //  Correct discount calculation
      const discountedPrice = price - (price * discount) / 100;
      const subtotal = discountedPrice * item.quantity;

      orderItems.push(
        {
          productId: product._id,
          sellerId: product.sellerId,
          name: product.name,
          quantity: item.quantity,
          price,
          discount,
          subtotal,
        },
        { session },
      );

      totalAmount += subtotal;

      //  Reduce stock
      product.stock -= item.quantity;
    }

    //  No valid items
    if (orderItems.length === 0) {
      return res.status(400).json({
        message: "No valid products found in selection",
        success: false,
      });
    }

    //  Save updated stock (bulk)
    await Promise.all(products.map((p) => p.save()));

    //  Payment status
    let paymentStatus = "Pending";

    if (paymentMethod === "Online") {
      if (!req.paymentVerified) {
        return res.status(400).json({
          message: "Payment verification failed",
          success: false,
        });
      }
      paymentStatus = "Paid";
    }

    //  Create order
    const newOrder = await Order.create(
      {
        userId,
        items: orderItems,
        totalAmount,
        paymentMethod,
        paymentStatus,
        shipping: selectedAddress._id,
        transactionId: transactionId || null,
      },
      { session },
    );

    //  Remove ordered items from cart
    cart.cartItems = cart.cartItems.filter(
      (item) => !selectItems.includes(item.item.toString()),
    );

    await cart.save();
    await session.commitTransaction();
    return res.status(201).json({
      message: "Order placed successfully",
      success: true,
      order: newOrder,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Order Error:", error);
    return res.status(500).json({
      message: "Server error while placing order",
      success: false,
    });
  } finally {
    session.endSession();
  }
};
export const buyNow = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      productId,
      quantity = 1,
      paymentMethod,
      transactionId,
      addressId,
    } = req.body;

    //  Validate inputs
    if (!productId) {
      return res.status(400).json({
        message: "Product is required",
        success: false,
      });
    }

    if (!["Online", "COD"].includes(paymentMethod)) {
      return res.status(400).json({
        message: "Invalid payment method",
        success: false,
      });
    }
    session.startTransaction();
    //  Get product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json(
        {
          message: "Product not found",
          success: false,
        },
        { session },
      );
    }

    //  Get address
    const selectedAddress = await Address.findById(addressId);
    if (!selectedAddress) {
      return res.status(404).json({
        message: "Address not found",
        success: false,
      });
    }

    //  Stock validation
    if (product.stock < quantity) {
      return res.status(400).json({
        message: `${product.name} is out of stock`,
        success: false,
      });
    }

    const price = product.price;
    const discount = product.discount || 0;

    //  Correct calculation
    const discountedPrice = price - (price * discount) / 100;
    const subtotal = discountedPrice * quantity;

    const orderItem = {
      productId: product._id,
      sellerId: product.sellerId,
      name: product.name,
      quantity,
      price,
      discount,
      subtotal,
    };

    //  Payment handling
    let paymentStatus = "Pending";

    if (paymentMethod === "Online") {
      if (!req.paymentVerified) {
        return res.status(400).json({
          message: "Payment verification failed",
          success: false,
        });
      }
      paymentStatus = "Paid";
    }

    //  Reduce stock
    product.stock -= quantity;
    await product.save();

    // Create order
    const newOrder = await Order.create({
      userId,
      items: [orderItem],
      totalAmount: subtotal,
      paymentMethod,
      paymentStatus,
      shipping: selectedAddress._id,
      transactionId: transactionId || null,
    }, { session });
    
    await session.commitTransaction();
    return res.status(201).json({
      message: "Order placed successfully",
      success: true,
      order: newOrder,
    });
  } catch (error) {
    await session.abortTransaction();

    console.error("Buy now error:", error);
    return res.status(500).json({
      message: "Server error while placing order",
      success: false,
    });
  } finally {
    session.endSession();
  }
};
