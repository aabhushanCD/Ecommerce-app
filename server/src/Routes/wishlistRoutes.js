import express from "express";
import {
  clearWishlist,
  toggleWishlist,
  viewWishlist,
} from "../Controllers/wishlistController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("toggleWishlist/:productId", verifyToken, toggleWishlist);

router.get("viewWishlist", verifyToken, viewWishlist);

router.delete("clearWishlist", verifyToken, clearWishlist);

export default router;
