import App from "@/App";
import Layout from "@/components/Layout";
import Login from "@/pages/Public/login";
import Signup from "@/pages/Public/Signup";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";

import PublicRoute from "./PublicRoute";
import ProductAdd from "@/pages/Seller/ProductAdd";
import ProfileUpdate from "@/components/ProfileUpdate";
import ViewAllProducts from "@/pages/Seller/ViewAllProducts";
import AddCategories from "@/pages/Admin/components/categories";

import AdminLanding from "@/pages/Admin/LangingPage";
import SellerDashboard from "@/pages/Seller/sellerLandingPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["customer", "admin", "seller"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<App />}></Route>
        </Route>

        <Route
          path="*"
          element={
            <div className="flex justify-center items-center min-h-screen text-4xl font-bold">
              404 - Page Not Found !
            </div>
          }
        />
        {/*______________________________ public Routes___________________ */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        {/*____________________- Seller_____________________________ */}
        <Route
          path="/seller"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SellerDashboard />} />
          <Route path="viewAllProducts" element={<ViewAllProducts />} />
          <Route path="profile" element={<ProfileUpdate />} />
          <Route path="add-product" element={<ProductAdd />} />
        </Route>
        {/*____________________ Admin___________________________ */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminLanding />} />
          <Route path="addCategory" element={<AddCategories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
