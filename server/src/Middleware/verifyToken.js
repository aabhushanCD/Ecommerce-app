import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
export const verifyToken = (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "UnAuthorized" });
    }
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    // Invalid token (tampered signature or corrupted)
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    // Any other error
    return res.status(500).json({ message: "Token verification failed" });
  }
};
