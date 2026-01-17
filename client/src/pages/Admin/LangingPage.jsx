import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  PlusCircle,
  TrendingUp,
  ArrowUp,
  DollarSign,
  Clock,
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 4000, orders: 120 },
  { month: "Feb", revenue: 3000, orders: 98 },
  { month: "Mar", revenue: 5000, orders: 156 },
  { month: "Apr", revenue: 7000, orders: 203 },
  { month: "May", revenue: 6000, orders: 187 },
  { month: "Jun", revenue: 8000, orders: 245 },
];

const AdminLanding = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

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
            </nav>
          </Card>
        </aside>

        {/* Main Content */}
        <section className="col-span-12 md:col-span-9 lg:col-span-10 space-y-6">
          {/* Header */}
          <Card className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Monitor sales, users, and platform activity
              </p>
            </div>
            <div className="flex gap-3 mt-4 sm:mt-0">
              <Button className="flex items-center gap-2 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <PlusCircle size={18} /> Add Category
              </Button>
              <Button className="flex items-center gap-2 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <PlusCircle size={18} /> Add Product
              </Button>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Revenue"
              value="$52,430"
              change="+12.5%"
              icon={<DollarSign />}
              gradient="from-emerald-500 to-teal-600"
            />
            <StatCard
              title="Orders"
              value="1,482"
              change="+8.2%"
              icon={<ShoppingCart />}
              gradient="from-blue-500 to-indigo-600"
            />
            <StatCard
              title="Products"
              value="328"
              change="+4.1%"
              icon={<Package />}
              gradient="from-purple-500 to-pink-600"
            />
            <StatCard
              title="Users"
              value="894"
              change="+15.3%"
              icon={<Users />}
              gradient="from-orange-500 to-red-600"
            />
          </div>

          {/* Revenue Chart */}
          <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  Revenue Overview
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Monthly performance tracking
                </p>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                <TrendingUp size={16} />
                <span className="text-sm font-medium">+23.4%</span>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart
                  data={revenueData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#94a3b8" />
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
                    dataKey="revenue"
                    stroke="#6366f1"
                    strokeWidth={3}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <Card className="lg:col-span-2 p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-gray-800">
                  Recent Orders
                </h3>
                <Button
                  variant="ghost"
                  className="text-indigo-600 hover:text-indigo-700 text-sm"
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <OrderItem
                  id="#10231"
                  user="John Doe"
                  amount="$120"
                  status="Paid"
                  time="2 min ago"
                />
                <OrderItem
                  id="#10232"
                  user="Jane Smith"
                  amount="$89"
                  status="Pending"
                  time="15 min ago"
                />
                <OrderItem
                  id="#10233"
                  user="Alex Ray"
                  amount="$45"
                  status="Cancelled"
                  time="1 hour ago"
                />
                <OrderItem
                  id="#10234"
                  user="Maria Garcia"
                  amount="$200"
                  status="Paid"
                  time="2 hours ago"
                />
              </CardContent>
            </Card>

            {/* Quick Insights */}
            <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="mb-4">
                <h3 className="font-semibold text-lg text-gray-800">
                  Quick Insights
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <Insight
                  icon="🔥"
                  text="Best selling category"
                  value="Electronics"
                  color="text-orange-600"
                />
                <Insight
                  icon="⚠️"
                  text="Products low in stock"
                  value="12 items"
                  color="text-amber-600"
                />
                <Insight
                  icon="📦"
                  text="Pending approvals"
                  value="5 sellers"
                  color="text-blue-600"
                />
                <Insight
                  icon="⭐"
                  text="Average rating"
                  value="4.8/5.0"
                  color="text-yellow-600"
                />
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
};

const SidebarItem = ({ icon, text, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
      active
        ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-md"
        : "hover:bg-gray-100 text-gray-700"
    }`}
  >
    {icon}
    {text}
  </div>
);

const StatCard = ({ title, value, change, icon, gradient }) => (
  <Card className="flex justify-between items-center p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold mt-2 text-gray-800">{value}</h3>
      <div className="flex items-center gap-1 mt-2 text-emerald-600">
        <ArrowUp size={14} />
        <span className="text-xs font-medium">{change}</span>
      </div>
    </div>
    <div
      className={`p-4 rounded-xl bg-linear-to-br ${gradient} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
    >
      {icon}
    </div>
  </Card>
);

const OrderItem = ({ id, user, amount, status, time }) => {
  const statusColor = {
    Paid: "text-emerald-600 bg-emerald-50",
    Pending: "text-amber-600 bg-amber-50",
    Cancelled: "text-red-600 bg-red-50",
  };

  return (
    <div className="flex justify-between items-center py-4 border-b last:border-b-0 text-sm hover:bg-gray-50 rounded-lg px-2 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
          {user
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <p className="font-medium text-gray-800">{id}</p>
          <p className="text-gray-500 text-xs">{user}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-800">{amount}</p>
        <div className="flex items-center gap-2 justify-end mt-1">
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[status]}`}
          >
            {status}
          </span>
          <div className="flex items-center gap-1 text-gray-400">
            <Clock size={10} />
            <span className="text-xs">{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Insight = ({ icon, text, value, color }) => (
  <div className="p-3 rounded-lg bg-linear-to-r from-gray-50 to-gray-100 text-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span className="text-gray-600">{text}</span>
      </div>
      <span className={`font-semibold ${color}`}>{value}</span>
    </div>
  </div>
);

export default AdminLanding;
