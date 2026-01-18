import React, { useState } from "react";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import SidebarItem from "./SidebarItems";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/Store/store";

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const { logOut } = useAuth();
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="grid grid-cols-12 gap-6 max-w-8xl mx-auto">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-2">
          <Card className="p-5 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex items-center gap-2 text-xl font-bold mb-6 bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              <LayoutDashboard size={22} className="text-indigo-600" />
              Admin
            </CardHeader>
            <nav className="space-y-2 text-sm font-medium">
              <SidebarItem
                icon={<LayoutDashboard size={18} />}
                text="Dashboard"
                active={activeTab === "Dashboard"}
                onClick={() => setActiveTab("Dashboard")}
              />
              <SidebarItem
                icon={<ShoppingCart size={18} />}
                text="Orders"
                active={activeTab === "Orders"}
                onClick={() => setActiveTab("Orders")}
              />
              <SidebarItem
                icon={<Package size={18} />}
                text="Products"
                active={activeTab === "Products"}
                onClick={() => setActiveTab("Products")}
              />
              <SidebarItem
                icon={<Users size={18} />}
                text="Users"
                active={activeTab === "Users"}
                onClick={() => setActiveTab("Users")}
              />
              <SidebarItem
                icon={<Users size={18} />}
                text="Logout"
                active={activeTab === "Logout"}
                onClick={async () => {
                  setActiveTab("Logout");
                  await logOut();
                }}
              />
            </nav>
          </Card>
        </aside>
        <Outlet />
      </div>
    </main>
  );
};

export default AdminLayout;
