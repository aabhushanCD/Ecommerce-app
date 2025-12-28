import React, { useState } from "react";
import {
  Store,
  Package,
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Eye,
  Plus,
  BarChart3,
  Settings,
  Bell,
  Search,
  Upload,
 
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  Image,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [showAddProduct, setShowAddProduct] = useState(false);

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

          {/* Main Content */}
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
            {showAddProduct && (
              <Card className="p-6 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-6 text-gray-800">
                  Add New Product
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter product name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                      <option>Select category</option>
                      <option>Electronics</option>
                      <option>Fashion</option>
                      <option>Home & Garden</option>
                      <option>Sports</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SKU
                    </label>
                    <input
                      type="text"
                      placeholder="Product SKU"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows="4"
                      placeholder="Describe your product..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                    ></textarea>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Images
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-violet-500 transition-colors cursor-pointer bg-gray-50/50">
                      <Upload
                        className="mx-auto mb-3 text-gray-400"
                        size={40}
                      />
                      <p className="text-gray-600 mb-1">
                        <span className="text-violet-600 font-medium">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button className="flex-1 bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-md hover:shadow-lg transition-all">
                    Publish Product
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowAddProduct(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </Card>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Sales"
                value="$12,426"
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
            </div>

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
                      <linearlinear
                        id="saleslinear"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8b5cf6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8b5cf6"
                          stopOpacity={0}
                        />
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
                    price="$89.99"
                    stock={45}
                    status="Active"
                  />
                  <ProductItem
                    name="Cotton T-Shirt"
                    category="Fashion"
                    price="$24.99"
                    stock={8}
                    status="Active"
                  />
                  <ProductItem
                    name="Smart Watch Pro"
                    category="Electronics"
                    price="$299.99"
                    stock={0}
                    status="Out of Stock"
                  />
                  <ProductItem
                    name="Leather Wallet"
                    category="Accessories"
                    price="$49.99"
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
                    icon={
                      <CheckCircle2 className="text-emerald-600" size={20} />
                    }
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
        </div>
      </div>
    </main>
  );
};

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

const StatCard = ({ title, value, change, icon, linear }) => (
  <Card className="p-6 shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group">
    <div className="flex justify-between items-start mb-4">
      <div
        className={`p-3 rounded-xl bg-linear-to-br ${linear} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
    <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
      <TrendingUp size={14} />
      {change}
    </div>
  </Card>
);

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
