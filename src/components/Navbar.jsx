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
  `flex min-w-0 items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
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

  // Close menus after navigating to another page.
  useEffect(() => {
    setIsMobileOpen(false);
    setIsConvertOpen(false);
    setIsMobileConvertOpen(false);
  }, [location.pathname]);

  // Close menus when the user clicks outside or presses Escape.
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        desktopConvertRef.current &&
        !desktopConvertRef.current.contains(event.target)
      ) {
        setIsConvertOpen(false);
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest("[data-mobile-menu-button]")
      ) {
        setIsMobileOpen(false);
        setIsMobileConvertOpen(false);
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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
      {/* Main navbar */}
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-3 px-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          aria-label="PDF Editor home"
          className="group flex min-w-0 shrink-0 items-center gap-2"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-xs font-extrabold text-white shadow-sm transition-colors group-hover:bg-red-700 sm:h-10 sm:w-10 sm:text-sm">
            PDF
          </span>

          <span className="whitespace-nowrap text-base font-bold tracking-tight text-slate-900 sm:text-xl">
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

          {/* Desktop Convert PDF dropdown */}
          <div className="relative" ref={desktopConvertRef}>
            <button
              type="button"
              aria-expanded={isConvertOpen}
              aria-haspopup="true"
              onClick={() => setIsConvertOpen((previous) => !previous)}
              className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                isConvertOpen
                  ? "bg-red-50 text-red-600"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              Convert PDF
              <svg
                aria-hidden="true"
                className={`h-4 w-4 transition-transform ${
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
              <div className="absolute right-0 top-full z-50 mt-2 max-h-[min(75dvh,38rem)] w-[min(44rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:p-5">
                <div className="mb-5 border-b border-slate-100 pb-4">
                  <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                    PDF Conversion Tools
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Choose the tool you need.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-5">
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
                            className="flex min-w-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500">
                              PDF
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

        {/* Mobile/tablet menu button */}
        <button
          data-mobile-menu-button
          type="button"
          aria-label={
            isMobileOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMobileOpen((previous) => !previous)}
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
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-slate-200 bg-white shadow-lg lg:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-3 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6"
          >
            <NavLink to="/" end className={linkClass} onClick={closeMobileMenu}>
              Home
            </NavLink>

            {/* Mobile Convert PDF accordion */}
            <div className="min-w-0">
              <button
                type="button"
                aria-expanded={isMobileConvertOpen}
                aria-controls="mobile-conversion-tools"
                onClick={() => setIsMobileConvertOpen((previous) => !previous)}
                className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                  isMobileConvertOpen
                    ? "bg-red-50 text-red-600"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-xs font-bold text-red-600">
                    PDF
                  </span>

                  <span>Convert PDF</span>
                </span>

                <svg
                  aria-hidden="true"
                  className={`h-4 w-4 shrink-0 transition-transform ${
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
                <div
                  id="mobile-conversion-tools"
                  className="mt-2 space-y-5 rounded-2xl bg-slate-50 p-3 sm:p-4"
                >
                  {convertGroups.map((group) => (
                    <section key={group.title} className="min-w-0">
                      <h3 className="mb-2 px-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                        {group.title}
                      </h3>

                      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                        {group.tools.map((tool) => (
                          <Link
                            key={tool.path}
                            to={tool.path}
                            onClick={closeMobileMenu}
                            className="flex min-w-0 items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-red-100 hover:bg-white hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-bold text-red-600 shadow-sm">
                              PDF
                            </span>

                            <span className="min-w-0 break-words">
                              {tool.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </section>
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
