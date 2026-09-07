import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import CategorySection from "../components/CategorySection";
import UploadBox from "../components/UploadBox";
import {
  convertFromPdfTools,
  convertToPdfTools,
  editPdfTools,
  smartTools,
} from "../utils/constants";

//categories map
const categoryMap = {
  "convert-to-pdf": {
    title: "Convert To PDF",
    tools: convertToPdfTools,
  },
  "convert-from-pdf": {
    title: "Convert From PDF",
    tools: convertFromPdfTools,
  },
  "edit-pdf": {
    title: "Edit PDF Features",
    tools: editPdfTools,
  },
  tools: {
    title: "Popular PDF Tools",
    tools: smartTools,
  },
};
//Format title function
const formatTitle = (value = "") =>
  value
    .split("-")
    .filter(Boolean)
    .map((token) => token[0]?.toUpperCase() + token.slice(1))
    .join(" ");

//category page component
const CategoryPage = () => {
  const { category = "" } = useParams();

  if (category === "convert-pdf") {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-slate-900">Convert PDF</h1>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-semibold text-slate-900">
                Convert To PDF
              </h2>
              <div className="space-y-2">
                {convertToPdfTools.map((tool) => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className="block text-lg text-slate-700 transition hover:text-red-600"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-3xl font-semibold text-slate-900">
                Convert From PDF
              </h2>
              <div className="space-y-2">
                {convertFromPdfTools.map((tool) => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className="block text-lg text-slate-700 transition hover:text-red-600"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const data = useMemo(() => categoryMap[category], [category]);

  if (!data) {
    return (
      <section>
        <h1 className="text-3xl font-bold text-slate-900">
          {formatTitle(category)}
        </h1>
        <p className="mt-2 text-slate-600">Category not found.</p>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-slate-900">{data.title}</h1>
      {category === "edit-pdf" && <UploadBox title="Upload PDF for Editing" />}
      <CategorySection title={data.title} tools={data.tools} />
    </div>
  );
};

export default CategoryPage;
