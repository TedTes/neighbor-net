import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
//import "./index.css"; // Import global styles if any

const renderApp = (Component: React.ComponentType) => {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error("Root element not found");
  }

  const root = ReactDOM.createRoot(rootElement as HTMLElement);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

const withHotReload = (
  initialComponent: React.ComponentType,
  module: NodeJS.Module
) => {
  renderApp(initialComponent);

  if (module.hot) {
    module.hot.accept("./app", async () => {
      const { default: NextApp } = await import("./app");
      renderApp(NextApp);
    });
  }
};

withHotReload(App, module);
