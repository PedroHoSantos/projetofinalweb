import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { DietProvider } from "./context/DietContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DietProvider>
      <App />
    </DietProvider>
  </React.StrictMode>
);
