import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { convertFromPdfTools, convertToPdfTools } from "../utils/constants";

const primaryNavItems = [
  { label: "Edit PDF", href: "/tools/edit-pdf" },
  { label: "Merge PDF", href: "/tools/merge-pdf" },
  { label: "Compress PDF", href: "/tools/compress-pdf" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
];

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

const linkClass = ({ isActive }) =>
  `flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
    isActive
      ? "bg-red-50 text-red-600"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
  }`;

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isConvertOpen, setIsConvertOpen] = useState(false);
  const [isMobileConvertOpen, setIsMobileConvertOpen] = useState(false);

  const desktopConvertRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const location = useLocation();

  // Close menus whenever the route changes.
  useEffect(() => {
    setIsMobileOpen(false);
    setIsConvertOpen(false);
    setIsMobileConvertOpen(false);
  }, [location.pathname]);

  // Close the desktop dropdown when clicking outside it.
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        desktopConvertRef.current &&
        !desktopConvertRef.current.contains(event.target)
      ) {
        setIsConvertOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsConvertOpen(false);
        setIsMobileOpen(false);
        setIsMobileConvertOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
    setIsMobileConvertOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          aria-label="PDF Editor home"
          className="group flex shrink-0 items-center gap-2"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-sm font-extrabold text-white shadow-sm transition group-hover:bg-red-700">
            PDF
          </span>

          <span className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
            PDF <span className="text-red-600">Editor</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>

          {/* Convert PDF dropdown */}
          <div className="relative" ref={desktopConvertRef}>
            <button
              type="button"
              aria-expanded={isConvertOpen}
              aria-haspopup="true"
              onClick={() => setIsConvertOpen((prev) => !prev)}
              className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                isConvertOpen
                  ? "bg-red-50 text-red-600"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              Convert PDF
              <svg
                aria-hidden="true"
                className={`h-4 w-4 transition-transform duration-200 ${
                  isConvertOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 7.22a.75.75 0 0 1 1.06 0L10 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isConvertOpen && (
              <div className="absolute right-0 top-full z-50 mt-3 w-[min(44rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/10">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      PDF Conversion Tools
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Convert your documents in a few clicks.
                    </p>
                  </div>

                  <span className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
                    PDF Tools
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {convertGroups.map((group) => (
                    <div key={group.title} className="min-w-0">
                      <h3 className="mb-3 border-b border-slate-100 pb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                        {group.title}
                      </h3>

                      <div className="space-y-1">
                        {group.tools.map((tool) => (
                          <Link
                            key={tool.path}
                            to={tool.path}
                            onClick={() => setIsConvertOpen(false)}
                            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 transition hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition group-hover:bg-white group-hover:text-red-600">
                              <svg
                                aria-hidden="true"
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M7 3.75h7l5 5v11.5a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-13a2.5 2.5 0 0 1 2-2.5Z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14 3.75v5h5M8.5 13h7M8.5 16.5h7"
                                />
                              </svg>
                            </span>

                            <span className="min-w-0 break-words font-medium">
                              {tool.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {primaryNavItems.map((item) => (
            <NavLink key={item.href} to={item.href} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile and tablet menu button */}
        <button
          type="button"
          aria-label={
            isMobileOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 lg:hidden"
        >
          {isMobileOpen ? (
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m6 6 12 12M18 6 6 18"
              />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile navigation panel */}
      {isMobileOpen && (
        <div
          id="mobile-navigation"
          ref={mobileMenuRef}
          className="border-t border-slate-200 bg-white shadow-lg lg:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto flex max-h-[calc(100dvh-4rem)] w-full max-w-7xl flex-col gap-1 overflow-y-auto px-4 py-4 sm:px-6"
          >
            <NavLink to="/" end className={linkClass} onClick={closeMobileMenu}>
              Home
            </NavLink>

            {/* Mobile conversion accordion */}
            <div className="overflow-hidden rounded-xl">
              <button
                type="button"
                aria-expanded={isMobileConvertOpen}
                onClick={() => setIsMobileConvertOpen((prev) => !prev)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                  isMobileConvertOpen
                    ? "bg-red-50 text-red-600"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span className="flex items-center gap-3">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3M8 4v4h4M8 4l4 4m-1 5h8m-4-4 4 4-4 4"
                    />
                  </svg>
                  Convert PDF
                </span>

                <svg
                  aria-hidden="true"
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isMobileConvertOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 7.22a.75.75 0 0 1 1.06 0L10 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isMobileConvertOpen && (
                <div className="mt-1 space-y-4 rounded-xl bg-slate-50 p-3">
                  {convertGroups.map((group) => (
                    <div key={group.title}>
                      <h3 className="mb-2 px-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                        {group.title}
                      </h3>

                      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                        {group.tools.map((tool) => (
                          <Link
                            key={tool.path}
                            to={tool.path}
                            onClick={closeMobileMenu}
                            className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                          >
                            {tool.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="my-2 border-t border-slate-100" />

            {primaryNavItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={linkClass}
                onClick={closeMobileMenu}
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
