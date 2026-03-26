import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "@/App";
import Layout from "@/components/Layout";
import ProfileUpdate from "@/components/ProfileUpdate";

import Login from "@/features/auth/login";
import Signup from "@/features/auth/Signup";

import ProtectedRoute from "./protectedRoute";
import PublicRoute from "./PublicRoute";

import ProductDetailsContainer from "@/features/product/components/Customer/ProductDetailsContainer";
import Checkout from "@/features/checkout/components/CheckoutItems";
import SellerMyProducts from "@/features/product/components/Vendor/Products";

import SellerDashboard from "@/pages/Seller/Dashboard";
import Orders from "@/features/order/Orders";

import AdminLayout from "@/pages/Admin/components/AdminLayout";
import AdminLanding from "@/pages/Admin/LangingPage";
import AddCategories from "@/pages/Admin/components/categories";
import Cart from "@/features/cart/cart";
import SellerLayout from "@/pages/Seller/components/SellerLayout";
import AuthLayout from "@/features/auth/components/AuthLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= Customer / Common Protected Routes ================= */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["customer", "admin", "seller"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<App />} />
        </Route>

        <Route
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/product/:id" element={<ProductDetailsContainer />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        {/* ================= Public Routes ================= */}
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* ================= Seller Routes ================= */}
        <Route
          path="/seller"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <SellerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" index element={<SellerDashboard />} />
          <Route path="profile" element={<ProfileUpdate />} />
          <Route path="products" element={<SellerMyProducts />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        {/* ================= Admin Routes ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminLanding />} />
          <Route path="addCategory" element={<AddCategories />} />
        </Route>

        {/* ================= 404 ================= */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen text-4xl font-bold">
              404 - Page Not Found !
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
