import axios from "axios";
import { useEffect, useRef, useState } from "react";
import CategoryItem from "@/component/CategoryItems";
import { ServerApi } from "@/constant";

const AddCategories = () => {
  const categoryRef = useRef();
  const parentRef = useRef();

  const [categories, setCategories] = useState([]);
  const [tree, setTree] = useState([]);

  useEffect(() => {
    fetchCategory();
  }, []);

  const buildCategoryTree = (categories) => {
    const map = {};
    const roots = [];

    categories.forEach((cat) => {
      map[cat._id] = { ...cat, children: [] };
    });

    categories.forEach((cat) => {
      if (cat.parentCategory) {
        map[cat.parentCategory]?.children.push(map[cat._id]);
      } else {
        roots.push(map[cat._id]);
      }
    });

    return roots;
  };

  const fetchCategory = async () => {
    const res = await axios.get(`${ServerApi}/categories/view`, {
      withCredentials: true,
    });
    setCategories(res.data.categories);
    setTree(buildCategoryTree(res.data.categories));
  };

  const handleAddCategory = async () => {
    const name = categoryRef.current.value;
    const parentId = parentRef.current.value || null;

    if (!name) return;

    await axios.post(
      `${ServerApi}/categories/add`,
      {
        name,
        description: "Electronic and Gadgets",
        parentId,
      },
      { withCredentials: true }
    );

    categoryRef.current.value = "";
    parentRef.current.value = "";
    fetchCategory();
  };

  return (
    <div className="max-w-xl mx-auto p-4 border rounded-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">Categories</h2>

      {/* Category Tree */}
      <div className="space-y-1">
        {tree.map((cat) => (
          <CategoryItem key={cat._id} category={cat} />
        ))}
      </div>

      {/* Add Category */}
      <div className="mt-6 border-t pt-4 space-y-3">
        <input
          ref={categoryRef}
          placeholder="Category name"
          className="w-full border p-2 rounded"
        />

        <select ref={parentRef} className="w-full border p-2 rounded">
          <option value="">No Parent (Root)</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleAddCategory}
          className="w-full bg-green-700 text-white p-2 rounded hover:bg-green-800"
        >
          Add Category
        </button>
      </div>
    </div>
  );
};

export default AddCategories;
