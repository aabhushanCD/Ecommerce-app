import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  updateProductImage,
} from "../Controllers/productController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("add/product", verifyToken, addProduct);
router.put("update/product/", verifyToken, upload.array("files"), addProduct);
router.put("update/product/:productId", verifyToken, updateProduct);
router.put(
  "update/product/image/:productId",
  verifyToken,
  upload.array("files"),
  updateProductImage
);
// router.get(
//   "view/?category/?flash/?page & ?limit/?search/?sort",
//   verifyToken,
//   getProducts
// );
router.delete("remove/product/:productId", verifyToken, deleteProduct);

export default router;
