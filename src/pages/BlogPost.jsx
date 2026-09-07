import { Link, useParams } from "react-router-dom";
const posts = {
  "jpg-png-to-pdf": {
    category: "PDF CONVERSION",
    title: "How to Convert JPG and PNG Images to PDF",
    description:
      "Learn how to convert JPG and PNG images into clean PDF documents.",
    content: [
      {
        heading: "Why convert images to PDF?",
        text:
          "Images are useful for sharing, but PDF files are often easier to organize, print, and share as documents. Converting images to PDF can also keep multiple images together in a single file.",
      },
      {
        heading: "Convert JPG to PDF",
        text:
          "Open the JPG to PDF tool, upload one or more JPG images, and start the conversion. PDF Editor creates a PDF document containing the selected images.",
      },
      {
        heading: "Convert PNG to PDF",
        text:
          "The PNG to PDF workflow works in a similar way. Upload your PNG images and use the conversion button to create your PDF.",
      },
    ],
    toolLink: "/convert-to-pdf/jpg-to-pdf",
    toolText: "Convert Images to PDF",
  },

  "merge-pdf": {
    category: "PDF TOOLS",
    title: "How to Merge Multiple PDF Files",
    description:
      "Combine multiple PDF files into one organized document.",
    content: [
      {
        heading: "What is PDF merging?",
        text:
          "PDF merging combines two or more PDF documents into a single PDF file. This can be useful when several related documents need to be shared together.",
      },
      {
        heading: "How to merge PDFs",
        text:
          "Open the Merge PDF tool and select at least two PDF files. PDF Editor processes the selected files and creates one merged PDF document.",
      },
      {
        heading: "Keep your documents organized",
        text:
          "Merging related documents can make file management easier by reducing multiple files into one document.",
      },
    ],
    toolLink: "/tools/merge-pdf",
    toolText: "Merge PDF Files",
  },

  "split-delete-pdf-pages": {
    category: "PDF MANAGEMENT",
    title: "How to Split and Delete PDF Pages",
    description:
      "Learn how to extract selected pages and remove unwanted pages from PDF documents.",
    content: [
      {
        heading: "Splitting PDF pages",
        text:
          "PDF splitting allows you to create a new PDF containing selected pages from an existing document.",
      },
      {
        heading: "Selecting pages",
        text:
          "Enter the page numbers you want to keep, separated by commas. For example, you can enter 1, 3, 5 to select specific pages.",
      },
      {
        heading: "Deleting unwanted pages",
        text:
          "The Delete PDF Pages tool lets you specify pages that should be removed while keeping the remaining document pages.",
      },
    ],
    toolLink: "/tools/split-pdf",
    toolText: "Split PDF",
  },

  "edit-pdf-add-text": {
    category: "PDF EDITING",
    title: "How to Edit a PDF and Add Text",
    description:
      "Add text overlays to an existing PDF page.",
    content: [
      {
        heading: "Adding text to a PDF",
        text:
          "PDF Editor can add text to an existing PDF page without requiring a separate desktop application.",
      },
      {
        heading: "Customize the text",
        text:
          "You can specify the page number, text content, font size, and position for the text you want to add.",
      },
      {
        heading: "A simple editing workflow",
        text:
          "Upload your PDF, enter the text, choose the page and position, and apply the edit to create a new PDF file.",
      },
    ],
    toolLink: "/tools/edit-pdf",
    toolText: "Edit PDF",
  },

  "add-signature-to-pdf": {
    category: "DIGITAL DOCUMENTS",
    title: "How to Add a Signature to a PDF",
    description:
      "Add a signature image to a selected PDF page.",
    content: [
      {
        heading: "Why add a digital signature?",
        text:
          "Adding a signature image can make document workflows more convenient when a signed document needs to be shared digitally.",
      },
      {
        heading: "Upload your signature",
        text:
          "PDF Editor supports PNG and JPG signature images. Upload your PDF first and then provide the signature image.",
      },
      {
        heading: "Choose the page",
        text:
          "Select the PDF page where the signature should be placed and apply the signature to create a new PDF.",
      },
    ],
    toolLink: "/tools/add-signature",
    toolText: "Add Signature",
  },

  "pdf-productivity-tools": {
    category: "PDF PRODUCTIVITY",
    title: "Useful PDF Tools for Everyday Work",
    description:
      "Explore practical PDF tools for everyday document management.",
    content: [
      {
        heading: "Merge PDFs",
        text:
          "Combine multiple PDF files into a single document when you need to organize related files.",
      },
      {
        heading: "Split and delete pages",
        text:
          "Extract selected pages or remove unwanted pages from an existing PDF.",
      },
      {
        heading: "Rotate pages",
        text:
          "Rotate PDF pages by 90, 180, or 270 degrees when document orientation needs to be corrected.",
      },
      {
        heading: "Add text and signatures",
        text:
          "Add text overlays or signature images to PDF documents as part of your document workflow.",
      },
      {
        heading: "Convert PDF to JPG",
        text:
          "Convert PDF pages into JPG images when an image format is more convenient for sharing or other workflows.",
      },
      {
        heading: "Compress PDFs",
        text:
          "Use PDF compression to re-save a PDF with optimized internal structure and potentially reduce its file size.",
      },
    ],
    toolLink: "/tools/merge-pdf",
    toolText: "Explore PDF Tools",
  },
};

const BlogPost = () => {
  const { slug: urlSlug } = useParams();
  const slug = decodeURIComponent(urlSlug || "")
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "");
  const post = posts[slug];
  // Article not found
  if (!post) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          Article Not Found
        </h1>

        <p className="mt-3 text-slate-600">
          The blog article you are looking for does not exist.
        </p>

        <Link
          to="/blog"
          className="mt-6 inline-flex rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
        >
          ← Back to Blog
        </Link>
      </section>
    );
  }

  return (
    <article className="space-y-6">
      {/* ARTICLE HEADER */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <Link
          to="/blog"
          className="text-sm font-semibold text-red-600 hover:text-red-500"
        >
          ← Back to Blog
        </Link>

        <div className="mt-6 max-w-3xl">
          <span className="text-xs font-bold tracking-wider text-red-600">
            {post.category}
          </span>

          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {post.title}
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            {post.description}
          </p>
        </div>
      </section>

      {/* ARTICLE CONTENT */}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="max-w-3xl space-y-8">
          {post.content.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                {section.heading}
              </h2>

              <p className="mt-3 text-base leading-7 text-slate-600">
                {section.text}
              </p>
            </section>
          ))}
        </div>
      </section>

      {/* TOOL CTA */}
      <section className="rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
        <div className="max-w-3xl">
          <h2 className="text-xl font-bold sm:text-2xl">
            Ready to try it?
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Use PDF Editor to work with your document directly in your
            browser.
          </p>

          <Link
            to={post.toolLink}
            className="mt-5 inline-flex items-center rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
          >
            {post.toolText}
            <span className="ml-2">→</span>
          </Link>
        </div>
      </section>
    </article>
  );
};

export default BlogPost;