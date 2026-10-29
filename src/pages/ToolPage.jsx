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

// All tools registered in constants.js
const allTools = [
  ...convertToPdfTools,
  ...convertFromPdfTools,
  ...editPdfTools,
  ...smartTools,
];

// Convert a slug into a readable title.
const formatSlug = (slug = "") =>
  slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

// Remove the last extension from a filename.
const removeExtension = (filename = "") => {
  const index = filename.lastIndexOf(".");

  return index > 0 ? filename.slice(0, index) : filename;
};

// Validate and parse comma-separated page numbers.
const parsePageNumbers = (value) => {
  if (!value.trim()) {
    throw new Error("Enter page numbers. Example: 1, 3, 5");
  }

  const parts = value.split(",").map((part) => part.trim());

  if (
    parts.some((part) => !/^\d+$/.test(part)) ||
    parts.some((part) => Number(part) < 1)
  ) {
    throw new Error(
      "Invalid page numbers. Enter positive integers separated by commas.",
    );
  }

  const pages = parts.map(Number);

  if (new Set(pages).size !== pages.length) {
    throw new Error("Do not enter duplicate page numbers.");
  }

  return pages;
};

// Basic PDF file validation.
const validatePdfFiles = (files) => {
  const invalidFile = files.find(
    (file) =>
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf"),
  );

  if (invalidFile) {
    throw new Error(`"${invalidFile.name}" is not a PDF file.`);
  }
};

// Create a PDF Blob from returned PDF bytes.
const createPdfBlob = (bytes) => new Blob([bytes], { type: "application/pdf" });

const ToolPage = () => {
  const { category = "", tool = "" } = useParams();

  // Selected files
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [signatureFile, setSignatureFile] = useState(null);

  // PDF page controls
  const [pageNumbers, setPageNumbers] = useState("");
  const [pageNumber, setPageNumber] = useState("1");
  const [rotation, setRotation] = useState("90");

  // Edit PDF controls
  const [editText, setEditText] = useState("");
  const [editPage, setEditPage] = useState("1");
  const [editX, setEditX] = useState("60");
  const [editY, setEditY] = useState("700");
  const [editFontSize, setEditFontSize] = useState("16");

  // Processing state
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [convertedFile, setConvertedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Normalize the route path.
  const routePath = useMemo(
    () => `/${category}/${tool}`.replace(/\/+/g, "/"),
    [category, tool],
  );

  // Find the current tool from constants.js.
  const selectedTool = allTools.find((item) => item.path === routePath);
  const title = selectedTool?.name || formatSlug(tool);

  // Tool identification.
  const isJpgToPdf = routePath === "/convert-to-pdf/jpg-to-pdf";
  const isPngToPdf = routePath === "/convert-to-pdf/png-to-pdf";
  const isMergePdf = routePath === "/tools/merge-pdf" || tool === "merge-pdf";
  const isSplitPdf = routePath === "/tools/split-pdf" || tool === "split-pdf";
  const isRotatePdf =
    routePath === "/edit-pdf/rotate-pages" || tool === "rotate-pages";

  const isDeletePages =
    routePath === "/edit-pdf/delete-pages" || tool === "delete-pages";

  const isAddSignature =
    routePath === "/tools/add-signature" || tool === "add-signature";

  const isEditPdf = routePath === "/tools/edit-pdf" || tool === "edit-pdf";

  const isCompressPdf =
    routePath === "/tools/compress-pdf" || tool === "compress-pdf";

  const isPdfToJpg =
    routePath === "/convert-from-pdf/pdf-to-jpg" || tool === "pdf-to-jpg";

  // Button label.
  const actionLabel = isJpgToPdf
    ? "Convert JPG to PDF"
    : isPngToPdf
      ? "Convert PNG to PDF"
      : isMergePdf
        ? "Merge PDFs"
        : isSplitPdf
          ? "Split PDF"
          : isRotatePdf
            ? "Rotate PDF"
            : isDeletePages
              ? "Delete Pages"
              : isAddSignature
                ? "Add Signature"
                : isEditPdf
                  ? "Apply Edit"
                  : isCompressPdf
                    ? "Compress PDF"
                    : isPdfToJpg
                      ? "Convert PDF to JPG"
                      : "Process File";

  // Handle selected files.
  const handleFileSelect = (files) => {
    const normalizedFiles = Array.isArray(files) ? files : files ? [files] : [];

    setSelectedFiles(normalizedFiles);
    setError("");
    setStatus("");
    setConvertedFile(null);
  };

  // Download a Blob.
  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  // Convert a supported image or text-based file into a PDF.
  const convertToPdf = async (file) => {
    const filename = file.name.toLowerCase();

    const isImage =
      file.type.startsWith("image/") || /\.(jpg|jpeg|png)$/i.test(filename);

    const isTextLike =
      file.type.startsWith("text/") ||
      /\.(txt|json|xml|html|csv|md)$/i.test(filename);

    const pdf = new jsPDF({
      unit: "pt",
      format: "a4",
    });

    // Image to PDF.
    if (isImage) {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);
        reader.onerror = () =>
          reject(new Error("Unable to read the image file."));

        reader.readAsDataURL(file);
      });

      const image = await new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Unable to load the image."));

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

      const imageFormat =
        file.type === "image/png" || filename.endsWith(".png") ? "PNG" : "JPEG";

      pdf.addImage(dataUrl, imageFormat, x, y, width, height);

      return pdf.output("blob");
    }

    // Text-based files to PDF.
    if (isTextLike) {
      const content = await file.text();

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 40;
      const lineHeight = 15;

      const lines = pdf.splitTextToSize(
        content || "(Empty file)",
        pageWidth - margin * 2,
      );

      let y = margin;

      for (const line of lines) {
        if (y + lineHeight > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }

        pdf.text(line, margin, y);
        y += lineHeight;
      }

      return pdf.output("blob");
    }

    throw new Error(
      "This file type is not supported by this PDF conversion tool.",
    );
  };

  // Main processing function.
  const handleConvert = async () => {
    if (loading) return;

    if (selectedFiles.length === 0) {
      setError("Please choose a file first.");
      return;
    }

    setError("");
    setStatus("Processing your file...");
    setConvertedFile(null);
    setLoading(true);

    try {
      const firstFile = selectedFiles[0];
      const baseName = removeExtension(firstFile.name);

      let outputBlob;
      let outputName;

      // JPG to PDF.
      if (isJpgToPdf) {
        const invalidFile = selectedFiles.find(
          (file) =>
            !/\.(jpg|jpeg)$/i.test(file.name) && file.type !== "image/jpeg",
        );

        if (invalidFile) {
          throw new Error(`"${invalidFile.name}" is not a JPG/JPEG image.`);
        }

        const pdfBytes = await imagesToPdf(selectedFiles);

        outputBlob = createPdfBlob(pdfBytes);
        outputName = "jpg-to-pdf.pdf";
      }

      // PNG to PDF.
      else if (isPngToPdf) {
        const invalidFile = selectedFiles.find(
          (file) => !/\.png$/i.test(file.name) && file.type !== "image/png",
        );

        if (invalidFile) {
          throw new Error(`"${invalidFile.name}" is not a PNG image.`);
        }

        const pdfBytes = await imagesToPdf(selectedFiles);

        outputBlob = createPdfBlob(pdfBytes);
        outputName = "png-to-pdf.pdf";
      }

      // Merge PDFs.
      else if (isMergePdf) {
        if (selectedFiles.length < 2) {
          throw new Error("Select at least two PDF files to merge.");
        }

        validatePdfFiles(selectedFiles);

        const pdfBytes = await mergePdfs(selectedFiles);

        outputBlob = createPdfBlob(pdfBytes);
        outputName = "merged.pdf";
      }

      // Split PDF.
      else if (isSplitPdf) {
        validatePdfFiles([firstFile]);

        const pages = parsePageNumbers(pageNumbers);
        const pdfBytes = await splitPdf(firstFile, pages);

        outputBlob = createPdfBlob(pdfBytes);
        outputName = `${baseName}-split.pdf`;
      }

      // Rotate PDF.
      else if (isRotatePdf) {
        validatePdfFiles([firstFile]);

        const degrees = Number(rotation);

        if (![90, 180, 270].includes(degrees)) {
          throw new Error("Choose a rotation of 90°, 180°, or 270°.");
        }

        const pdfBytes = await rotatePdf(firstFile, degrees);

        outputBlob = createPdfBlob(pdfBytes);
        outputName = `${baseName}-rotated.pdf`;
      }

      // Delete PDF pages.
      else if (isDeletePages) {
        validatePdfFiles([firstFile]);

        const pages = parsePageNumbers(pageNumbers);
        const pdfBytes = await deletePdfPages(firstFile, pages);

        outputBlob = createPdfBlob(pdfBytes);
        outputName = `${baseName}-edited.pdf`;
      }

      // Add signature.
      else if (isAddSignature) {
        validatePdfFiles([firstFile]);

        if (!signatureFile) {
          throw new Error("Please upload your signature image.");
        }

        if (!/^image\/(png|jpeg)$/.test(signatureFile.type)) {
          throw new Error("Signature must be a PNG or JPG image.");
        }

        const selectedPage = Number(pageNumber);

        if (!Number.isInteger(selectedPage) || selectedPage < 1) {
          throw new Error("Enter a valid PDF page number.");
        }

        const pdfBytes = await addSignature(
          firstFile,
          signatureFile,
          selectedPage,
          100,
          100,
          180,
          70,
        );

        outputBlob = createPdfBlob(pdfBytes);
        outputName = `${baseName}-signed.pdf`;
      }

      // Add text to an existing PDF.
      else if (isEditPdf) {
        validatePdfFiles([firstFile]);

        if (!editText.trim()) {
          throw new Error("Enter the text you want to add.");
        }

        const selectedPage = Number(editPage);
        const x = Number(editX);
        const y = Number(editY);
        const fontSize = Number(editFontSize);

        if (!Number.isInteger(selectedPage) || selectedPage < 1) {
          throw new Error("Enter a valid page number.");
        }

        if (!Number.isFinite(x) || !Number.isFinite(y) || x < 0 || y < 0) {
          throw new Error(
            "X and Y positions must be valid non-negative numbers.",
          );
        }

        if (!Number.isFinite(fontSize) || fontSize < 6 || fontSize > 72) {
          throw new Error("Font size must be between 6 and 72.");
        }

        const pdfBytes = await editPdf(
          firstFile,
          editText,
          selectedPage,
          x,
          y,
          fontSize,
        );

        outputBlob = createPdfBlob(pdfBytes);
        outputName = `${baseName}-edited.pdf`;
      }

      // Compress PDF.
      else if (isCompressPdf) {
        validatePdfFiles([firstFile]);

        const pdfBytes = await compressPdf(firstFile);

        outputBlob = createPdfBlob(pdfBytes);
        outputName = `${baseName}-compressed.pdf`;
      }

      // PDF to JPG.
      else if (isPdfToJpg) {
        validatePdfFiles([firstFile]);

        outputBlob = await pdfToJpg(firstFile);
        outputName = `${baseName}-jpg.zip`;
      }

      // Other supported to-PDF routes.
      else if (routePath.includes("to-pdf")) {
        outputBlob = await convertToPdf(firstFile);
        outputName = `${baseName}.pdf`;
      }

      // Unsupported tools.
      else {
        throw new Error(
          `${title} is not implemented yet. Its conversion logic must be added before it can work.`,
        );
      }

      setConvertedFile({
        blob: outputBlob,
        fileName: outputName,
      });

      setStatus(`Success! Your file is ready: ${outputName}`);
    } catch (conversionError) {
      console.error("PDF processing error:", conversionError);

      setStatus("");
      setError(
        conversionError?.message || "Processing failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Download the processed file.
  const handleDownloadConverted = () => {
    if (!convertedFile) return;

    downloadBlob(convertedFile.blob, convertedFile.fileName);
  };

  // Reusable input styling.
  const inputClass =
    "mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500";

  const labelClass = "block text-sm font-semibold text-slate-800";

  // Additional controls for individual tools.
  const renderExtraControls = () => {
    // Split PDF / Delete Pages.
    if (isSplitPdf || isDeletePages) {
      return (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <label className={labelClass}>
            {isSplitPdf ? "Pages to extract" : "Pages to delete"}
          </label>

          <input
            type="text"
            value={pageNumbers}
            onChange={(event) => setPageNumbers(event.target.value)}
            placeholder="Example: 1, 3, 5"
            className={inputClass}
          />

          <p className="mt-2 text-xs text-slate-500">
            Enter page numbers separated by commas, starting at page 1.
          </p>
        </div>
      );
    }

    // Rotate PDF.
    if (isRotatePdf) {
      return (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <label className={labelClass}>Rotation</label>

          <select
            value={rotation}
            onChange={(event) => setRotation(event.target.value)}
            className={inputClass}
          >
            <option value="90">Rotate 90°</option>
            <option value="180">Rotate 180°</option>
            <option value="270">Rotate 270°</option>
          </select>
        </div>
      );
    }

    // Signature controls.
    if (isAddSignature) {
      return (
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
          <div>
            <label className={labelClass}>Signature Image</label>

            <input
              type="file"
              accept=".png,.jpg,.jpeg,image/png,image/jpeg"
              onChange={(event) => {
                setSignatureFile(event.target.files?.[0] || null);
                setError("");
                setConvertedFile(null);
              }}
              className={inputClass}
            />

            <p className="mt-2 text-xs text-slate-500">
              Upload a PNG or JPG signature image.
            </p>

            {signatureFile && (
              <p className="mt-2 text-sm text-green-700">
                Selected: {signatureFile.name}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>PDF Page Number</label>

            <input
              type="number"
              min="1"
              value={pageNumber}
              onChange={(event) => setPageNumber(event.target.value)}
              className={inputClass}
            />
          </div>

          <p className="text-xs text-slate-500">
            The signature placement currently uses the default position and
            dimensions configured in the processing function.
          </p>
        </div>
      );
    }

    // Edit PDF controls.
    if (isEditPdf) {
      return (
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Add Text to PDF
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add a text overlay to a selected PDF page.
            </p>
          </div>

          <div>
            <label className={labelClass}>Text</label>

            <textarea
              value={editText}
              onChange={(event) => setEditText(event.target.value)}
              placeholder="Type the text you want to add"
              rows={3}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Page Number</label>

              <input
                type="number"
                min="1"
                value={editPage}
                onChange={(event) => setEditPage(event.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Font Size</label>

              <input
                type="number"
                min="6"
                max="72"
                value={editFontSize}
                onChange={(event) => setEditFontSize(event.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>X Position</label>

              <input
                type="number"
                min="0"
                value={editX}
                onChange={(event) => setEditX(event.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Y Position</label>

              <input
                type="number"
                min="0"
                value={editY}
                onChange={(event) => setEditY(event.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <p className="text-xs text-slate-500">
            X and Y positions use PDF coordinates. Depending on the PDF library,
            the origin may be at the bottom-left of the page.
          </p>
        </div>
      );
    }

    // Compression information.
    if (isCompressPdf) {
      return (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-lg font-semibold text-slate-900">Compress PDF</h2>

          <p className="mt-1 text-sm text-slate-500">
            This tool optimizes the PDF using the current compression function.
            The final file may not always be smaller than the original.
          </p>
        </div>
      );
    }

    return null;
  };

  // Multiple uploads are required for image-to-PDF and merge.
  const isMultipleUpload = isJpgToPdf || isPngToPdf || isMergePdf;

  // Accept the correct file formats.
  const uploadAccept = isJpgToPdf
    ? ".jpg,.jpeg,image/jpeg"
    : isPngToPdf
      ? ".png,image/png"
      : isMultipleUpload
        ? ".pdf,application/pdf"
        : routePath.includes("to-pdf")
          ? ".jpg,.jpeg,.png,.txt,.json,.xml,.html,.csv,.md,image/jpeg,image/png,text/plain"
          : ".pdf,application/pdf";

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
          PDF Tool
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">{title}</h1>

        <p className="mt-2 text-slate-600">
          Upload your file and use {title.toLowerCase()}.
        </p>
      </div>

      {/* Upload */}
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

      {/* Selected files */}
      {selectedFiles.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-800">
              Selected Files ({selectedFiles.length})
            </p>

            <button
              type="button"
              onClick={() => handleFileSelect([])}
              className="text-sm font-medium text-red-600 hover:text-red-700"
            >
              Clear files
            </button>
          </div>

          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between gap-3 rounded-md bg-slate-50 px-3 py-2 text-sm"
              >
                <span className="max-w-[70%] truncate text-slate-700">
                  {file.name}
                </span>

                <span className="shrink-0 text-xs text-slate-500">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tool-specific controls */}
      {renderExtraControls()}

      {/* Actions and messages */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleConvert}
            disabled={loading}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Processing..." : actionLabel}
          </button>

          <button
            type="button"
            onClick={handleDownloadConverted}
            disabled={!convertedFile || loading}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Download Converted File
          </button>
        </div>

        {status && (
          <p role="status" className="mt-3 break-words text-sm text-green-700">
            {status}
          </p>
        )}

        {error && (
          <p role="alert" className="mt-3 break-words text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </section>
  );
};

export default ToolPage;
