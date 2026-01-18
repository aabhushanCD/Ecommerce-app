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

const SellerAsideNav = ({ productCount = 0, orderCount = 0 }) => {
  return (
    <aside className="col-span-12 lg:col-span-3">
      <Card className="p-5 shadow-xl border-0 bg-white/90 backdrop-blur-sm sticky top-24">
        <nav className="space-y-2">
          <SidebarItem
            to="/seller/dashboard"
            icon={<BarChart3 size={20} />}
            text="Dashboard"
          />
          <SidebarItem
            to="/seller/products"
            icon={<Package size={20} />}
            text="My Products"
            badge={productCount}
          />
          <SidebarItem
            to="/seller/orders"
            icon={<ShoppingBag size={20} />}
            text="Orders"
            badge={orderCount}
          />
          <SidebarItem
            to="/seller/analytics"
            icon={<TrendingUp size={20} />}
            text="Analytics"
          />
          <SidebarItem
            to="/seller/earnings"
            icon={<DollarSign size={20} />}
            text="Earnings"
          />
          <SidebarItem
            to="/seller/reviews"
            icon={<Star size={20} />}
            text="Reviews"
          />
        </nav>

        {/* Pro Tip */}
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
  );
};

export default SellerAsideNav;
