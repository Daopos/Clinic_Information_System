import { useNavigate, Link } from "react-router"; // If your app uses react-router-dom, change to: "react-router-dom"
import {
  ChevronLeftIcon,
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { myProfile, sendChangePasswordLink } from "../../services/Auth";
import type { MyProfile } from "../../types/IProfile";
import toast, { Toaster } from "react-hot-toast";

export default function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<MyProfile>({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
  });
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await myProfile(); // call your API
        setProfile(data); // save to state
      } catch (err) {
        console.log((err as Error).message);
      }
    };

    fetchProfile();
  }, []);
  const onBack = () => navigate(-1);

  const changePassword = async () => {
    toast.dismiss();

    try {
      await sendChangePasswordLink(profile.email);

      toast.success("Successfully Send!");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className=" sticky top-0 z-1 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-xl border bg-emerald-50 hover:bg-emerald-100 border-emerald-100 px-3 py-2 transition shadow-sm"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold leading-tight">Profile</h1>
            <p className="text-sm text-gray-500">
              Manage your personal information
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-3xl p-4">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border">
          {/* Card header */}
          <div className="flex items-start justify-between gap-4 p-4 sm:p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 border flex items-center justify-center">
                <UserIcon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-semibold">
                  Account Details
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Keep your info up to date.
                </p>
              </div>
            </div>
            <button
              className="cursor-pointer inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-900"
              onClick={changePassword}
            >
              <LockClosedIcon className="h-5 w-5" />
              <span>Change password</span>
            </button>
          </div>

          {/* Display user info */}
          <div className="p-4 sm:p-6 space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">First Name</p>
              <p className="text-base">{profile.firstname}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Last Name</p>
              <p className="text-base">{profile.lastname}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Middle Name</p>
              <p className="text-base">{profile.middlename}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                <p className="text-base">{profile.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security quick link for mobile */}
        <div className="mt-6 flex sm:hidden">
          <Link
            to="/change-password"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700"
          >
            <LockClosedIcon className="h-5 w-5" />
            Manage password
          </Link>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
