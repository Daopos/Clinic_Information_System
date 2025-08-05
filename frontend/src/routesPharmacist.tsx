import PharmacistLayout from "./layouts/PharmacistLayout";
import Dashboard from "./pages/pharmacist/Dashboard";
import RoleProtectedRoute from "./utils/ProtextedRoute";

const PharmacistRoutes = {
  element: <RoleProtectedRoute allowedRoles={["PHARMACIST"]} />, // 👈 protect this group
  children: [
    {
      path: "/pharmacist",
      element: <PharmacistLayout />,
      children: [{ path: "dashboard", element: <Dashboard /> }],
    },
  ],
};

export default PharmacistRoutes;
