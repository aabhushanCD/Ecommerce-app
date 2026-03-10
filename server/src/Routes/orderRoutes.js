import express from "express";
import {
  getOrders,
  getOrderStatus,
  sellerConfirmedOrder,
  setOrderStatus,
} from "../Controllers/orderController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/view", verifyToken, getOrders);

router.post("confirmed/by/seller", verifyToken, sellerConfirmedOrder);

router.get("view/status", verifyToken, getOrderStatus);

router.put("set/status", verifyToken, setOrderStatus);

export default router;
