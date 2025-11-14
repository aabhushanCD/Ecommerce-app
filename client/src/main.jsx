import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppRoutes from "./routes/appRoutes";
import { AuthContextProvider } from "./Store/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <AppRoutes>
        <App />
      </AppRoutes>
    </AuthContextProvider>
  </StrictMode>
);
