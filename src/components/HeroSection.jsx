import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 px-6 py-10 text-white sm:px-10">
      <p className="mb-3 inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
        Responsive PDF Suite
      </p>
      <h1 className="max-w-2xl text-3xl font-extrabold sm:text-4xl">
        All PDF tools in one place - convert, edit, merge, split, compress, and
        sign.
      </h1>
      <p className="mt-4 max-w-2xl text-sm text-red-50 sm:text-base">
        Upload your files, pick a tool, and quickly process documents with a
        clean workflow for desktop and mobile.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-red-600"
          to="tools/convert-pdf"
        >
          Convert to PDF
        </Link>
        <Link
          className="rounded-md border border-white/70 px-4 py-2 text-sm font-semibold text-white"
          to="/tools/merge-pdf"
        >
          Merge PDFs
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
