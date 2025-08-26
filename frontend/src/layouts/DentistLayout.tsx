import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Sidebar from "../components/dentist/sidebar/Sidebar";
import { useDispatch } from "react-redux";
import { logout } from "../services/Auth";
import { clearUser } from "../store/user/userSlice";
import { useQueryClient } from "@tanstack/react-query";

const DentistLayout = () => {
  const queryClient = useQueryClient();

  const location = useLocation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Map of paths to titles
  const pathTitles: { [key: string]: string } = {
    "/dentist/dashboard": "Dashboard",
  };

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(clearUser());
      queryClient.clear();

      navigate("/"); // Try to navigate to login page
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const pageTitle = pathTitles[location.pathname] || "Dashboard";
  return (
    <div className="flex min-h-screen">
      <div className="sticky top-0 h-screen w-60 bg-gray-800 text-white">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <header className="border-b p-5 flex justify-between items-center">
          <div className="flex gap-2">
            <Bars3BottomLeftIcon className="h-8 w-8 cursor-pointer" />
            <h1 className="text-2xl font-semibold">{pageTitle}</h1>
          </div>
          {/* Profile Dropdown */}
          <Dropdown
            className="w-60"
            arrowIcon={false}
            inline
            label={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            }
          >
            <DropdownItem onClick={() => navigate("/doctor/profile")}>
              Profile
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </Dropdown>
        </header>
        <main className="bg-primary-50 flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DentistLayout;
