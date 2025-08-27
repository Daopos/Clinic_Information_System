import PharmacistLayout from "./layouts/PharmacistLayout";
import Profile from "./pages/admin/Profile";
import Dashboard from "./pages/pharmacist/Dashboard";
import Medicine from "./pages/pharmacist/Medicine";
import MedicineAdd from "./pages/pharmacist/MedicineAdd";
import MedicineLog from "./pages/pharmacist/MedicineLog";
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
        {
          path: "medicinelogs",
          element: <MedicineLog />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "medicineadd",
          element: <MedicineAdd />,
        },
      ],
    },
  ],
};

export default PharmacistRoutes;
