import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Services from "./pages/Services";
import HelpingbeeSignUp from "./pages/HelpingbeeSignUp";
import HelpingbeeLogin from "./pages/HelpingbeeLogin";
import ClientDashboard from "./pages/ClientDashboard";
import RequestService from "./pages/RequestService";
import Providers from "./pages/Providers";
import ProviderDashboard from "./pages/ProviderDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/helpingbee-signup",
        element: <HelpingbeeSignUp />,
      },
      {
        path: "/helpingbee-login",
        element: <HelpingbeeLogin />,
      },
      {
        path: "/client-dashboard",
        element: (
          <ProtectedRoute>
            <ClientDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/provider-dashboard",
        element: (
          <ProtectedRoute>
            <ProviderDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/request-service",
        element: (
          <ProtectedRoute>
            <RequestService />
          </ProtectedRoute>
        ),
      },
      {
        path: "/providers/:serviceId",
        element: (
          <ProtectedRoute>
            <Providers />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/payment-success",
    element: (
      <ProtectedRoute>
        <PaymentSuccess />
      </ProtectedRoute>
    ),
  },
  {
    path: "/payment-cancel",
    element: (
      <ProtectedRoute>
        <PaymentCancel />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      toastOptions={{
        duration: 5000,
        style: {
          padding: "20px",
          borderRadius: "10px",
          fontSize: "18px",
        },
      }}
    />
    <RouterProvider router={router} />
  </StrictMode>
);
