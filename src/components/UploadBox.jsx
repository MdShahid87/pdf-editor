import { useRef, useState } from "react";
const UploadBox = ({
  title = "Upload your file",
  accept = "*/*",
  multiple = false,
  selectedFileName = "",
  onFileSelect,
}) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (fileList) => {
    const files = Array.from(fileList || []);

    if (files.length === 0) {
      return;
    }
    console.log("Selected files:", files);

    if (multiple) {
      onFileSelect(files);
    } else {
      onFileSelect(files[0]);
    }
  };
  const handleChange = (event) => {
    handleFiles(event.target.files);

    // Allow selecting the same file again
    event.target.value = "";
  };
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  return (
    <div
      className={`rounded-xl border-2 border-dashed p-6 text-center transition ${
        dragging ? "border-red-500 bg-red-50" : "border-slate-300 bg-slate-50"
      }`}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => {
        setDragging(false);
      }}
      onDrop={handleDrop}
    >
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>

      <p className="mt-2 text-sm text-slate-500">
        Drag and drop {multiple ? "files" : "a file"} here, or choose from your
        device.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mt-4 rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-500"
      >
        {multiple ? "Choose Files" : "Choose File"}
      </button>

      {selectedFileName && (
        <p className="mt-3 break-all text-sm font-medium text-slate-700">
          Selected: {selectedFileName}
        </p>
      )}
    </div>
  );
};

export default UploadBox;
