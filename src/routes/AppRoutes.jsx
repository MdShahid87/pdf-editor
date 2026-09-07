import { Navigate, Route, Routes } from "react-router-dom";
import CategoryPage from "../pages/CategoryPage";
import Blog from "../pages/Blog";
import BlogPost from "../pages/BlogPost";
import ContactUs from "../pages/ContactUs";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import ToolPage from "../pages/ToolPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/convert-pdf" element={<CategoryPage />} />
      <Route path="/convert-to-pdf" element={<CategoryPage />} />
      <Route path="/convert-from-pdf" element={<CategoryPage />} />
      <Route path="/edit-pdf" element={<CategoryPage />} />
      <Route path="/tools" element={<CategoryPage />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog" element={<BlogPost />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/convert-to-pdf/:tool" element={<ToolPage />} />
      <Route path="/convert-from-pdf/:tool" element={<ToolPage />} />
      <Route path="/edit-pdf/:tool" element={<ToolPage />} />
      <Route path="/tools/:tool" element={<ToolPage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
