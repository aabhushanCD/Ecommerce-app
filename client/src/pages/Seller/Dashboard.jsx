import React, { useState } from "react";
import {
  Package,
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Eye,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  Image,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatCard from "./components/StatCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import ProductAdd from "@/features/product/components/Vendor/ProductAdd";

const salesData = [
  { day: "Mon", sales: 2400, views: 4000 },
  { day: "Tue", sales: 1398, views: 3000 },
  { day: "Wed", sales: 3800, views: 5200 },
  { day: "Thu", sales: 3908, views: 4800 },
  { day: "Fri", sales: 4800, views: 6100 },
  { day: "Sat", sales: 3800, views: 5900 },
  { day: "Sun", sales: 4300, views: 5400 },
];

const SellerDashboard = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);

  return (
    <section className="col-span-12 lg:col-span-9 space-y-6">
      {/* Quick Action Banner */}
      <Card className="p-6 shadow-xl border-0 bg-linear-to-r from-violet-600 to-fuchsia-600 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Ready to grow your business?
            </h2>
            <p className="text-white/90">
              Add new products and reach more customers today
            </p>
          </div>
          <Button
            onClick={() => setShowAddProduct(!showAddProduct)}
            size="lg"
            className="bg-white text-violet-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Plus size={20} className="mr-2" />
            Add Product
          </Button> 
        </div>
      </Card>

      {/* Add Product Form */}

      <ProductAdd
        showAddProduct={showAddProduct}
        setShowAddProduct={setShowAddProduct}
      />

      Stats Grid
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Sales"
          value="Rs. 12,426"
          change="+18.2%"
          icon={<DollarSign />}
          linear="from-emerald-500 to-teal-600"
        />
        <StatCard
          title="Products"
          value="24"
          change="+3 new"
          icon={<Package />}
          linear="from-violet-500 to-purple-600"
        />
        <StatCard
          title="Orders"
          value="142"
          change="+12.5%"
          icon={<ShoppingBag />}
          linear="from-blue-500 to-cyan-600"
        />
        <StatCard
          title="Views"
          value="8,234"
          change="+24.8%"
          icon={<Eye />}
          linear="from-orange-500 to-pink-600"
        />
      </div> */}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card className="p-6 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                Weekly Sales
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Last 7 days performance
              </p>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              <TrendingUp size={16} />
              <span className="text-sm font-medium">+18%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={salesData}>
              <defs>
                <linearlinear id="saleslinear" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearlinear>
              </defs>
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#8b5cf6"
                strokeWidth={3}
                fill="url(#saleslinear)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Views Chart */}
        <Card className="p-6 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                Product Views
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Weekly traffic overview
              </p>
            </div>
            <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              <Eye size={16} />
              <span className="text-sm font-medium">8.2K</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={salesData}>
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar dataKey="views" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Products & Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Products */}
        <Card className="lg:col-span-2 p-6 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg text-gray-800">
              Your Products
            </h3>
            <Button
              variant="ghost"
              className="text-violet-600 hover:text-violet-700 text-sm"
            >
              Manage All
            </Button>
          </div>
          <div className="space-y-3">
            <ProductItem
              name="Wireless Headphones"
              category="Electronics"
              price="Rs.89.99"
              stock={45}
              status="Active"
            />
            <ProductItem
              name="Cotton T-Shirt"
              category="Fashion"
              price="Rs.24.99"
              stock={8}
              status="Active"
            />
            <ProductItem
              name="Smart Watch Pro"
              category="Electronics"
              price="Rs.299.99"
              stock={0}
              status="Out of Stock"
            />
            <ProductItem
              name="Leather Wallet"
              category="Accessories"
              price="Rs.49.99"
              stock={23}
              status="Active"
            />
          </div>
        </Card>

        {/* Quick Stats */}
        <Card className="p-6 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <h3 className="font-semibold text-lg text-gray-800 mb-6">
            Quick Stats
          </h3>
          <div className="space-y-4">
            <QuickStat
              icon={<CheckCircle2 className="text-emerald-600" size={20} />}
              label="Completed Orders"
              value="128"
            />
            <QuickStat
              icon={<Clock className="text-amber-600" size={20} />}
              label="Pending Orders"
              value="12"
            />
            <QuickStat
              icon={<AlertCircle className="text-red-600" size={20} />}
              label="Low Stock Items"
              value="3"
            />
            <QuickStat
              icon={<Star className="text-yellow-600" size={20} />}
              label="Avg. Rating"
              value="4.8"
            />
            <QuickStat
              icon={<TrendingUp className="text-blue-600" size={20} />}
              label="Growth Rate"
              value="+18%"
            />
          </div>
        </Card>
      </div>
    </section>
  );
};

const ProductItem = ({ name, category, price, stock, status }) => {
  const statusColor =
    status === "Active"
      ? "text-emerald-600 bg-emerald-50"
      : "text-red-600 bg-red-50";

  return (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-linear-to-br from-violet-400 to-fuchsia-500 flex items-center justify-center">
          <Image className="text-white" size={20} />
        </div>
        <div>
          <p className="font-semibold text-gray-800">{name}</p>
          <p className="text-xs text-gray-500">{category}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-gray-800">{price}</p>
        <div className="flex items-center gap-2 justify-end mt-1">
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor}`}
          >
            {status}
          </span>
          <span className="text-xs text-gray-500">Stock: {stock}</span>
        </div>
      </div>
    </div>
  );
};

const QuickStat = ({ icon, label, value }) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-linear-to-r from-gray-50 to-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-sm text-gray-600">{label}</span>
    </div>
    <span className="font-bold text-gray-800">{value}</span>
  </div>
);

export default SellerDashboard;
