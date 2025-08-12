import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "flowbite-react";
import { Outlet, useLocation } from "react-router";
import Sidebar from "../components/dentist/sidebar/Sidebar";

const DentistLayout = () => {
  const location = useLocation();

  // Map of paths to titles
  const pathTitles: { [key: string]: string } = {
    "/dentist/dashboard": "Dashboard",
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
          <Button>Logout</Button>
        </header>
        <main className="bg-primary-50 flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DentistLayout;
