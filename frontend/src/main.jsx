import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for React 18+
import App from "./App.jsx";

// Create the root where the app will be rendered
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component inside the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
