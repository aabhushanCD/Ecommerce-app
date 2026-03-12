import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import { ThemeProvider } from "./ThemeProvider";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="sticky top-0    w-full z-500">
          <Header />
        </div>
        <main className="min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Layout;
