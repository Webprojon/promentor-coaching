import "temporal-polyfill/global";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { AppThemeProvider } from "@promentorapp/ui-kit";
import App from "@/app/App";
import { queryClient } from "@/shared/query/query-client";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <App />
        <ToastContainer position="top-right" newestOnTop autoClose={2000} />
      </AppThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
