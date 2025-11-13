import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
  addCategories,
  removeCategories,
  updateCategories,
  viewCategories,
} from "../Controllers/categoriesController";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post(
  "categories/add/:parentId",
  verifyToken,
  upload.single("file"),
  addCategories
);

router.get("categories/view", verifyToken, viewCategories);

router.put(
  "categories/update/:id",
  verifyToken,
  upload.single(file),
  updateCategories
);

router.delete("categories/remove/:id", verifyToken, removeCategories);

export default router;
