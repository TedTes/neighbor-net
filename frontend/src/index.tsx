import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
//import "./index.css";

const renderApp = (Component: React.ComponentType) => {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error("Root element not found");
  }

  const root = ReactDOM.createRoot(rootElement as HTMLElement);

  root.render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
};

const withHotReload = (
  initialComponent: React.ComponentType,
  module: NodeJS.Module
) => {
  renderApp(initialComponent);

  if (module.hot) {
    module.hot.accept("./App", async () => {
      const { default: NextApp } = await import("./App");
      renderApp(NextApp);
    });
  }
};

withHotReload(App, module);
