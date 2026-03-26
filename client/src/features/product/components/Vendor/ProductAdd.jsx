import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import axios from "axios";
import { ServerApi } from "@/constant";
import ProductDetailsForm from "./ProductDetailsForm";
import ProductImageUpload from "./ProductImageUpload";

import { useProductAdd } from "../../product.hook";

const fetchCategories = async () => {
  const res = await axios.get(`${ServerApi}/categories/view`, {
    withCredentials: true,
  });
  return res.data.categories;
};

function ProductAdd({ showAddProduct }) {
  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);

  const titleRef = useRef();
  const priceRef = useRef();
  const skuRef = useRef();
  const discountRef = useRef();
  const stockRef = useRef();
  const descriptionRef = useRef();
  const categoriesRef = useRef();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { mutate: addProduct, isLoading, isError, data } = useProductAdd();

  const handleSubmit = async () => {
    try {
      if (!images.length) {
        alert("Please add Product images!");
        return;
      }
      const formData = new FormData();

      formData.append("name", titleRef.current.value);
      formData.append("price", priceRef.current.value);
      formData.append("sku", skuRef.current.value);
      formData.append("discount", discountRef.current.value);
      formData.append("description", descriptionRef.current.value);
      formData.append("category", categoriesRef.current.value);
      formData.append("stock", stockRef.current.value);

      // append all images
      images.forEach((image) => {
        formData.append("images", image.file); // 'images' must match multer field name
      });
      console.log(images);
      addProduct(formData, {
        onSuccess: (res) => {
          console.log("Product added successfully", res.data);
        },
        onError: (err) => {
          console.error("Error adding product", err.response?.data || err);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!showAddProduct) return null;

  // if (isError){
  //   return (<div> {isError.message} </div>)
  // }
  
  return (
    <Card className="p-6">
      <div className={`${step === 1 ? "block" : "hidden"}`}>
        <ProductDetailsForm
          refs={{
            titleRef,
            priceRef,
            skuRef,
            discountRef,
            stockRef,
            descriptionRef,
            categoriesRef,
          }}
          categories={categories}
        />
      </div>

      {step === 2 && (
        <ProductImageUpload images={images} setImages={setImages} />
      )}

      <div className="flex gap-4 mt-6">
        {step > 1 && (
          <Button onClick={() => setStep(step - 1)}>Previous</Button>
        )}

        {step < 2 && <Button onClick={() => setStep(step + 1)}>Next</Button>}

        {step === 2 && !isLoading && (
          <Button onClick={handleSubmit}>Publish Product</Button>
        )}
      </div>
    </Card>
  );
}

export default ProductAdd;
