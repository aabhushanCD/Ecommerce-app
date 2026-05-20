import Order from "../Models/order.model.js";
import User from "../Models/User.model.js";

// view all orders
export const getOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const role = req.role;

    if (role !== "seller") {
      return res.status(403).json({ message: "UnAuthorized", success: false });
    }
    const user = await User.findById(userId);

    if (!user) {
      return res.status(403).json({ message: "UnAuthorized", success: false });
    }

    const orders = await Order.find({ "items.sellerId": userId })
      .populate("userId", "name email")
      .populate("items.productId", "name price")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Orders fetched successfully",
      success: true,
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Something went wrong!", error.message);
    return res
      .status(500)
      .json({ message: "Server error! to get orders", success: false });
  }
};

// confirm the order
export const sellerConfirmedOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.userId;
    const role = req.role;

    if (role !== "seller") {
      return res.status(403).json({ message: "UnAuthorized", success: false });
    }
    const order = await Order.findById(orderId).populate(
      "items.productId",
      "stock isAvailable ",
    );

    if (!order) {
      return res
        .status(403)
        .json({ message: "Couldn't find Order", success: false });
    }
    // Filter only items that belong to this seller
    const sellerItems = order.items.filter(
      (item) => item.sellerId.toString() === userId.toString(),
    );
    if (sellerItems.length === 0) {
      return res.status(403).json({
        message: "You do not have any items in this order",
        success: false,
      });
    }
    console.log(sellerItems);
    // Update item status and check stock
    for (const item of sellerItems) {
      const product = item.productId;
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for product "${item.name}"`,
          success: false,
        });
      }

      // Reduce product stock
      product.stock -= item.quantity;
      if (product.stock <= 0) product.isAvailable = false;
      await product.save();
      item.itemStatus = "Confirmed";
    }
    // If all items confirmed by all sellers, update global order status
    const allConfirmed = order.items.every((i) => i.itemStatus === "Confirmed");
    if (allConfirmed) {
      order.orderStatus = "Confirmed";
    }

    await order.save({ validateBeforeSave: false });

    return res.status(200).json({
      message: "Ordered Confirmed Successfully",
      success: true,
      order,
    });
  } catch (error) {
    console.error("Something went wrong!", error.message);
    return res.status(500).json({
      message: "Server Error! while confirming order",
      success: false,
    });
  }
};

// get the details of the order
export const viewOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
      .populate("userId", "name email")
      .populate("items.productId", "name price");

    if (!order) {
      res.status(404).json({ message: "didn't found the order" });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error(
      `Error in controller orderController viewOrderDetails`,
      error,
    );
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getOrderStatus = async (req, res) => {
  try {
  } catch (error) {}
};

export const setOrderStatus = async (req, res) => {
  try {
  } catch (error) {}
};

export const confirmOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }
    const order = await Order.findById(orderId).populate(
      "items.productId",
      "stock isAvailable ",
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    // Check if the order is already confirmed
    if (order.orderStatus === "Confirmed") {
      return res.status(400).json({ message: "Order is already confirmed" });
    }
    // Check stock for each item in the order
    for (const item of order.items) {
      const product = item.productId;
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for product ${item.name}`,
          success: false,
        });
      }
    }
    // Reduce stock for each item and mark as confirmed
    for (const item of order.items) {
      const product = item.productId;
      product.stock -= item.quantity;
      if (product.stock <= 0) product.isAvailable = false;
      await product.save();
    }
    order.orderStatus = "Confirmed";
    await order.save({ validateBeforeSave: false });
    return res.status(200).json({
      message: "Order confirmed successfully",
      success: true,
      order,
    });
  } catch (error) {
    console.error("Something went wrong!", error.message);
    return res.status(500).json({
      message: "Server Error! while confirming order",
      success: false,
    });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    const order = await Order.findById(orderId).populate(
      "items.productId",
      "stock isAvailable",
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    //  Already cancelled
    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({ message: "Order is already cancelled" });
    }

    //  Optional: prevent cancel after confirmed
    if (order.orderStatus === "Confirmed") {
      return res.status(400).json({
        message: "Confirmed orders cannot be cancelled",
      });
    }

    //  Restore stock
    for (let item of order.items) {
      const product = item.productId;

      if (product) {
        product.stock += item.quantity;

        // If stock > 0 → make available
        if (product.stock > 0) {
          product.isAvailable = true;
        }

        await product.save();
      }
    }

    //  Update order status
    order.orderStatus = "Cancelled";
    await order.save();

    return res.status(200).json({
      message: "Order cancelled successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
