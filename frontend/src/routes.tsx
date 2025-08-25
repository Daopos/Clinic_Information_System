import { createBrowserRouter, Navigate } from "react-router";
import Login from "./pages/auth/Login";
import GuestOnlyRoute from "./utils/GuestOnlyRoute";
import AdminRoutes from "./routesAdmin";
import PharmacistRoutes from "./routesPharmacist";
import dentistRoutes from "./routesDentist";
import ChangePasswordForm from "./zother/ChangePasswordForm";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    element: <GuestOnlyRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: <ChangePasswordForm />,
    path: "/reset-password",
  },
  AdminRoutes,
  PharmacistRoutes,
  dentistRoutes,
]);
export default router;
