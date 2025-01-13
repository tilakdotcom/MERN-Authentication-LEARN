import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const auth = true;
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-6 md:px-12">
      <div className="bg-green-100 p-8 md:p-16 rounded-lg shadow-lg text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          Welcome to Our Authentication Platform!
        </h1>
        <p className="text-green-700 text-lg mb-6">
          Enjoy a secure, reliable, and user-friendly authentication experience.
          Whether you're here to log in, sign up, or explore, we've got you
          covered.
        </p>
        <p className="text-green-600 mb-8">
          Join our community today and take the first step towards secure
          digital access. Our platform ensures your data remains safe while
          providing an effortless user experience.
        </p>
        <div className="space-x-4">
          {!auth ? (
            <>
              <Link
                to={"/"}
                className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
              >
                Home
              </Link>{" "}
              <Link
                to={"/dashboard"}
                className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                to={"/login"}
                className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
              >
                Log In
              </Link>{" "}
              <Link
                to={"/signup"}
                className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
              >
                Sign Up
              </Link>
              <Link
                to={"/reset-password-link"}
                className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
              >
                Forgot-password
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
