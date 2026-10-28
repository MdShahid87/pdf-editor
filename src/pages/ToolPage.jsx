import { useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import { useParams } from "react-router-dom";

import UploadBox from "../components/UploadBox";
import {
  convertFromPdfTools,
  convertToPdfTools,
  editPdfTools,
  smartTools,
} from "../utils/constants";

import {
  imagesToPdf,
  mergePdfs,
  splitPdf,
  rotatePdf,
  deletePdfPages,
  addSignature,
  editPdf,
  compressPdf,
  pdfToJpg,
} from "../api/pdfService";

// ALL TOOLS
const allTools = [
  ...convertToPdfTools,
  ...convertFromPdfTools,
  ...editPdfTools,
  ...smartTools,
];

// FORMAT SLUG
const formatSlug = (slug = "") =>
  slug
    .split("-")
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(" ");

// REMOVE FILE EXTENSION
const removeExtension = (name = "") => {
  const index = name.lastIndexOf(".");

  if (index <= 0) {
    return name;
  }
  return name.slice(0, index);
};

// PAGE NUMBER PARSER
const parsePageNumbers = (value) => {
  if (!value.trim()) {
    throw new Error("Please enter page numbers. Example: 1, 3, 5");
  }
  const pages = value
    .split(",")
    .map((item) => Number(item.trim()))
    .filter((number) => Number.isInteger(number));

  if (pages.length === 0) {
    throw new Error("Invalid page numbers. Example: 1, 3, 5");
  }

  return pages;
};

// TOOL PAGE
const ToolPage = () => {
  const { category = "", tool = "" } = useParams();
  // STATE
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [signatureFile, setSignatureFile] = useState(null);

  const [pageNumbers, setPageNumbers] = useState("");

  const [pageNumber, setPageNumber] = useState("1");

  const [rotation, setRotation] = useState("90");

  // EDIT PDF
  const [editText, setEditText] = useState("");

  const [editPage, setEditPage] = useState("1");

  const [editX, setEditX] = useState("60");

  const [editY, setEditY] = useState("700");

  const [editFontSize, setEditFontSize] = useState("16");

  const [status, setStatus] = useState("");

  const [error, setError] = useState("");

  const [convertedFile, setConvertedFile] = useState(null);

  const [loading, setLoading] = useState(false);

  // CURRENT ROUTE
  const routePath = useMemo(
    () => `/${category}/${tool}`.replace(/\/+/g, "/"),
    [category, tool],
  );
  // FIND TOOL
  const selectedTool = allTools.find((item) => item.path === routePath);

  const title = selectedTool?.name || formatSlug(tool);

  // SPECIAL TOOLS
  const isMergePdf = routePath === "/tools/merge-pdf" || tool === "merge-pdf";

  const isEditPdf = routePath === "/tools/edit-pdf" || tool === "edit-pdf";

  const isCompressPdf =
    routePath === "/tools/compress-pdf" || tool === "compress-pdf";

  const isPdfToJpg =
    routePath === "/convert-from-pdf/pdf-to-jpg" || tool === "pdf-to-jpg";
  // BUTTON LABEL
  const actionLabel =
    routePath === "/convert-to-pdf/jpg-to-pdf"
      ? "Convert JPG to PDF"
      : routePath === "/convert-to-pdf/png-to-pdf"
        ? "Convert PNG to PDF"
        : isMergePdf
          ? "Merge PDFs"
          : routePath === "/tools/split-pdf"
            ? "Split PDF"
            : routePath === "/edit-pdf/rotate-pages"
              ? "Rotate PDF"
              : routePath === "/edit-pdf/delete-pages"
                ? "Delete Pages"
                : routePath === "/tools/add-signature"
                  ? "Add Signature"
                  : isEditPdf
                    ? "Apply Edit"
                    : isCompressPdf
                      ? "Compress PDF"
                      : isPdfToJpg
                        ? "Convert PDF to JPG"
                        : "Process File";
  // FILE SELECT
  const handleFileSelect = (files) => {
    const normalizedFiles = Array.isArray(files) ? files : files ? [files] : [];
    setSelectedFiles(normalizedFiles);
    setError("");
    setStatus("");
    setConvertedFile(null);
  };
  // DOWNLOAD BLOB
  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    link.remove();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);
  };
  // SIMPLE IMAGE/TEXT → PDF
  const convertToPdf = async (file) => {
    const isImage = file.type.startsWith("image/");

    const isTextLike =
      file.type.includes("text") ||
      file.type.includes("json") ||
      file.type.includes("xml") ||
      file.type.includes("html");

    const pdf = new jsPDF({
      unit: "pt",
      format: "a4",
    });

    // IMAGE
    if (isImage) {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);

        reader.onerror = () => reject(new Error("Unable to read image file."));

        reader.readAsDataURL(file);
      });

      const image = await new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => resolve(img);

        img.onerror = () => reject(new Error("Unable to load image."));

        img.src = dataUrl;
      });

      const pageWidth = pdf.internal.pageSize.getWidth();

      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 20;

      const ratio = Math.min(
        (pageWidth - margin * 2) / image.width,
        (pageHeight - margin * 2) / image.height,
      );

      const width = image.width * ratio;

      const height = image.height * ratio;

      const x = (pageWidth - width) / 2;

      const y = (pageHeight - height) / 2;

      const imageFormat = file.type === "image/jpeg" ? "JPEG" : "PNG";

      pdf.addImage(dataUrl, imageFormat, x, y, width, height);

      return pdf.output("blob");
    }
    // TEXT / JSON / XML / HTML
    if (isTextLike) {
      const content = await file.text();

      const lines = pdf.splitTextToSize(content || "(Empty file)", 500);

      pdf.text(lines, 40, 60);

      return pdf.output("blob");
    }

    throw new Error(
      "This file type is not supported for client-side PDF conversion.",
    );
  };

  // MAIN PROCESS
  const handleConvert = async () => {
    if (selectedFiles.length === 0) {
      setError("Please choose a file first.");

      return;
    }
    // Rest
    setError("");
    setStatus("Processing...");
    setConvertedFile(null);
    setLoading(true);

    try {
      const firstFile = selectedFiles[0];

      const baseName = removeExtension(firstFile.name);

      let outputBlob;
      let outName;
      // JPG → PDF
      if (routePath === "/convert-to-pdf/jpg-to-pdf") {
        const pdfBytes = await imagesToPdf(selectedFiles);

        outputBlob = new Blob([pdfBytes], {
          type: "application/pdf",
        });

        outName = "jpg-to-pdf.pdf";
      }
      // PNG → PDF
      else if (routePath === "/convert-to-pdf/png-to-pdf") {
        const pdfBytes = await imagesToPdf(selectedFiles);

        outputBlob = new Blob([pdfBytes], {
          type: "application/pdf",
        });

        outName = "png-to-pdf.pdf";
      }
      //MERGE PDF
      else if (isMergePdf) {
        // Need at least 2 files
        if (selectedFiles.length < 2) {
          throw new Error("Please select at least 2 PDF files to merge.");
        }

        // Validate all files
        const invalidFile = selectedFiles.find(
          (file) =>
            file.type !== "application/pdf" &&
            !file.name.toLowerCase().endsWith(".pdf"),
        );

        if (invalidFile) {
          throw new Error(
            `"${invalidFile.name}" is not a PDF file. Please select only PDF files.`,
          );
        }

        // Call PDF merge service
        const pdfBytes = await mergePdfs(selectedFiles);

        outputBlob = new Blob([pdfBytes], {
          type: "application/pdf",
        });

        outName = "merged.pdf";
      }
      // SPLIT Pdf
      else if (routePath === "/tools/split-pdf") {
        const pages = parsePageNumbers(pageNumbers);

        const pdfBytes = await splitPdf(firstFile, pages);

        outputBlob = new Blob([pdfBytes], {
          type: "application/pdf",
        });

        outName = `${baseName}-split.pdf`;
      }
      // ROTATE PDF
      else if (routePath === "/edit-pdf/rotate-pages") {
        const pdfBytes = await rotatePdf(firstFile, Number(rotation));

        outputBlob = new Blob([pdfBytes], {
          type: "application/pdf",
        });

        outName = `${baseName}-rotated.pdf`;
      }
      // DELETE PDF PAGES
      else if (routePath === "/edit-pdf/delete-pages") {
        const pages = parsePageNumbers(pageNumbers);

        const pdfBytes = await deletePdfPages(firstFile, pages);

        outputBlob = new Blob([pdfBytes], {
          type: "application/pdf",
        });
        outName = `${baseName}-edited.pdf`;
      }
      // ADD SIGNATURE
      else if (routePath === "/tools/add-signature") {
        if (!signatureFile) {
          throw new Error("Please upload your signature image.");
        }

        const pdfBytes = await addSignature(
          firstFile,
          signatureFile,
          Number(pageNumber),
          100,
          100,
          180,
          70,
        );
        outputBlob = new Blob([pdfBytes], {
          type: "application/pdf",
        });
        outName = `${baseName}-signed.pdf`;
      }
      // EDIT PDF
      else if (isEditPdf) {
        if (!editText.trim()) {
          throw new Error("Please enter the text you want to add.");
        }
        const pdfBytes = await editPdf(
          firstFile,
          editText,
          Number(editPage),
          Number(editX),
          Number(editY),
          Number(editFontSize),
        );
        outputBlob = new Blob([pdfBytes], {
          type: "application/pdf",
        });
        outName = `${baseName}-edited.pdf`;
      }
      // COMPRESS PDF
      else if (isCompressPdf) {
        const pdfBytes = await compressPdf(firstFile);
        outputBlob = new Blob([pdfBytes], {
          type: "application/pdf",
        });
        outName = `${baseName}-compressed.pdf`;
      }
      // PDF → JPG
      else if (isPdfToJpg) {
        const zipBlob = await pdfToJpg(firstFile);

        outputBlob = zipBlob;

        outName = `${baseName}-jpg.zip`;
      }
      // OTHER TO PDF
      else if (routePath.includes("to-pdf")) {
        outputBlob = await convertToPdf(firstFile);
        outName = `${baseName}.pdf`;
      } else {
        throw new Error(`${title} is not implemented yet.`);
      }
      setConvertedFile({
        blob: outputBlob,
        fileName: outName,
      });

      setStatus(`Done. Your file is ready: ${outName}`);
    } catch (conversionError) {
      console.error(conversionError);
      setStatus("");
      setError(
        conversionError.message || "Processing failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };
  // DOWNLOAD RESULT
  const handleDownloadConverted = () => {
    if (!convertedFile) {
      return;
    }
    downloadBlob(convertedFile.blob, convertedFile.fileName);
  };
  // EXTRA CONTROLS
  const renderExtraControls = () => {
    if (
      routePath === "/tools/split-pdf" ||
      routePath === "/edit-pdf/delete-pages"
    ) {
      return (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <label className="block text-sm font-semibold text-slate-800">
            Page Numbers
          </label>

          <input
            type="text"
            value={pageNumbers}
            onChange={(event) => setPageNumbers(event.target.value)}
            placeholder="Example: 1, 3, 5"
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-red-500"
          />

          <p className="mt-2 text-xs text-slate-500">
            Enter page numbers separated by commas.
          </p>
        </div>
      );
    }
    // ROTATE
    if (routePath === "/edit-pdf/rotate-pages") {
      return (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <label className="block text-sm font-semibold text-slate-800">
            Rotation
          </label>

          <select
            value={rotation}
            onChange={(event) => setRotation(event.target.value)}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-red-500"
          >
            <option value="90">Rotate 90°</option>

            <option value="180">Rotate 180°</option>

            <option value="270">Rotate 270°</option>
          </select>
        </div>
      );
    }
    // SIGNATURE
    if (routePath === "/tools/add-signature") {
      return (
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
          <div>
            <label className="block text-sm font-semibold text-slate-800">
              Signature Image
            </label>

            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={(event) =>
                setSignatureFile(event.target.files?.[0] || null)
              }
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />

            <p className="mt-2 text-xs text-slate-500">
              Upload your signature as PNG or JPG.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800">
              PDF Page Number
            </label>

            <input
              type="number"
              min="1"
              value={pageNumber}
              onChange={(event) => setPageNumber(event.target.value)}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
            />
          </div>
        </div>
      );
    }
    // EDIT PDF
    if (isEditPdf) {
      return (
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Edit PDF</h2>

            <p className="mt-1 text-sm text-slate-500">
              Add text to an existing PDF page.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800">
              Text
            </label>

            <textarea
              value={editText}
              onChange={(event) => setEditText(event.target.value)}
              placeholder="Type the text you want to add"
              rows="3"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-800">
                Page Number
              </label>

              <input
                type="number"
                min="1"
                value={editPage}
                onChange={(event) => setEditPage(event.target.value)}
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800">
                Font Size
              </label>

              <input
                type="number"
                min="6"
                max="72"
                value={editFontSize}
                onChange={(event) => setEditFontSize(event.target.value)}
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800">
                X Position
              </label>

              <input
                type="number"
                min="0"
                value={editX}
                onChange={(event) => setEditX(event.target.value)}
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800">
                Y Position
              </label>

              <input
                type="number"
                min="0"
                value={editY}
                onChange={(event) => setEditY(event.target.value)}
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </div>
          </div>
        </div>
      );
    }
    // COMPRESS PDF
    if (isCompressPdf) {
      return (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-lg font-semibold text-slate-900">Compress PDF</h2>

          <p className="mt-1 text-sm text-slate-500">
            Upload a PDF and compress its internal structure.
          </p>
        </div>
      );
    }

    return null;
  };

  // UPLOAD SETTINGS
  const isMultipleUpload =
    routePath === "/convert-to-pdf/jpg-to-pdf" ||
    routePath === "/convert-to-pdf/png-to-pdf" ||
    isMergePdf;
  const uploadAccept =
    routePath === "/convert-to-pdf/jpg-to-pdf"
      ? "image/jpeg"
      : routePath === "/convert-to-pdf/png-to-pdf"
        ? "image/png"
        : "application/pdf";

  // Render UI Components
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
          PDF Tool
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">{title}</h1>

        <p className="mt-2 text-slate-600">
          Upload your document and continue with {title.toLowerCase()}.
        </p>
      </div>
      <UploadBox
        title={isMultipleUpload ? "Upload Files" : title}
        selectedFileName={
          selectedFiles.length > 0
            ? isMultipleUpload
              ? `${selectedFiles.length} file(s) selected`
              : selectedFiles[0]?.name
            : undefined
        }
        accept={uploadAccept}
        multiple={isMultipleUpload}
        onFileSelect={handleFileSelect}
        onFilesSelect={handleFileSelect}
      />

      {/*Selected Files*/}
      {selectedFiles.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="mb-3 text-sm font-semibold text-slate-800">
            Selected Files
          </p>

          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2 text-sm"
              >
                <span className="max-w-[70%] truncate text-slate-700">
                  {file.name}
                </span>

                <span className="text-xs text-slate-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {renderExtraControls()}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap gap-3">
          {/* PROCESS BUTTON */}
          <button
            type="button"
            onClick={handleConvert}
            disabled={loading}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Processing..." : actionLabel}
          </button>

          {/* DOWNLOAD BUTTON */}
          <button
            type="button"
            onClick={handleDownloadConverted}
            disabled={!convertedFile || loading}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Download Converted File
          </button>
        </div>

        {/*Status */}
        {status && <p className="mt-3 text-sm text-green-700">{status}</p>}

        {/*Error*/}
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>
    </section>
  );
};
export default ToolPage;
