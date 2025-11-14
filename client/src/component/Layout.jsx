import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="fixed top-0  left-0 w-full z-50">
        <Header />
      </div>

      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
