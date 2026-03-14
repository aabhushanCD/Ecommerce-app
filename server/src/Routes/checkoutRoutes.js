import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { buyNow, placedOrder } from "../Controllers/checkoutController.js";

const router = express.Router();

router.post("/placedOrder", verifyToken, placedOrder);
router.post("/buyNow", verifyToken, buyNow);

export default router;
