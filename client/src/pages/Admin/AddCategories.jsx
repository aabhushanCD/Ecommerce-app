import { ServerApi } from "@/constant";
import React from "react";

const AddCategories = () => {
  const handleAddCategory = async () => {
    try {
      const res = await axios.post(
        `${ServerApi}/categories/add/${(parentId = null)}`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {}
  };
  return (
    <div className="w-100 h-50 bg-gray-50 m-auto">
      <h1 className="text-2xl font-semibold text-center">Add Category</h1>
      <div className="flex border-b p-2">
        <label htmlFor="new-category "> New Category:</label>
        <input
          type="text"
          id="new-category"
          className="outline-none border-b p-2"
        />
      </div>
      <div className="p-2">
        <button
          className="bg-green-500 p-2 rounded-2xl"
          onClick={handleAddCategory}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddCategories;
