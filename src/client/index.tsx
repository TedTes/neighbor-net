import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app"; // Import the main App component
//import "./index.css"; // Import global styles if any

// Find the root DOM node where the React app will be mounted
const rootElement = document.getElementById("root");

// Create a root for React
const root = ReactDOM.createRoot(rootElement as HTMLElement);

// Render the App component to the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
