import { Bell, Search, Settings, Store } from "lucide-react";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SellerAsideNav from "./SellerAsideNav";

const SellerLayout = () => {
  const [activeTab, setActiveTab] = useState("/seller");

  return (
    <main className="min-h-screen bg-linear-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      {/* Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-8xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg">
                <Store className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-linear-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  My Store
                </h1>
                <p className="text-xs text-gray-500">Seller Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50"
                />
              </div>
              <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Settings size={20} className="text-gray-600" />
              </button>
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white font-semibold shadow-md">
                JD
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-8xl mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">
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
