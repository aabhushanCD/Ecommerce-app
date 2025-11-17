import App from "@/App";
import Layout from "@/component/Layout";
import Login from "@/pages/login";
import Signup from "@/pages/Signup";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import { useAuth } from "@/Store/store";
import PublicRoute from "./PublicRoute";
import ProductAdd from "@/pages/Seller/ProductAdd";
import ProfileUpdate from "@/pages/ProfileUpdate";
import ViewAllProducts from "@/pages/Seller/ViewAllProducts";

const AppRoutes = () => {
  const { currentUser } = useAuth();
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
        <Route path="/viewAllProducts" element={<ViewAllProducts />} />
        <Route path="/profile" element={<ProfileUpdate />} />
        <Route path="/add-product" element={<ProductAdd />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
