import Cart from "../Models/cart.model.js";
import Product from "../Models/product.model.js";
import Order from "../Models/order.model.js";
import User from "../Models/User.model.js";



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

export const sellerConfirmedOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const userId = req.userId;
    const role = req.role;

    if (role !== "Seller") {
      return res.status(403).json({ message: "UnAuthorized", success: false });
    }
    const order = await Order.findById(orderId).populate(
      "items.productId",
      "stock isAvailable "
    );

    if (!order) {
      return res
        .status(403)
        .json({ message: "Couldn't find Order", success: false });
    }
    // Filter only items that belong to this seller
    const sellerItems = order.items.filter(
      (item) => item.sellerId.toString() === userId.toString()
    );
    if (sellerItems.length === 0) {
      return res.status(403).json({
        message: "You do not have any items in this order",
        success: false,
      });
    }
    // Update item status and check stock
    for (const item of sellerItems) {
      const product = item.productId;
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for product ${item.name}`,
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

export const getOrderStatus = async (req, res) => {
  try {
  } catch (error) {}
};

export const setOrderStatus = async (req, res) => {
  try {
  } catch (error) {}
};


