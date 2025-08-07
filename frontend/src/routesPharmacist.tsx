import PharmacistLayout from "./layouts/PharmacistLayout";
import Dashboard from "./pages/pharmacist/Dashboard";
import Medicine from "./pages/pharmacist/Medicine";
import RoleProtectedRoute from "./utils/ProtextedRoute";

const PharmacistRoutes = {
  element: <RoleProtectedRoute allowedRoles={["PHARMACIST"]} />, // 👈 protect this group
  children: [
    {
      path: "/pharmacist",
      element: <PharmacistLayout />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        {
          path: "medicines",
          element: <Medicine />,
        },
      ],
    },
  ],
};

export default PharmacistRoutes;
