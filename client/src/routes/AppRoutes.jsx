import App from "@/App";
import Layout from "@/component/Layout";
import Login from "@/pages/login";
import Signup from "@/pages/Signup";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<App />}></Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
