import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DietProvider } from "./context/DietContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DietProvider>
      <App />
    </DietProvider>
  </React.StrictMode>
);
