import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";

// Inject Tailwind styles
const injectTailwindStyles = () => {
  if (!document.querySelector("#tailwind-styles")) {
    const link = document.createElement("link");
    link.id = "tailwind-styles";
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4";
    document.head.appendChild(link);
  }
};

// Create root and render app
const initialize = () => {
  injectTailwindStyles();
  const root = ReactDOM.createRoot(document.getElementById("root"));
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

// Initialize the application
initialize();

// Enable hot module replacement for development
if (module.hot) {
  module.hot.accept();
}