import { NavLink } from "react-router";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { BeakerIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  const linkClass =
    "block p-2 rounded hover:bg-gray-700 transition-colors flex gap-2";

  const activeClass = "bg-gray-700 font-semibold";

  return (
    <div className="w-60 h-screen bg-gray-800 text-white sticky top-0 left-0">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-lg font-bold">Admin Sidebar</h2>
      </div>
      <nav className="mt-4">
        <ul className="space-y-2">
          <li className="px-4 ">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              <Squares2X2Icon className="h-6 w-6" />
              Dashboard
            </NavLink>
          </li>
          <li className="px-4 ">
            <NavLink
              to="/admin/appointments"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              <CalendarDaysIcon className="h-6 w-6" />
              Appointments
            </NavLink>
          </li>
          <li className="px-4 ">
            <NavLink
              to="/admin/medicines"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              <BeakerIcon className="h-6 w-6" />
              Medicines
            </NavLink>
          </li>
          <li className="px-4 ">
            <NavLink
              to="/admin/patients"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              <UserGroupIcon className="h-6 w-6" />
              Patient
            </NavLink>
          </li>
          <li></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
