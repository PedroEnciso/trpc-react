import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import TrpcProvider from "./TrpcProvider.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TrpcProvider>
      <App />
    </TrpcProvider>
  </React.StrictMode>
);
