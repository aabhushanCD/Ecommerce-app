import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProductImage,
} from "../Controllers/productController.js";

const router = express.Router();

router.post("add/product", verifyToken, addProduct);
router.put("update/product", verifyToken, addProduct);
router.put("update/product/image", verifyToken, updateProductImage);
router.get("view/product", verifyToken, getProducts);
router.delete("remove/product", verifyToken, deleteProduct);

export default router;