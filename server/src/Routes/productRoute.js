import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addProduct,
  deleteProduct,
  getProductDetails,
  getProducts,
  myProduct,
  updateProduct,
  updateProductImage,
} from "../Controllers/productController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/add-product", verifyToken, upload.array("images"), addProduct);
router.put("/update/product/", verifyToken, upload.array("files"), addProduct);
router.put("/update/product/:productId", verifyToken, updateProduct);
router.put(
  "update/product/image/:productId",
  verifyToken,
  upload.array("files"),
  updateProductImage,
);
router.get("/view", verifyToken, getProducts);

router.get("/productId/:productId", getProductDetails);

// seller products
router.delete("/remove/:productId", verifyToken, deleteProduct);
router.get("/myProducts", verifyToken, myProduct);
export default router;
