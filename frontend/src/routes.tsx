import { createBrowserRouter } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Appointment from "./pages/admin/Appointment";
import Patient from "./pages/admin/Patient";
import Medicine from "./pages/admin/Medicine";
const router = createBrowserRouter([
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
        element: <Medicine />,
      },
      {
        path: "medicines",
        element: <Appointment />,
      },
      {
        path: "patients",
        element: <Patient />,
      },
    ],
  },
]);
export default router;
