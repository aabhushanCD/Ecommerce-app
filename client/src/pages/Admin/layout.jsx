import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./adminComponents/AdminHeader";

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
