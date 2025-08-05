import { createBrowserRouter, Navigate } from "react-router";
import Login from "./pages/auth/Login";
import GuestOnlyRoute from "./utils/GuestOnlyRoute";
import AdminRoutes from "./routesAdmin";
import PharmacistRoutes from "./routesPharmacist";
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
  AdminRoutes,
  PharmacistRoutes,
]);
export default router;
