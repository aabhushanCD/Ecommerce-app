import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const StatCard = ({ title, value, change, icon, linear }) => (
  <Card className="p-4  border-2 bg-white/90 backdrop-blur-sm    cursor-pointer group">
    <div className="flex justify-between items-start mb-2">
      <div
        className={`p-2  rounded bg-linear-to-br ${linear} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
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

export default StatCard;
