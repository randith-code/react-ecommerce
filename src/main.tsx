import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { AuthProvider } from "./contexts/AuthContext.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";
import { NotificationProvider } from "./contexts/NotificationContext.tsx";
import AppRouter from "./router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <NotificationProvider>
          <AppRouter />
        </NotificationProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
