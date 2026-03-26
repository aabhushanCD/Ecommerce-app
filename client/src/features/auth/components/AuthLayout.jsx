import React from "react";
import { Outlet } from "react-router-dom";
import { Card } from "./Card";
const AuthLayout = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="rounded-3xl p-10 w-md">
        <Outlet />
      </Card>
    </div>
  );
};

export default AuthLayout;
