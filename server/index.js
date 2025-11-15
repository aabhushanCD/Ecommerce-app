import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import auth from "./src/Routes/authRoutes.js";
import { ConnectDB } from "./src/DB/ConnectDb.js";
import cartRoute from "./src/Routes/cartRoute.js";
import categoriesRoutes from "./src/Routes/categoriesRoutes.js";
import orderRoutes from "./src/Routes/orderRoutes.js";
import productRoutes from "./src/Routes/productRoute.js";
import sellerRoutes from "./src/Routes/sellerRoutes.js";
import wishlistRoutes from "./src/Routes/wishlistRoutes.js";

const allowedOrigins = [process.env.CLIENT_URL_1];
const app = express();
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman or curl)

      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", auth);
app.use("/api/cart", cartRoute);
app.use("/api/categories", categoriesRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/product", productRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/wishlist", wishlistRoutes);

const PORT = process.env.PORT || 8080;
ConnectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to database", err);
    process.exit(1);
  });
