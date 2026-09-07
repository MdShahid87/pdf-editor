import { useId, useRef, useState } from "react";

const UploadBox = ({
  title = "Upload your file",
  accept = "*",
  multiple = false,
  selectedFileName = "",
  onFileSelect,
  onFilesSelect,
}) => {
  const inputId = useId();
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (fileList) => {
    const files = Array.from(fileList || []);

    if (files.length === 0) return;

    if (multiple) {
      onFilesSelect?.(files);
    } else {
      onFileSelect?.(files[0]);
      onFilesSelect?.(files[0]);
    }
  };

  const handleChange = (event) => {
    handleFiles(event.target.files);

    // Same file dobara select karne ki permission
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    handleFiles(event.dataTransfer.files);
  };

  return (
    <div
      className={`rounded-xl border-2 border-dashed p-6 text-center transition ${dragging
        ? "border-red-500 bg-red-50"
        : "border-slate-300 bg-slate-50"
        }`}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <h3 className="text-lg font-semibold text-slate-800">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        Drag and drop{" "}
        {multiple ? "files" : "a file"} here,
        or choose from your device.
      </p>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={handleChange}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mt-4 inline-flex cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
      >
        Choose File{multiple ? "s" : ""}
      </button>

      {selectedFileName && (
        <p className="mt-3 text-sm font-medium text-slate-700">
          {selectedFileName}
        </p>
      )}
    </div>
  );
};

export default UploadBox;