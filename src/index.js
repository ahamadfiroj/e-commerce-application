import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Use createRoot API
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ProductProvider } from "./context/ProductContext";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ Use createRoot
root.render(
  <React.StrictMode>
    <Router>
      <ProductProvider>
        <App />
      </ProductProvider>
    </Router>
  </React.StrictMode>
);
