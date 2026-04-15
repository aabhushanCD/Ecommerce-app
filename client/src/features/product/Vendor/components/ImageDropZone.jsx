import { Upload } from "lucide-react";
import { useRef } from "react";

export const ImageDropZone = ({ images, setImages }) => {
  const inputRef = useRef();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const preview = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...preview]);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const files = Array.from(e.dataTransfer.files);

    const preview = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...preview]);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <>
      <div
        onClick={() => inputRef.current.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-violet-500"
      >
        <Upload className="mx-auto mb-3 text-gray-400" size={40} />
        <p>
          <span className="text-violet-600 font-medium">Click to upload</span>{" "}
          or drag and drop
        </p>

        <input
          type="file"
          multiple
          accept="image/*"
          ref={inputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <div className="flex gap-4 mt-4 flex-wrap">
        {images.map((img, i) => (
          <div key={i} className="relative group">
            <img
              src={img.preview}
              className="w-24 h-24 object-cover rounded-lg border"
              alt="preview"
            />
            <button
              type="button"
              onClick={() => setImages((prev) => prev.filter((_, index) => index !== i))}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all shadow-md hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
