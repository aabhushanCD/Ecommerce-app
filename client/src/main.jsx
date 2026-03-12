import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppRoutes from "./routes/appRoutes";
import { AuthContextProvider } from "./features/auth/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <AppRoutes>
          <App />
        </AppRoutes>
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
