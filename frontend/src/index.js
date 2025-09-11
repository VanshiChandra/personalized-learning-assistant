// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// or "./style.css" if that’s what you’re using

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
