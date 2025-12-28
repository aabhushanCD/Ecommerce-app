import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./adminComponents/AdminHeader";
import { ThemeProvider } from "@/component/ThemeProvider";

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <Outlet />
      <div>footer</div>
    </>
  );
};

export default AdminLayout;
