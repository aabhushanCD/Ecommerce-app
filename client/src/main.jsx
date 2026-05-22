import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { AuthContextProvider } from "./features/auth/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import AppRoutes from "./routes/AppRoutes";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <AppRoutes />
        <Toaster richColors position="top-right" />
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
