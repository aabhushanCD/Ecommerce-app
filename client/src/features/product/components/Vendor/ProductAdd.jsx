import { useRef, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import ProductDetailsForm from "./components/ProductDetailsForm";
// import ProductImageUpload from "./components/ProductImageUpload";
import { addProductService } from "./product.service";
import axios from "axios";
import { ServerApi } from "@/constant";
import ProductDetailsForm from "./ProductDetailsForm";
import ProductImageUpload from "./ProductImageUpload";

const fetchCategories = async () => {
  const res = await axios.get(`${ServerApi}/categories/view`, {
    withCredentials: true,
  });
  return res.data.categories;
};

function ProductAdd({ showAddProduct, setShowAddProduct }) {
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

  const addProduct = useMutation({
    mutationFn: addProductService,
    onSuccess: () => {
      setShowAddProduct(false);
    },
  });

  const handleSubmit = () => {
    const payload = {
      name: titleRef.current.value,
      price: priceRef.current.value,
      sku: skuRef.current.value,
      discount: discountRef.current.value,
      description: descriptionRef.current.value,
      category: categoriesRef.current.value,
      stock: stockRef.current.value,
      images,
    };

    addProduct.mutate(payload);
  };

  if (!showAddProduct) return null;

  return (
    <Card className="p-6">
      {step === 1 && (
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
      )}

      {step === 2 && (
        <ProductImageUpload images={images} setImages={setImages} />
      )}

      <div className="flex gap-4 mt-6">
        {step > 1 && (
          <Button onClick={() => setStep(step - 1)}>Previous</Button>
        )}

        {step < 2 && <Button onClick={() => setStep(step + 1)}>Next</Button>}

        {step === 2 && <Button onClick={handleSubmit}>Publish Product</Button>}
      </div>
    </Card>
  );
}

export default ProductAdd;
