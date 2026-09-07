//Convert to PDF tools array
export const convertToPdfTools = [
  { name: "JPG to PDF", path: "/convert-to-pdf/jpg-to-pdf" },
  { name: "Word to PDF", path: "/convert-to-pdf/word-to-pdf" },
  { name: "Excel to PDF", path: "/convert-to-pdf/excel-to-pdf" },
  { name: "PPT to PDF", path: "/convert-to-pdf/ppt-to-pdf" },
  { name: "PNG to PDF", path: "/convert-to-pdf/png-to-pdf" },
  { name: "PDF Convert", path: "/convert-to-pdf/pdf-convert" },
  { name: "IMG to Text", path: "/convert-to-pdf/img-to-text" },
  { name: "IMG to Excel", path: "/convert-to-pdf/img-to-excel" },
  { name: "HTML to PDF", path: "/convert-to-pdf/html-to-pdf" },
];
//Convert from PDF tools array
export const convertFromPdfTools = [
  { name: "PDF to JPG", path: "/convert-from-pdf/pdf-to-jpg" },
  { name: "PDF to Word", path: "/convert-from-pdf/pdf-to-word" },
  { name: "PDF to Excel", path: "/convert-from-pdf/pdf-to-excel" },
  { name: "PDF to PNG", path: "/convert-from-pdf/pdf-to-png" },
  { name: "PDF to PPT", path: "/convert-from-pdf/pdf-to-ppt" },
  { name: "PDF to PDF/A", path: "/convert-from-pdf/pdf-to-pdfa" },
];
//Edit PDF tools array
export const editPdfTools = [
  { name: "Edit PDF", path: "/edit-pdf/edit" },
  { name: "Crop PDF", path: "/edit-pdf/crop" },
  { name: "Delete PDF Pages", path: "/edit-pdf/delete-pages" },
  { name: "Rotate PDF Pages", path: "/edit-pdf/rotate-pages" },
  { name: "Reorder PDF Pages", path: "/edit-pdf/reorder-pages" },
  { name: "Insert PDF Pages", path: "/edit-pdf/insert-pages" },
  { name: "Number PDF Pages", path: "/edit-pdf/number-pages" },
];
//Smart Tools array
export const smartTools = [
  { name: "Merge PDFs", path: "/tools/merge-pdf", featured: true },
  { name: "Split PDF", path: "/tools/split-pdf" },
  { name: "Compress PDF", path: "/tools/compress-pdf", featured: true },
  { name: "Add Signature", path: "/tools/add-signature" },
  { name: "IMG to Text", path: "/tools/img-to-text" },
  { name: "IMG to Excel", path: "/tools/img-to-excel" },
];
//Categories array
export const categories = [
  { title: "Convert To PDF", slug: "convert-to-pdf", tools: convertToPdfTools },
  { title: "Convert From PDF", slug: "convert-from-pdf", tools: convertFromPdfTools },
  { title: "Edit PDF Features", slug: "edit-pdf", tools: editPdfTools },
  { title: "Popular PDF Tools", slug: "tools", tools: smartTools },
];
