import { Field } from "@/components/customs/Field";
import { Form } from "@/components/customs/Form";
import { Input } from "@/components/customs/Input";
import { Label } from "@/components/customs/Label";

const ProductDetailsForm = ({ refs, categories }) => {
  const {
    titleRef,
    priceRef,
    skuRef,
    discountRef,
    stockRef,
    descriptionRef,
    categoriesRef,
  } = refs;

  return (
    <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field>
        <Label htmlFor="title">Product Name</Label>
        <Input ref={titleRef} name="title" id="title" placeholder="Enter product name" />
      </Field>

      <Field>
        <Label htmlFor="category">Category</Label>
        <select
          ref={categoriesRef}
          name="category"
          id="category"
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all bg-white text-gray-800 font-medium"
        >
          <option value="" disabled>Select a category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </Field>

      <Field>
        <Label htmlFor="price">Price (₹)</Label>
        <Input ref={priceRef} name="price" id="price" type="number" placeholder="0.00" />
      </Field>

      <Field>
        <Label htmlFor="discount">Discount (%)</Label>
        <Input ref={discountRef} name="discount" id="discount" type="number" placeholder="0" />
      </Field>

      <Field>
        <Label htmlFor="stock">Stock Available</Label>
        <Input ref={stockRef} name="stock" id="stock" type="number" placeholder="Enter stock quantity" />
      </Field>

      <Field>
        <Label htmlFor="sku">SKU Code</Label>
        <Input ref={skuRef} name="sku" id="sku" placeholder="e.g. WH-100" />
      </Field>

      <Field className="md:col-span-2">
        <Label htmlFor="description">Product Description</Label>
        <textarea
          ref={descriptionRef}
          name="description"
          id="description"
          rows="4"
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all bg-white text-gray-800 font-medium placeholder:text-gray-400"
          placeholder="Detailed description of the product..."
        />
      </Field>
    </Form>
  );
};

export default ProductDetailsForm;
