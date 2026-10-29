import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="inline-block text-lg font-bold text-slate-900 transition-colors hover:text-red-600"
            >
              PDF <span className="text-red-600">Editor</span>
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
              Simple PDF tools to convert, merge, split, edit, rotate, compress,
              and manage your documents with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Quick Links
            </h3>

            <nav
              aria-label="Footer navigation"
              className="mt-4 flex flex-col items-start gap-3 text-sm"
            >
              <Link
                to="/"
                className="text-slate-500 transition-colors hover:text-red-600"
              >
                Home
              </Link>

              <Link
                to="/blog"
                className="text-slate-500 transition-colors hover:text-red-600"
              >
                Blog
              </Link>

              <Link
                to="/contact-us"
                className="text-slate-500 transition-colors hover:text-red-600"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Privacy & Security */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Privacy &amp; Security
            </h3>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              Your files are processed securely. We do not permanently store
              your uploaded documents.
            </p>

            <div className="mt-3 flex items-center gap-2 text-sm font-medium text-slate-700">
              <span
                aria-hidden="true"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600"
              >
                ✓
              </span>
              Secure file processing
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} PDF Editor. All rights reserved.</p>

          <p>Convert Files Easily &amp; Securely.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
