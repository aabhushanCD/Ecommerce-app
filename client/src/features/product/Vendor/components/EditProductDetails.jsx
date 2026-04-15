import { Field } from "@/components/customs/Field";
import { Form } from "@/components/customs/Form";
import { Input } from "@/components/customs/Input";
import { Label } from "@/components/customs/Label";
import { useState } from "react";

export default function EditProductPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    stock: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 px-4">
      <div className="w-full  bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Edit Product
        </h2>

        {/* Form */}
        <Form onSubmit={handleSubmit} >
          {/* Title */}
          <Field>
            <Label className="block text-sm font-medium text-gray-600 mb-1">
              Product Title
            </Label>
            <Input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter product title"
              
            />
          </Field>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Write product description..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Price & Discount Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <Label className="block text-sm font-medium text-gray-600 mb-1">
                Price ($)
              </Label>
              <Input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="100"
                
              />
            </Field>

            <Field>
              <Label className="block text-sm font-medium text-gray-600 mb-1">
                Discount (%)
              </Label>
              <Input
                type="number"
                name="discount"
                value={form.discount}
                onChange={handleChange}
                placeholder="10"
                
              />
            </Field>
          </div>

          {/* Stock */}
          <Field>
            <Label >
              Stock Quantity
            </Label>
            <Input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Available stock"
             
            />
          </Field>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Save Changes
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
