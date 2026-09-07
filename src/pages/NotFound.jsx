import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-8 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 text-slate-600">The page you requested does not exist.</p>
      <Link
        to="/"
        className="mt-4 inline-flex rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white"
      >
        Go Home
      </Link>
    </section>
  );
};

export default NotFound;
