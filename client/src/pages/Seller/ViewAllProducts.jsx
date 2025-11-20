import React, { useState } from "react";

const ViewAllProducts = () => {
  const [showFull, setShowFull] = useState(false);

  let description =
    "Moving on, the other midrange phone to look out is the Redmi Note 8 Pro. It comes as a direct successor of the Note 7 Pro and is one of the most hyped Xiaomi devices in recent dates. Though the device will launch with the MIUI 10 in the beginning, users should expect the recently launched MIUI 11 as of reading this article. The Redmi Note 8 Pro has a bigger 6.53-inch display...";

  return (
    <>
      <div className="p-4 ">
        <h1 className="text-3xl font-bold text-center">Products</h1>
        <table className="border-2 w-full bg-gray-50 ">
          <thead>
            <tr>
              <th className="border p-2 w-50">S.N</th>
              <th className="border p-2 w-50">Title</th>
              <th className="border p-2 w-50">Description</th>
              <th className="border p-2 w-50">Tags</th>
              <th className="border p-2 w-50">Discounts</th>
              <th className="border p-2 w-50">Total Price</th>
              <th className="border p-2 w-50">Edit</th>
            </tr>
          </thead>

          <tbody>
            <tr className="text-center">
              <td className="border">1</td>
              <td className="border">Redmi Note 8 Pro 6/128 Gb</td>

              <td className="border text-left p-2">
                {showFull ? description : description.slice(0, 50) + "..."}

                <button
                  className="text-blue-600 underline ml-2"
                  onClick={() => setShowFull(!showFull)}
                >
                  {showFull ? "show less" : "more"}
                </button>
              </td>

              <td className="border">789</td>

              <td className="border">-1011</td>
              <td className="border">1213</td>

              <td className="border">
                <button className="border p-1 bg-green-600 text-white rounded mr-1">
                  Edit/Change
                </button>
                <button className="border p-1 bg-red-600 text-white rounded">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td className="border p-2" colSpan={7}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default ViewAllProducts;
