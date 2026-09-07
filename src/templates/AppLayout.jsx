import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AppRoutes from "../routes/AppRoutes";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
