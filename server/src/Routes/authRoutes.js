import express from "express";
import {
  Login,
  Register,
  LogOut,
  profileUpdate,
  authUser,
  sendPassResetMail,
  resetPass,
} from "../Controllers/authController.js";
import upload from "../middleware/multer.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// ________________________api/auth____________________
router.post("/login", Login);
router.post("/register", Register);
router.post("/logout", verifyToken, LogOut);

router.get("/me", verifyToken, authUser);

router.post("/sendPassResetMail", sendPassResetMail);
router.post("/reset/:id/:token", resetPass);

// -------------profile-----------------------

router.put("/updateProfile", verifyToken, upload.single("file"), profileUpdate);

export default router;
