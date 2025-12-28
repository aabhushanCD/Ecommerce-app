import React from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  PlusCircle,
  TrendingUp,
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 7000 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 8000 },
];

const AdminLanding = () => {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-2">
          <Card className="p-5">
            <CardHeader className="flex items-center gap-2 text-xl font-bold mb-6">
              <LayoutDashboard size={22} />
              Admin
            </CardHeader>
            <nav className="space-y-3 text-sm font-medium">
              <SidebarItem
                icon={<LayoutDashboard size={18} />}
                text="Dashboard"
              />
              <SidebarItem icon={<ShoppingCart size={18} />} text="Orders" />
              <SidebarItem icon={<Package size={18} />} text="Products" />
              <SidebarItem icon={<Users size={18} />} text="Users" />
            </nav>
          </Card>
        </aside>

        {/* Main Content */}
        <section className="col-span-12 md:col-span-9 lg:col-span-10 space-y-6">
          {/* Header */}
          <Card className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">
                Monitor sales, users, and platform activity
              </p>
            </div>
            <div className="flex gap-3 mt-4 sm:mt-0">
              <Button variant="default" className="flex items-center gap-2">
                <PlusCircle size={18} /> Add Category
              </Button>
              <Button variant="default" className="flex items-center gap-2">
                <PlusCircle size={18} /> Add Product
              </Button>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Revenue"
              value="$52,430"
              icon={<TrendingUp />}
            />
            <StatCard title="Orders" value="1,482" icon={<ShoppingCart />} />
            <StatCard title="Products" value="328" icon={<Package />} />
            <StatCard title="Users" value="894" icon={<Users />} />
          </div>

          {/* Revenue Chart */}
          <Card className="p-6">
            <CardHeader>
              <h3 className="font-semibold text-lg">Revenue Overview</h3>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={revenueData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#4f46e5"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <Card className="lg:col-span-2 p-6">
              <CardHeader>
                <h3 className="font-semibold text-lg">Recent Orders</h3>
              </CardHeader>
              <CardContent>
                <OrderItem
                  id="#10231"
                  user="John Doe"
                  amount="$120"
                  status="Paid"
                />
                <OrderItem
                  id="#10232"
                  user="Jane Smith"
                  amount="$89"
                  status="Pending"
                />
                <OrderItem
                  id="#10233"
                  user="Alex Ray"
                  amount="$45"
                  status="Cancelled"
                />
              </CardContent>
            </Card>

            {/* Quick Insights */}
            <Card className="p-6">
              <CardHeader>
                <h3 className="font-semibold text-lg">Quick Insights</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                <Insight text="🔥 Best selling category: Electronics" />
                <Insight text="⚠️ 12 products low in stock" />
                <Insight text="📦 5 pending seller approvals" />
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
};

const SidebarItem = ({ icon, text }) => (
  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition">
    {icon}
    {text}
  </div>
);

const StatCard = ({ title, value, icon }) => (
  <Card className="flex justify-between items-center p-6 hover:scale-[1.02] transition">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
    <div className="p-3 rounded-xl bg-gray-100">{icon}</div>
  </Card>
);

const OrderItem = ({ id, user, amount, status }) => (
  <div className="flex justify-between items-center py-3 border-b last:border-b-0 text-sm">
    <div>
      <p className="font-medium">{id}</p>
      <p className="text-gray-500">{user}</p>
    </div>
    <div className="text-right">
      <p className="font-medium">{amount}</p>
      <span className="text-xs text-gray-500">{status}</span>
    </div>
  </div>
);

const Insight = ({ text }) => (
  <div className="p-3 rounded-lg bg-gray-100 text-sm">{text}</div>
);

export default AdminLanding;
