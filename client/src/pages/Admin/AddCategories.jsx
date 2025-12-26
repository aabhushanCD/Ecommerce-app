import { ServerApi } from "@/constant";
import axios from "axios";
import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useRef, useState } from "react";

const AddCategories = () => {
  // useEffect(async() => {
  //   const res= axios.get(`${ServerApi}/`)
  // });
  const categoryRef = useRef();
  const [categories, setCategories] = useState([]);
  const handleAddCategory = async (parentId = null) => {
    const category = categoryRef.current.value;

    setCategories((prev) => [...prev, category]);

    categoryRef.current.value = "";
    try {
      const res = await axios.post(
        `${ServerApi}/categories/add/${parentId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        console.log("success");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className=" grid  w-100 border-2 min-h-50  m-auto mt-50 p-4">
      <div className="font-bold text-3xl text-blue-700 m-auto">CATEGORY</div>
      <div className="font-bold  text-gray-500 ">
        {categories &&
          categories.map((c, i) => (
            <div key={i} className="border-b-2 flex justify-between p-2">
              {c} <ChevronRight />
            </div>
          ))}
      </div>
      <span className="flex gap-4 justify-between  items-center font-semibold px-4 rounded-2xl border mt-2  py-1">
        <input
          type="text"
          placeholder="Add New Category . . ."
          className="outline-none"
          ref={categoryRef}
          onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
        />
        <button
          id="add"
          className="font-bold text-3xl bg-green-900 rounded-4xl  text-white  p-2 "
          onClick={handleAddCategory}
        >
          +
        </button>
      </span>
    </div>
  );
};

export default AddCategories;
