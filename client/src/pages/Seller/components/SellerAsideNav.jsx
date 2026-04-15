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
import SidebarItem from "./SideBarItems";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/store";

const SellerAsideNav = ({ productCount = 0, orderCount = 0 }) => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  const menuItems = [
    {
      to: "/seller/dashboard",
      icon: <BarChart3 size={20} />,
      text: "Dashboard",
    },
    {
      to: "/seller/products",
      icon: <Package size={20} />,
      text: "Products",
      badge: productCount,
    },
    {
      to: "/seller/orders",
      icon: <ShoppingBag size={20} />,
      text: "Orders",
      badge: orderCount,
    },
    {
      to: "/seller/analytics",
      icon: <TrendingUp size={20} />,
      text: "Analytics",
    },
    {
      to: "/seller/earnings",
      icon: <DollarSign size={20} />,
      text: "Earnings",
    },
    {
      to: "/seller/reviews",
      icon: <Star size={20} />,
      text: "Reviews",
    },
  ];

  const handleLogout = async () => {
    // clear token / auth
    const res = await logOut();
    // redirect
    if (res) return navigate("/login");
  };
  
  return (
    <aside className="col-span-12 lg:col-span-3">
      <Card className="flex flex-col justify-between p-5 shadow-xl border-0 bg-white/90 backdrop-blur-sm sticky top-0 h-[100vh] overflow-auto">
        {/* Menu */}
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <SidebarItem key={index} {...item} />
          ))}
        </nav>

        {/* Logout */}
        <Button
          onClick={handleLogout}
          className="mt-4 w-full"
          variant="destructive"
        >
          Logout
        </Button>
      </Card>
    </aside>
  );
};

export default SellerAsideNav;
