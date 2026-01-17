import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BarChart3,
  DollarSign,
  Package,
  ShoppingBag,
  Star,
  TrendingUp,
} from "lucide-react";
import React from "react";

const SellerAsideNav = ({ activeTab, setActiveTab }) => {
  return (
    <>
      <aside className="col-span-12 lg:col-span-3">
        <Card className="p-5 shadow-xl border-0 bg-white/90 backdrop-blur-sm sticky top-24">
          <nav className="space-y-2">
            <SidebarItem
              icon={<BarChart3 size={20} />}
              text="Dashboard"
              active={activeTab === "Dashboard"}
              onClick={() => setActiveTab("Dashboard")}
            />
            <SidebarItem
              icon={<Package size={20} />}
              text="My Products"
              badge="24"
              active={activeTab === "Products"}
              onClick={() => setActiveTab("Products")}
            />
            <SidebarItem
              icon={<ShoppingBag size={20} />}
              text="Orders"
              badge="12"
              active={activeTab === "Orders"}
              onClick={() => setActiveTab("Orders")}
            />
            <SidebarItem
              icon={<TrendingUp size={20} />}
              text="Analytics"
              active={activeTab === "Analytics"}
              onClick={() => setActiveTab("Analytics")}
            />
            <SidebarItem
              icon={<DollarSign size={20} />}
              text="Earnings"
              active={activeTab === "Earnings"}
              onClick={() => setActiveTab("Earnings")}
            />
            <SidebarItem
              icon={<Star size={20} />}
              text="Reviews"
              active={activeTab === "Reviews"}
              onClick={() => setActiveTab("Reviews")}
            />
          </nav>

          <div className="mt-6 p-4 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-600 text-white">
            <h4 className="font-semibold mb-2">🎉 Pro Tip</h4>
            <p className="text-sm opacity-90 mb-3">
              Products with clear images sell 3x faster!
            </p>
            <Button
              size="sm"
              className="w-full bg-white text-violet-600 hover:bg-gray-50"
            >
              Learn More
            </Button>
          </div>
        </Card>
      </aside>
    </>
  );
};

export default SellerAsideNav;

const SidebarItem = ({ icon, text, badge, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 ${
      active
        ? "bg-linear-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg scale-105"
        : "hover:bg-gray-100 text-gray-700 hover:scale-102"
    }`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className="font-medium">{text}</span>
    </div>
    {badge && (
      <span
        className={`text-xs px-2 py-1 rounded-full font-medium ${
          active ? "bg-white/20" : "bg-violet-100 text-violet-600"
        }`}
      >
        {badge}
      </span>
    )}
  </div>
);
