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
          <img
            key={i}
            src={img.preview}
            className="w-24 h-24 object-cover rounded-lg border"
          />
        ))}
      </div>
    </>
  );
};
