import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutRequest } from "@/lib/api";
import { errorToast, successToast } from "@/lib/toast";

const Header: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  async function logout() {
    try {
      const logOut = await logoutRequest();
      if (!logOut) {
        return errorToast("Could not log out");
      }
      dispatch({ type: "auth/logout" });
      successToast("Logged out successfully");
    } catch (error) {
      errorToast("Could not log out");
      console.error("Error in logout", error);
      return;
    }
  }
  return (
    <header className="bg-green-600 text-white py-4 px-6 md:px-12 flex items-center justify-between">
      <h1 className="text-2xl font-bold">My App</h1>
      {auth.user && (
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
