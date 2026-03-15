import { Bell, Search, Settings, Store } from "lucide-react";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SellerAsideNav from "./SellerAsideNav";

const SellerLayout = () => {
  const [activeTab, setActiveTab] = useState("/seller");

  return (
    <main className="min-h-screen bg-linear-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <div className="max-w-8xl mx-auto ">
        <div className="grid grid-cols-12 ">
          {/* Sidebar */}
          <SellerAsideNav activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="col-span-12 lg:col-span-9">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SellerLayout;
