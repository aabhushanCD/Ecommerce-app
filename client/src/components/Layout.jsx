import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./ThemeProvider";

const Layout = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="sticky top-0   w-full z-50">
          <Header />
        </div>

        <Outlet />

        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Layout;
