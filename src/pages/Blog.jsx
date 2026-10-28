import { Link } from "react-router-dom";

const posts = [
  {
    slug: "jpg-png-to-pdf",
    title: "How to Convert JPG and PNG to PDF",
    description:
      "Learn how to quickly convert JPG and PNG images into clean, shareable PDF documents.",
  },
  {
    slug: "merge-pdf",
    title: "How to Merge Multiple PDF Files",
    description:
      "Combine multiple PDF documents into one organized file using a simple workflow.",
  },
  {
    slug: "split-delete-pdf-pages",
    title: "How to Split and Delete PDF Pages",
    description:
      "Learn how to extract selected pages and remove unwanted pages from PDF documents.",
  },
  {
    slug: "edit-pdf-add-text",
    title: "How to Edit a PDF and Add Text",
    description:
      "Learn how to add text to PDF documents directly from your browser.",
  },
  {
    slug: "add-signature-to-pdf",
    title: "How to Add a Signature to a PDF",
    description:
      "Add a signature image to your PDF documents quickly and easily.",
  },
  {
    slug: "pdf-productivity-tools",
    title: "Top PDF Productivity Tools",
    description:
      "Discover useful PDF tools for merging, splitting, rotating, compressing, signing, and more.",
  },
];

export default function Blog() {
  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-slate-900">PDF Editor Blog</h1>

        <p className="mt-3 max-w-2xl text-slate-600">
          Explore PDF conversion tips, tutorials, productivity guides, and
          practical ways to work with PDF documents.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h2 className="text-lg font-bold text-slate-900">{post.title}</h2>

            <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
              {post.description}
            </p>

            <Link
              to={`/blog/${post.slug}`}
              className="font-semibold text-red-600 hover:text-red-500"
            >
              Read Guide →
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
