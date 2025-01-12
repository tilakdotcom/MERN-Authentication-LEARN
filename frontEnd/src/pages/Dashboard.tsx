import React from "react";
import { Link } from "react-router-dom";

const WelcomePage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            Welcome to Your Dashboard!
          </h1>
          <p className="text-gray-600">
            Manage your account, explore features, and customize your experience.
            We are excited to have you on board!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-green-100 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Your Profile
            </h2>
            <p className="text-gray-700 mb-4">
              Your profile information and preferences.
            </p>
            <Link
              to={"/verify-email"}
              className="inline-block py-2 px-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
            >
              Verify Email
            </Link>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Account Settings
            </h2>
            <p className="text-gray-700 mb-4">
              Update your account settings and preferences.
            </p>
            <Link
              to={"/"}
              className="inline-block py-2 px-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
