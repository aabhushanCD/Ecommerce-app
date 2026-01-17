import App from "@/App";
import Layout from "@/components/Layout";
import Login from "@/pages/login";
import Signup from "@/pages/Signup";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";

import PublicRoute from "./PublicRoute";
import ProductAdd from "@/pages/Seller/ProductAdd";
import ProfileUpdate from "@/pages/ProfileUpdate";
import ViewAllProducts from "@/pages/Seller/ViewAllProducts";
import AddCategories from "@/pages/Admin/categories";

import AdminLanding from "@/pages/Admin/adminLangingPage";
import SellerDashboard from "@/pages/Seller/sellerLandingPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          ></Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />}></Route>

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
        <Route path="/seller" element={<SellerDashboard />}>
          <Route path="viewAllProducts" element={<ViewAllProducts />} />
          <Route path="profile" element={<ProfileUpdate />} />
          <Route path="add-product" element={<ProductAdd />} />
        </Route>
        {/*____________________ Admin___________________________ */}
        <Route path="/admin" element={<AdminLanding />}>
          <Route path="addCategory" element={<AddCategories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
