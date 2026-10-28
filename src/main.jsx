import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./themes/global.css";
import App from "./app.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
