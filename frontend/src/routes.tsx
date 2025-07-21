import { createBrowserRouter } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Appointment from "./pages/admin/Appointment";
import Patient from "./pages/admin/Patient";
import Medicine from "./pages/admin/Medicine";
import Login from "./pages/auth/Login";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "appointments",
        element: <Appointment />,
      },
      {
        path: "medicines",
        element: <Medicine />,
      },
      {
        path: "patients",
        element: <Patient />,
      },
    ],
  },
]);
export default router;
