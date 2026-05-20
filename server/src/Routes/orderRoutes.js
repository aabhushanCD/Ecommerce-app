import express from "express";
import {
  cancelOrder,
  getOrders,
  getOrderStatus,
  sellerConfirmedOrder,
  setOrderStatus,
  viewOrderDetails,
} from "../Controllers/orderController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/get/all", verifyToken, getOrders);

router.get("/get/orderId/:orderId", verifyToken, viewOrderDetails);

router.put("/confirmed/by/seller/:orderId", verifyToken, sellerConfirmedOrder);
router.put("/cancel/by/seller/:orderId", verifyToken, cancelOrder);

router.get("view/status", verifyToken, getOrderStatus);

router.put("set/status", verifyToken, setOrderStatus);

export default router;
