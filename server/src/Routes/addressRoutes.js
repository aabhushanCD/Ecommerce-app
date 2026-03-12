import express from "express";
import {
  addAddress,
  deleteAddress,
  getAddress,
  updateAddress,
} from "../Controllers/addressController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.get("/", verifyToken, getAddress);

router.post("/", verifyToken, addAddress);

router.put("/:addressId", verifyToken, updateAddress);

router.delete("/:addressId", verifyToken, deleteAddress);

export default router;
