import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
  addCategories,
  removeCategories,
  updateCategories,
  viewCategories,
} from "../Controllers/categoriesController";

const router = express.Router();

router.post("categories/add", verifyToken, addCategories);

router.get("categories/view", verifyToken, viewCategories);

router.put("categories/update", verifyToken, updateCategories);

router.delete("/categories/remove", verifyToken, removeCategories);

export default router;
