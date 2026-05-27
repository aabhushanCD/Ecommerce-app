import express from "express";
import passport from "../Config/passport.js";
import {
  Login,
  Register,
  LogOut,
  profileUpdate,
  authUser,
  sendPassResetMail,
  resetPass,
  googleLoginToken,
} from "../Controllers/authController.js";
import upload from "../middleware/multer.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Google OAuth routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),googleLoginToken
);

// Auth routes
router.post("/login", Login);
router.post("/register", Register);
router.post("/logout", verifyToken, LogOut);
router.get("/me", verifyToken, authUser);
router.post("/sendPassResetMail", sendPassResetMail);
router.post("/reset/:id/:token", resetPass);
router.put("/updateProfile", verifyToken, upload.single("file"), profileUpdate);

export default router;
