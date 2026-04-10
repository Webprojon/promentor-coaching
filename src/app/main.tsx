import React from "react";
import { createRoot } from "react-dom/client";
import { AppThemeProvider } from "@promentorapp/ui-kit";
import App from "@/app/App";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </React.StrictMode>,
);
