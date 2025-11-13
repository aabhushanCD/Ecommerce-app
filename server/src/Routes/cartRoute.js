import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addToCart,
  removeFromCart,
  viewCart,
} from "../Controllers/cartController.js";
const router = express.Router();

router.post("add/product", verifyToken, addToCart);
router.delete("remove/product", verifyToken, removeFromCart);
router.get("view/product", verifyToken, viewCart);

export default router;
