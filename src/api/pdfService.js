import {
  PDFDocument,
  degrees,
  StandardFonts,
  rgb,
} from "pdf-lib";

import {
  getDocument,
  GlobalWorkerOptions,
} from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import JSZip from "jszip";

// PDF.js worker configuration
GlobalWorkerOptions.workerSrc = pdfWorker;
// JPG / PNG → PDF
export async function imagesToPdf(files) {
  if (!files || files.length === 0) {
    throw new Error(
      "Please select at least one JPG or PNG image."
    );
  }

  const pdfDoc = await PDFDocument.create();

  const A4_WIDTH = 595.28;
  const A4_HEIGHT = 841.89;
  const MARGIN = 20;

  for (const file of files) {
    if (
      !["image/jpeg", "image/png"].includes(
        file.type
      )
    ) {
      throw new Error(
        `${file.name} is not a JPG or PNG image.`
      );
    }

    const imageBytes =
      await file.arrayBuffer();

    const image =
      file.type === "image/jpeg"
        ? await pdfDoc.embedJpg(imageBytes)
        : await pdfDoc.embedPng(imageBytes);

    const maxWidth =
      A4_WIDTH - MARGIN * 2;

    const maxHeight =
      A4_HEIGHT - MARGIN * 2;

    const scale = Math.min(
      maxWidth / image.width,
      maxHeight / image.height
    );

    const drawWidth =
      image.width * scale;

    const drawHeight =
      image.height * scale;

    const page =
      pdfDoc.addPage([
        A4_WIDTH,
        A4_HEIGHT,
      ]);

    page.drawImage(image, {
      x:
        (A4_WIDTH - drawWidth) / 2,
      y:
        (A4_HEIGHT - drawHeight) / 2,
      width: drawWidth,
      height: drawHeight,
    });
  }

  return pdfDoc.save();
}
// MERGE PDF
export const mergePdfs = async (files) => {
  if (!Array.isArray(files) || files.length < 2) {
    throw new Error(
      "Please select at least 2 PDF files to merge."
    );
  }

  const mergedPdf =
    await PDFDocument.create();

  for (const file of files) {
    if (
      file.type !== "application/pdf" &&
      !file.name
        .toLowerCase()
        .endsWith(".pdf")
    ) {
      throw new Error(
        `"${file.name}" is not a valid PDF file.`
      );
    }

    const fileBytes =
      await file.arrayBuffer();

    const sourcePdf =
      await PDFDocument.load(
        fileBytes
      );

    const pageIndices =
      sourcePdf
        .getPages()
        .map(
          (_, index) => index
        );

    const copiedPages =
      await mergedPdf.copyPages(
        sourcePdf,
        pageIndices
      );

    copiedPages.forEach(
      (page) => {
        mergedPdf.addPage(
          page
        );
      }
    );
  }

  return await mergedPdf.save();
};
// SPLIT PDF
export async function splitPdf(
  file,
  pageNumbers
) {
  if (
    !file ||
    file.type !== "application/pdf"
  ) {
    throw new Error(
      "Please select a PDF file."
    );
  }

  if (
    !pageNumbers ||
    pageNumbers.length === 0
  ) {
    throw new Error(
      "Please select at least one page."
    );
  }

  const sourcePdf =
    await PDFDocument.load(
      await file.arrayBuffer()
    );

  const totalPages =
    sourcePdf.getPageCount();

  const selectedPages = [
    ...new Set(
      pageNumbers
        .map(
          (page) =>
            Number(page) - 1
        )
        .filter(
          (page) =>
            page >= 0 &&
            page < totalPages
        )
    ),
  ];

  if (
    selectedPages.length === 0
  ) {
    throw new Error(
      `Invalid page number. This PDF has ${totalPages} page(s).`
    );
  }

  const newPdf =
    await PDFDocument.create();

  const copiedPages =
    await newPdf.copyPages(
      sourcePdf,
      selectedPages
    );

  copiedPages.forEach((page) => {
    newPdf.addPage(page);
  });

  return newPdf.save();
}
// ROTATE PDF
export async function rotatePdf(
  file,
  rotation = 90
) {
  if (
    !file ||
    file.type !== "application/pdf"
  ) {
    throw new Error(
      "Please select a PDF file."
    );
  }

  const validRotations = [
    90,
    180,
    270,
  ];

  if (
    !validRotations.includes(
      Number(rotation)
    )
  ) {
    throw new Error(
      "Rotation must be 90, 180, or 270 degrees."
    );
  }

  const pdfDoc =
    await PDFDocument.load(
      await file.arrayBuffer()
    );

  pdfDoc
    .getPages()
    .forEach((page) => {
      const currentRotation =
        page.getRotation().angle;

      const newRotation =
        (currentRotation +
          Number(rotation)) %
        360;

      page.setRotation(
        degrees(newRotation)
      );
    });

  return pdfDoc.save();
}

// DELETE PDF PAGES
export async function deletePdfPages(
  file,
  pageNumbers
) {
  if (
    !file ||
    file.type !== "application/pdf"
  ) {
    throw new Error(
      "Please select a PDF file."
    );
  }

  if (
    !pageNumbers ||
    pageNumbers.length === 0
  ) {
    throw new Error(
      "Please select pages to delete."
    );
  }

  const pdfDoc =
    await PDFDocument.load(
      await file.arrayBuffer()
    );

  const totalPages =
    pdfDoc.getPageCount();

  const pagesToDelete = [
    ...new Set(
      pageNumbers
        .map(
          (page) =>
            Number(page) - 1
        )
        .filter(
          (page) =>
            page >= 0 &&
            page < totalPages
        )
    ),
  ].sort(
    (a, b) => b - a
  );

  if (
    pagesToDelete.length === 0
  ) {
    throw new Error(
      `Invalid page number. This PDF has ${totalPages} page(s).`
    );
  }

  if (
    pagesToDelete.length >=
    totalPages
  ) {
    throw new Error(
      "You cannot delete all pages from the PDF."
    );
  }

  for (
    const pageIndex of pagesToDelete
  ) {
    pdfDoc.removePage(
      pageIndex
    );
  }

  return pdfDoc.save();
}
// ADD SIGNATURE
export async function addSignature(
  pdfFile,
  signatureFile,
  pageNumber = 1,
  x = 100,
  y = 100,
  width = 180,
  height = 70
) {
  if (
    !pdfFile ||
    pdfFile.type !== "application/pdf"
  ) {
    throw new Error(
      "Please select a PDF file."
    );
  }

  if (!signatureFile) {
    throw new Error(
      "Please select a signature image."
    );
  }

  if (
    ![
      "image/png",
      "image/jpeg",
    ].includes(
      signatureFile.type
    )
  ) {
    throw new Error(
      "Signature must be PNG or JPG."
    );
  }

  const pdfDoc =
    await PDFDocument.load(
      await pdfFile.arrayBuffer()
    );

  const pages =
    pdfDoc.getPages();

  const pageIndex =
    Number(pageNumber) - 1;

  if (
    pageIndex < 0 ||
    pageIndex >= pages.length
  ) {
    throw new Error(
      `Invalid page number. This PDF has ${pages.length} page(s).`
    );
  }

  const signatureBytes =
    await signatureFile.arrayBuffer();

  const signatureImage =
    signatureFile.type ===
      "image/png"
      ? await pdfDoc.embedPng(
        signatureBytes
      )
      : await pdfDoc.embedJpg(
        signatureBytes
      );

  pages[pageIndex].drawImage(
    signatureImage,
    {
      x,
      y,
      width,
      height,
    }
  );

  return pdfDoc.save();
}

// =========================================================
// EDIT PDF
// Adds text to selected PDF page
// =========================================================

export async function editPdf(
  file,
  text,
  pageNumber = 1,
  x = 60,
  y = 700,
  fontSize = 16
) {
  if (
    !file ||
    file.type !== "application/pdf"
  ) {
    throw new Error(
      "Please select a PDF file."
    );
  }

  if (!text || !text.trim()) {
    throw new Error(
      "Please enter the text you want to add."
    );
  }

  const pdfDoc =
    await PDFDocument.load(
      await file.arrayBuffer()
    );

  const pages =
    pdfDoc.getPages();

  const pageIndex =
    Number(pageNumber) - 1;

  const size =
    Number(fontSize);

  if (
    pageIndex < 0 ||
    pageIndex >= pages.length
  ) {
    throw new Error(
      `Invalid page number. This PDF has ${pages.length} page(s).`
    );
  }

  if (
    !Number.isFinite(size) ||
    size < 6 ||
    size > 72
  ) {
    throw new Error(
      "Font size must be between 6 and 72."
    );
  }

  const page =
    pages[pageIndex];

  const font =
    await pdfDoc.embedFont(
      StandardFonts.Helvetica
    );

  const maxX =
    page.getWidth();

  const maxY =
    page.getHeight();

  const safeX =
    Math.max(
      0,
      Math.min(
        Number(x),
        maxX - 10
      )
    );

  const safeY =
    Math.max(
      0,
      Math.min(
        Number(y),
        maxY - size
      )
    );

  page.drawText(
    text.trim(),
    {
      x: safeX,
      y: safeY,
      size,
      font,
      color: rgb(0, 0, 0),
      lineHeight: size * 1.2,
      maxWidth:
        Math.max(
          10,
          maxX - safeX - 20
        ),
    }
  );

  return pdfDoc.save();
}

// =========================================================
// COMPRESS PDF
// =========================================================

export async function compressPdf(
  file
) {
  if (
    !file ||
    file.type !== "application/pdf"
  ) {
    throw new Error(
      "Please select a PDF file."
    );
  }

  const pdfDoc =
    await PDFDocument.load(
      await file.arrayBuffer()
    );

  return pdfDoc.save({
    useObjectStreams: true,
    addDefaultPage: false,
    objectsPerTick: 50,
  });
}

// =========================================================
// DOWNLOAD PDF
// =========================================================

export function downloadPdf(
  pdfBytes,
  fileName = "output.pdf"
) {
  if (!pdfBytes) {
    throw new Error(
      "No PDF data available for download."
    );
  }

  const blob =
    new Blob(
      [pdfBytes],
      {
        type: "application/pdf",
      }
    );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download =
    fileName;

  document.body.appendChild(
    link
  );

  link.click();

  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 100);
}
// PDF → JPG
// Converts every PDF page into a JPG image.
// Multiple JPG images are returned as a ZIP file.
export async function pdfToJpg(file) {
  if (!file) {
    throw new Error("Please select a PDF file.");
  }

  if (file.type !== "application/pdf") {
    throw new Error("Please select a PDF file.");
  }

  const pdfBytes = await file.arrayBuffer();

  const pdf = await getDocument({
    data: pdfBytes,
  }).promise;

  const totalPages = pdf.numPages;

  if (totalPages === 0) {
    throw new Error("The PDF does not contain any pages.");
  }

  const zip = new JSZip();

  for (
    let pageNumber = 1;
    pageNumber <= totalPages;
    pageNumber++
  ) {
    const page =
      await pdf.getPage(pageNumber);

    // Higher scale = better JPG quality
    const viewport =
      page.getViewport({
        scale: 2,
      });

    const canvas =
      document.createElement("canvas");

    const context =
      canvas.getContext("2d");

    if (!context) {
      throw new Error(
        "Unable to create canvas."
      );
    }

    canvas.width =
      Math.ceil(viewport.width);

    canvas.height =
      Math.ceil(viewport.height);

    await page.render({
      canvasContext: context,
      viewport,
    }).promise;

    const jpgBlob =
      await new Promise(
        (resolve, reject) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(
                  new Error(
                    "Unable to convert PDF page to JPG."
                  )
                );
                return;
              }

              resolve(blob);
            },
            "image/jpeg",
            0.92
          );
        }
      );

    const imageBytes =
      await jpgBlob.arrayBuffer();

    const fileName =
      `page-${pageNumber}.jpg`;

    zip.file(
      fileName,
      imageBytes
    );

    // Free canvas memory
    canvas.width = 1;
    canvas.height = 1;
  }

  await pdf.destroy();

  const zipBlob =
    await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: {
        level: 6,
      },
      mimeType: "application/zip",
    });

  return zipBlob;
}

