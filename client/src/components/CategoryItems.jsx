import { ChevronRight, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

const CategoryItem = ({ category }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="ml-2">
      <div className="group flex items-center justify-between p-2 rounded hover:bg-gray-100 transition">
        <div className="flex items-center gap-2">
          {category.children.length > 0 && (
            <button onClick={() => setOpen(!open)}>
              {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
          )}
          <span className="font-medium">{category.name}</span>
        </div>

        {/* Hover Actions */}
        <div className="hidden group-hover:flex gap-3 text-gray-600">
          <Pencil size={16} className="cursor-pointer hover:text-blue-600" />
          <Trash2 size={16} className="cursor-pointer hover:text-red-600" />
        </div>
      </div>

      {/* Hover Details */}
      <div className="hidden group-hover:block text-xs text-gray-500 ml-8">
        {category.description}
      </div>

      {open &&
        category.children.map((child) => (
          <CategoryItem key={child._id} category={child} />
        ))}
    </div>
  );
};

export default CategoryItem;
