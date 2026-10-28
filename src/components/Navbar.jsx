import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { convertFromPdfTools, convertToPdfTools } from "../utils/constants";

// Primary navigation items
const primaryNavItems = [
  { label: "Edit PDF", href: "/tools/edit-pdf" },
  { label: "Merge PDF", href: "/tools/merge-pdf" },
  { label: "Compress PDF", href: "/tools/compress-pdf" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
];
//Convert groups
const convertGroups = [
  {
    title: "Convert To PDF",
    tools: convertToPdfTools,
  },

  {
    title: "Convert From PDF",
    tools: convertFromPdfTools,
  },
];
//Link styles
const linkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-red-50 text-red-600"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

//Navbar component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConvertOpen, setIsConvertOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link className="text-xl font-bold text-red-600" to="/">
          PDF Editor
        </Link>

        <button
          type="button"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Menu
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink className={linkClass} to="/">
            Home
          </NavLink>
          <div className="relative">
            <button
              type="button"
              className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                isConvertOpen
                  ? "bg-red-50 text-red-600"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
              onClick={() => setIsConvertOpen((prev) => !prev)}
            >
              Convert PDF
            </button>
            <div
              className={`absolute left-0 top-full z-20 mt-2 w-[42rem] rounded-lg border border-slate-200 bg-white p-4 shadow-lg transition ${
                isConvertOpen ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <div className="grid grid-cols-2 gap-6">
                {convertGroups.map((group) => (
                  <div key={group.title}>
                    <h3 className="mb-2 px-3 text-base font-semibold text-slate-900">
                      {group.title}
                    </h3>
                    <div className="space-y-1">
                      {group.tools.map((tool) => (
                        <Link
                          key={tool.path}
                          to={tool.path}
                          onClick={() => setIsConvertOpen(false)}
                          className="block rounded-md px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-red-600"
                        >
                          {tool.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {primaryNavItems.map((item) => (
            <NavLink key={item.href} className={linkClass} to={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            <NavLink
              className={linkClass}
              to="/"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              className={linkClass}
              to="/convert-pdf"
              onClick={() => setIsOpen(false)}
            >
              Convert PDF
            </NavLink>
            <div className="ml-3 space-y-3 border-l border-slate-200 pl-3">
              {convertGroups.map((group) => (
                <div key={group.title} className="space-y-1">
                  <p className="px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {group.title}
                  </p>
                  {group.tools.map((tool) => (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-red-600"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            {primaryNavItems.map((item) => (
              <NavLink
                key={item.href}
                className={linkClass}
                to={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
