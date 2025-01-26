import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CryptoHistory from "./CryptoHistory.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <CryptoHistory /> */}
  </StrictMode>,
);
