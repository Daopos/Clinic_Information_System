import DentistLayout from "./layouts/DentistLayout";
import Profile from "./pages/admin/Profile";
import Appointment from "./pages/dentist/Appointment";
import Dashboard from "./pages/dentist/Dashboard";
import Equipment from "./pages/dentist/Equipment";
import RoleProtectedRoute from "./utils/ProtextedRoute";

const dentistRoutes = {
  element: <RoleProtectedRoute allowedRoles={["DENTIST"]} />, // 👈 protect this group
  children: [
    {
      path: "/dentist",
      element: <DentistLayout />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "appointments", element: <Appointment /> },
        { path: "equipments", element: <Equipment /> },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
  ],
};

export default dentistRoutes;
