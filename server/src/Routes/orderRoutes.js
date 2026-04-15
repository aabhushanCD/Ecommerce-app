import express from "express";
import {
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

router.post("confirmed/by/seller", verifyToken, sellerConfirmedOrder);

router.get("view/status", verifyToken, getOrderStatus);

router.put("set/status", verifyToken, setOrderStatus);

export default router;
