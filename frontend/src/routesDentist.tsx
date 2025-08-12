import DentistLayout from "./layouts/DentistLayout";
import Appointment from "./pages/dentist/Appointment";
import Dashboard from "./pages/dentist/Dashboard";
import RoleProtectedRoute from "./utils/ProtextedRoute";

const dentistRoutes = {
  element: <RoleProtectedRoute allowedRoles={["DENTIST"]} />, // 👈 protect this group
  children: [
    {
      path: "/doctor",
      element: <DentistLayout />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "appointments", element: <Appointment /> },
      ],
    },
  ],
};

export default dentistRoutes;
