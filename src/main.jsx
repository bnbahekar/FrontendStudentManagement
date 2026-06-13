import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/app.css";
import { AppProvider } from "./context/AppContext";   // ✅ IMPORTANT

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>   {/* ✅ THIS FIXES YOUR ERROR */}
      <App />
    </AppProvider>
  </React.StrictMode>
);