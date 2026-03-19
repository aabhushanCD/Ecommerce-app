import ImageDropZone from "./ImageDropZone";

const ProductImageUpload = ({ images, setImages }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Upload Product Images</h3>

      <ImageDropZone images={images} setImages={setImages} />
    </div>
  );
};

export default ProductImageUpload;
