import { Link } from "react-router-dom";
const ToolCard = ({ tool }) => {
  return (
    <Link
      to={tool.path}
      className={`group rounded-xl border bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md ${
        tool.featured
          ? "border-red-300 ring-1 ring-red-100"
          : "border-slate-200"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-800 sm:text-base">
          {tool.name}
        </h3>
        {tool.featured && (
          <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
            Featured
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-slate-500">
        Open tool and start processing file.
      </p>
      <span className="mt-3 inline-flex text-sm font-medium text-red-600 group-hover:text-red-500">
        Open
      </span>
    </Link>
  );
};

export default ToolCard;
