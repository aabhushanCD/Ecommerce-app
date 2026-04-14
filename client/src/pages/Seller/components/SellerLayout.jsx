import { Bell, Menu, MenuSquareIcon, Search, Settings, Store, X } from "lucide-react";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SellerAsideNav from "./SellerAsideNav";

const SellerLayout = () => {
  const [activeTab, setActiveTab] = useState("/seller");
  const [menuView, setMenuView] = useState(true);

  return (
    <main className="min-h-screen bg-linear-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <div className="max-w-8xl mx-auto relative ">
        <button
          className="lg:hidden p-2 absolute z-50"
          onClick={() => setMenuView(!menuView)}
        >
          {!menuView ? <X /> : <Menu className="text-white" />}
        </button>
        <div className="grid grid-cols-1 md:grid-cols-12  ">
          {/* Sidebar */}

          <div
            className={`${menuView ? "hidden" : "block"} md:block md:col-span-3`}
          >
            <SellerAsideNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className="col-span-1 md:col-span-9">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SellerLayout;
