import queryClient from "@/config/queryClient";
import { logoutRequest } from "@/lib/api";
import { successToast } from "@/lib/toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  const { mutate: logout } = useMutation({
    mutationFn: logoutRequest,
    onSettled: () => {
      queryClient.clear();
      successToast("Logged out successfully");
      navigate("/login"); // Redirect to login page after logout
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-1/4 bg-green-800 p-6">
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <nav className="mt-8">
          <ul>
            <li className="mb-4">
              <button
                onClick={() => setActive("home")}
                className="text-gray-200 hover:text-white text-lg block"
              >
                Home
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActive("setting")}
                className="text-gray-200 hover:text-white text-lg block"
              >
                Settings
              </button>
            </li>
            <li>
              <button
                onClick={() => logout()}
                className="text-gray-200 hover:text-white text-lg block"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="w-3/4 p-8">
      {active ==="home" && <UserSection />}

      </main>
    </div>
  );
}

const UserSection = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800">Welcome, User!</h1>
      <p className="mt-4 text-gray-600">
        This is your dashboard. Here you can manage your profile, change
        settings, and more.
      </p>
    </>
  );
};
