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
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <input ref={titleRef} placeholder="Product name" />

      <select ref={categoriesRef}>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <input ref={priceRef} type="number" placeholder="Price" />

      <input ref={discountRef} type="number" placeholder="Discount" />

      <input ref={stockRef} type="number" placeholder="Stock" />

      <input ref={skuRef} placeholder="SKU" />

      <textarea ref={descriptionRef} placeholder="Description" />
    </form>
  );
};

export default ProductDetailsForm;
