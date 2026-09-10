# PDF EDITOR

A modern, browser-based PDF toolkit built with **React, Vite, Tailwind CSS, PDF-Lib, PDF.js, and jsPDF**.

PDFNexus provides a collection of PDF conversion, editing, and utility tools through a clean and user-friendly web interface. The application is designed to process supported files directly in the browser, making common PDF tasks simple and accessible.

---

## 🚀 Features

### 📄 Convert to PDF

Convert different file formats into PDF documents.

* JPG to PDF
* PNG to PDF
* Word to PDF
* Excel to PDF
* PowerPoint to PDF
* HTML to PDF
* Image to Text
* Image to Excel

### 🔄 Convert from PDF

Convert PDF files into other useful formats.

* PDF to JPG
* PDF to PNG
* PDF to Word
* PDF to Excel
* PDF to PowerPoint
* PDF to PDF/A

### ✏️ Edit PDF

Tools for modifying PDF documents.

* Edit PDF
* Crop PDF
* Delete PDF Pages
* Rotate PDF Pages
* Reorder PDF Pages
* Insert PDF Pages
* Number PDF Pages

### 🛠️ Popular PDF Tools

Quick-access tools for common PDF tasks.

* Merge PDFs
* Split PDF
* Compress PDF
* Add Signature
* Image to Text
* Image to Excel

---

## ✨ Key Highlights

* Modern and responsive user interface
* Browser-based PDF processing
* Drag-and-drop/file upload workflow
* Multiple PDF utilities in one application
* Client-side PDF manipulation
* Automatic file downloads
* PDF page rotation
* PDF page deletion
* PDF splitting
* PDF merging
* PDF compression
* Digital signature image support
* PDF-to-JPG export
* Image and text-to-PDF conversion
* React Router based navigation
* Reusable React components

---

## 🧰 Tech Stack

### Frontend

* **React 19**
* **Vite**
* **React Router**
* **Tailwind CSS**

### PDF & File Processing

* **PDF-Lib** — PDF creation and manipulation
* **PDF.js** — PDF rendering and processing
* **jsPDF** — PDF generation
* **JSZip** — ZIP archive generation

### Development Tools

* ESLint
* PostCSS
* Autoprefixer

---

## 📁 Project Structure

```text
PDFProject/
└── Frontend/
    └── MyPdfEditor/
        ├── public/
        │   └── pdf-editor-icon.svg
        │
        ├── src/
        │   ├── api/
        │   │   └── pdfService.js
        │   │
        │   ├── assets/
        │   │   └── icons.svg
        │   │
        │   ├── components/
        │   │   ├── CategorySection.jsx
        │   │   ├── Footer.jsx
        │   │   ├── HeroSection.jsx
        │   │   ├── Navbar.jsx
        │   │   ├── ToolCard.jsx
        │   │   └── UploadBox.jsx
        │   │
        │   ├── hooks/
        │   │   └── useFileUpload.js
        │   │
        │   ├── pages/
        │   │   ├── Blog.jsx
        │   │   ├── BlogPost.jsx
        │   │   ├── CategoryPage.jsx
        │   │   ├── ContactUs.jsx
        │   │   ├── Home.jsx
        │   │   ├── NotFound.jsx
        │   │   └── ToolPage.jsx
        │   │
        │   ├── routes/
        │   │   └── AppRoutes.jsx
        │   │
        │   ├── templates/
        │   │   └── AppLayout.jsx
        │   │
        │   ├── themes/
        │   │   └── global.css
        │   │
        │   ├── utils/
        │   │   └── constants.js
        │   │
        │   ├── validators/
        │   │   └── fileValidators.js
        │   │
        │   ├── app.jsx
        │   └── main.jsx
        │
        ├── index.html
        ├── package.json
        ├── tailwind.config.js
        ├── postcss.config.js
        ├── vite.config.js
        └── eslint.config.js
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm

You can verify your installation with:

```bash
node --version
npm --version
```

---

## 📥 Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate to the frontend project:

```bash
cd PDFProject/Frontend/MyPdfEditor
```

Install dependencies:

```bash
npm install
```

---

## 💻 Development

Start the Vite development server:

```bash
npm run dev
```

The application will be available at the local development URL displayed by Vite.

---

## 🏗️ Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🔍 Linting

Run ESLint to check the project:

```bash
npm run lint
```

---

## 🔧 PDF Processing Architecture

PDFNexus uses a client-side processing architecture for supported operations.

The main PDF operations are organized inside:

```text
src/api/pdfService.js
```

The application uses libraries such as PDF-Lib, PDF.js, jsPDF, and JSZip to perform different document operations.

The main tool interface is handled by:

```text
src/pages/ToolPage.jsx
```

The application dynamically identifies the selected tool from the current route and executes the corresponding PDF operation.

---

## 🧩 Main Components

### `UploadBox`

Handles file selection and upload interactions.

### `ToolPage`

Provides the main processing interface for individual PDF tools.

### `CategorySection`

Displays groups of PDF utilities on the homepage.

### `ToolCard`

Displays individual PDF tools and navigation options.

### `Navbar`

Provides primary application navigation.

### `Footer`

Provides footer navigation and supporting information.

---

## 🛡️ File Processing

PDFNexus validates uploaded files before processing them.

Supported operations may require specific file types, such as:

* PDF
* JPG/JPEG
* PNG
* Text-based files
* Signature images

Invalid or unsupported files are rejected with user-friendly error messages.

---

## 📌 Current Implementation

The project contains a broad set of PDF tools and routes. Some tools have dedicated processing implementations, while other listed tools may still require their processing logic to be completed.

Currently implemented processing includes functionality such as:

* JPG/PNG to PDF
* Merge PDF
* Split PDF
* Rotate PDF
* Delete PDF pages
* Add signature
* Add text/edit PDF
* Compress PDF
* PDF to JPG
* Basic text/image-to-PDF conversion

Additional conversion and editing routes can be extended through `pdfService.js` and `ToolPage.jsx`.

---

## 🎯 Future Improvements

Potential improvements include:

* PDF preview before processing
* Drag-and-drop multi-file uploads
* Advanced PDF editing
* Text and image positioning
* Page reordering UI
* PDF cropping interface
* PDF metadata editing
* OCR integration
* More accurate Office document conversion
* PDF password protection
* PDF unlock functionality
* Watermark tools
* Batch processing
* Improved compression algorithms
* Cloud storage integration
* User accounts and document history
* Mobile UI optimization
* Progress indicators for large files
* Automated testing

---

## 🔐 Privacy

PDFNexus is designed around browser-based file processing for supported operations.

Files should be processed locally whenever the selected operation supports client-side processing. Users should still review the application's implementation and deployment configuration before making specific privacy or security claims.

---

## 📄 License

This project does not currently specify a license.

If you plan to publish or distribute PDFNexus, add an appropriate license such as MIT, Apache-2.0, or another license that matches your intended usage.

---

## 👨‍💻 Author

** Md Shahid**

Built as a modern web-based PDF utility platform using React and browser-based document processing technologies.

---

## ⭐ Contributing

Contributions, suggestions, and improvements are welcome.

To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Test the application.
5. Run the linter and production build.
6. Submit a pull request.

```bash
npm run lint
npm run build
```

---

## 📬 Feedback

If you find a bug or have an idea for a new PDF tool, open an issue or submit a pull request.
