import { ServerApi } from "@/constant";
import axios from "axios";
import { useRef, useState } from "react";

function ProfileUpdate() {
  const [imagePreview, setImagePreview] = useState(null);
  const nameRef = useRef();
  const roleRef = useRef();
  const addressRef = useRef();

  let file;
  const handleImage = (e) => {
    file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value.trim();
    const address = addressRef.current.value.trim();
    const role = roleRef.current.value.trim();
    try {
      const res = await axios.put(
        `${ServerApi}/auth/updateProfile`,
        { profile: file, name, address, role },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      <h1 className="text-3xl font-semibold border-b pb-3 mb-6 text-gray-800">
        Profile Settings
      </h1>

      <form className="flex flex-col gap-6">
        {/* Profile Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden shadow">
            {imagePreview ? (
              <img src={imagePreview} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>

          <label className="text-sm font-medium text-gray-600">
            Change Picture
          </label>
          <input
            type="file"
            onChange={handleImage}
            className="border rounded-lg px-3 py-2 bg-gray-50 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700 font-medium">Name</label>
          <input
            type="text"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            ref={nameRef}
          />
        </div>

        {/* Role */}
        <div>
          <label className="text-sm text-gray-700 font-medium">
            Apply As Role
          </label>
          <div className="mt-2 flex gap-4">
            {["Admin", "Seller", "Customer"].map((role) => (
              <label
                key={role}
                className="flex items-center gap-2 cursor-pointer text-gray-600"
              >
                <input
                  type="radio"
                  name="role"
                  value={role}
                  ref={roleRef}
                  className="accent-blue-600"
                />
                {role}
              </label>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700 font-medium">Address</label>
          <input
            type="text"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full address"
            ref={addressRef}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all active:scale-95 shadow-md"
          onClick={handleUpdateProfile}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default ProfileUpdate;
