const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 transition-colors duration-200">
              PDF Editor
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
              Simple and secure PDF tools to convert, merge, split, edit,
              rotate, compress, and manage your documents with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Quick Links
            </h3>

            <div className="mt-4 flex flex-col gap-2 text-sm">
              <a
                href="/"
                className="w-fit text-slate-500 transition-all duration-200 hover:translate-x-1 hover:text-indigo-600"
              >
                Home
              </a>

              <a
                href="/blog"
                className="w-fit text-slate-500 transition-all duration-200 hover:translate-x-1 hover:text-indigo-600"
              >
                Blog
              </a>

              <a
                href="/contact-us"
                className="w-fit text-slate-500 transition-all duration-200 hover:translate-x-1 hover:text-indigo-600"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Security */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Privacy & Security
            </h3>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              Your files are processed securely. We do not permanently store
              your uploaded documents.
            </p>

            <div className="mt-3 flex items-center gap-2 text-sm font-medium text-slate-700">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-indigo-600 transition-all duration-200 hover:bg-indigo-50">
                ✓
              </span>
              Secure file processing
            </div>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 PDF Editor. All rights reserved.</p>

          <p className="transition-colors duration-200 hover:text-indigo-600">
            Convert Files Easily & Securely.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
