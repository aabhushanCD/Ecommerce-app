function ProductAdd() {
  return (
    <>
      <div className="border w-100 m-auto mt-10  ">
        <h1 className="text-2xl font-semibold p-2 border-b">New Product Add</h1>
        <div className="flex gap-2 flex-col p-2">
          <label htmlFor="Name">Title:</label>
          <input type="text" className="border p-2" />

          <label htmlFor="">Description:</label>
          <textarea type="text" className="border p-2" />

          <label htmlFor="">Tags:</label>
          <input type="text" className="border p-2" />

          <button className="border bg-black text-white  p-2">Add</button>
        </div>
      </div>
    </>
  );
}

export default ProductAdd;
