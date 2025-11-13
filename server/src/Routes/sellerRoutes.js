import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  applyAsSeller,
  getAllSellers,
  getMySellerInfo,
  getSellerById,
  updateMySellerInfo,
  verifySeller,
} from "../Controllers/sellerController.js";

const router = express.Router();

router.post("apply/as-seller", verifyToken, applyAsSeller);

router.get("seller/info", verifyToken, getMySellerInfo);

router.put("update/profile", verifyToken, updateMySellerInfo);

router.get("view/all/sellers", verifyToken, getAllSellers);

router.get("verify/:sellerId", verifyToken, verifySeller);

router.get("view/:sellerId", verifyToken, getSellerById);

export default router;
