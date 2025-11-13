import express from "express";
import {
  getOrders,
  getOrderStatus,
  placedOrder,
  sellerConfirmedOrder,
  setOrderStatus,
} from "../Controllers/orderController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("order/placedOrder", verifyToken, placedOrder);

router.get("order/view", verifyToken, getOrders);

router.post("order/confirmed/by/seller", verifyToken, sellerConfirmedOrder);

router.get("order/view/status", verifyToken, getOrderStatus);

router.put("order/set/status", verifyToken, setOrderStatus);

export default router;
