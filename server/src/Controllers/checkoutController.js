import Address from "../Models/address.model.js";
import Cart from "../Models/cart.model.js";
import Product from "../Models/product.model.js";
import Order from "../Models/order.model.js";
import mongoose from "mongoose";

export const placedOrder = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const userId = req.userId;
    const { selectItems, paymentMethod, transactionId, addressId } = req.body;

    if (!["Online", "COD"].includes(paymentMethod)) {
      throw new Error("Invalid payment method");
    }

    if (!Array.isArray(selectItems) || selectItems.length === 0) {
      throw new Error("Please select at least one product");
    }

    const selectedAddress = await Address.findById(addressId).session(session);
    if (!selectedAddress) throw new Error("Address not found");

    const cart = await Cart.findOne({ userId }).session(session);
    if (!cart) throw new Error("Cart not found");

    const products = await Product.find({
      _id: { $in: selectItems },
    }).session(session);

    const productMap = new Map();
    products.forEach((p) => productMap.set(p._id.toString(), p));

    const sellerMap = new Map();

    //  Build seller-wise items
    for (const item of cart.cartItems) {
      const productId = item.item.toString();
      if (!selectItems.includes(productId)) continue;

      const product = productMap.get(productId);
      if (!product) continue;

      if (product.stock < item.quantity) {
        throw new Error(`${product.name} is out of stock`);
      }

      const price = product.price;
      const discount = product.discount || 0;
      const discountedPrice = price - (price * discount) / 100;
      const subtotal = discountedPrice * item.quantity;

      const orderItem = {
        productId: product._id,
        sellerId: product.sellerId,
        name: product.name,
        quantity: item.quantity,
        price,
        discount,
        subtotal,
      };

      const sellerId = product.sellerId.toString();

      if (!sellerMap.has(sellerId)) {
        sellerMap.set(sellerId, []);
      }

      sellerMap.get(sellerId).push(orderItem);

      // reduce stock
      product.stock -= item.quantity;
    }

    if (sellerMap.size === 0) {
      throw new Error("No valid products found");
    }

    // ✅ Save stock updates
    await Promise.all(products.map((p) => p.save({ session })));

    let paymentStatus = "Pending";
    if (paymentMethod === "Online") {
      if (!req.paymentVerified) throw new Error("Payment failed");
      paymentStatus = "Paid";
    }

    const orders = [];

    // 🚀 Create multiple orders (one per seller)
    for (const [sellerId, items] of sellerMap.entries()) {
      const totalAmount = items.reduce((sum, i) => sum + i.subtotal, 0);

      const order = await Order.create(
        [
          {
            userId,
            items,
            totalAmount,
            paymentMethod,
            paymentStatus,
            shipping: selectedAddress._id,
            transactionId: transactionId || null,
          },
        ],
        { session },
      );

      orders.push(order[0]);
    }

    // ✅ Remove items from cart
    cart.cartItems = cart.cartItems.filter(
      (item) => !selectItems.includes(item.item.toString()),
    );

    await cart.save({ session });

    await session.commitTransaction();

    return res.status(201).json({
      message: "Orders placed successfully",
      success: true,
      orders,
    });
  } catch (error) {
    await session.abortTransaction();

    return res.status(400).json({
      message: error.message,
      success: false,
    });
  } finally {
    session.endSession();
  }
};

export const buyNow = async (req, res) => {
  const session = await mongoose.startSession();
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
    const newOrder = await Order.create(
      [
        {
          userId,
          items: [orderItem],
          totalAmount: subtotal,
          paymentMethod,
          paymentStatus,
          shipping: selectedAddress._id,
          transactionId: transactionId || null,
        },
      ],
      { session },
    );

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
