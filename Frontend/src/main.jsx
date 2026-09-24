import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import Login from "./features/authentication/pages/Login.jsx";
import Home from "./features/Home/pages/Home.jsx";
import { AuthProvider } from "./features/authentication/auth.context.jsx";
import Protected from "./components/Protected.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ContestProvider } from "./features/Home/contest.provider.jsx";
import { ThemeProvider } from "./features/themes/theme.provider.jsx";
import UserProfile from "./components/UserProfile.jsx";
import { Toaster } from "react-hot-toast"; //Abb isse humme include karna hain toasts ko
import "bootstrap/dist/css/bootstrap.min.css";
const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfile />
      </Protected>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AuthProvider>
      <ContestProvider>
        <Toaster position="top-center" />
        <RouterProvider router={router} />
      </ContestProvider>
    </AuthProvider>
  </ThemeProvider>,
);
