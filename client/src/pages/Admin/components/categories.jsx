import axios from "axios";
import { useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import CategoryItem from "@/pages/customer/component/CategoryItems";
import { ServerApi } from "@/constant";

/* ------------------ API FUNCTIONS ------------------ */

 const fetchCategories = async () => {
  const res = await axios.get(`${ServerApi}/categories/view`, {
    withCredentials: true,
  });
  return res.data.categories;
};

const addCategoryApi = async (payload) => {
  return axios.post(`${ServerApi}/categories/add`, payload, {
    withCredentials: true,
  });
};

/* ------------------ HELPER ------------------ */

const buildCategoryTree = (categories = []) => {
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

/* ------------------ COMPONENT ------------------ */

const AddCategories = () => {
  const categoryRef = useRef();
  const parentRef = useRef();
  const queryClient = useQueryClient();

  /* -------- FETCH CATEGORIES -------- */
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  /* -------- DERIVED TREE (NO STATE) -------- */
  const tree = buildCategoryTree(categories);

  /* -------- ADD CATEGORY -------- */
  const addCategory = useMutation({
    mutationFn: addCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });

  /* -------- HANDLER -------- */
  const handleAddCategory = () => {
    const name = categoryRef.current.value;
    const parentId = parentRef.current.value || null;

    if (!name) return;

    addCategory.mutate({
      name,
      description: "Electronic and Gadgets",
      parentId,
    });

    categoryRef.current.value = "";
    parentRef.current.value = "";
  };

  /* -------- UI -------- */
  if (isLoading) {
    return <p className="text-center">Loading categories...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-4 border rounded-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">Categories</h2>

      {/* CATEGORY TREE */}
      <div className="space-y-1">
        {tree.map((cat) => (
          <CategoryItem key={cat._id} category={cat} />
        ))}
      </div>

      {/* ADD CATEGORY */}
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
