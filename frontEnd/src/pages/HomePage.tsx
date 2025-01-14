import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-green-50 min-h-screen flex flex-col">
      {/* Navbar */}

      {/* Hero Section */}
      <header className="flex-grow flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600 text-white">
        <div className="text-center px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to AuthApp
          </h2>
          <p className="text-lg md:text-xl mb-6">
            The simplest way to manage your authentication needs.
          </p>
          <div className="space-x-4">
            <Link
              to="/login"
              className="bg-white text-green-600 py-2 px-6 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-transparent border-2 border-white text-white py-2 px-6 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition"
            >
              signup
            </Link>
          </div>
        </div>
      </header>

      {/* Footer */}
    </div>
  );
};

export default HomePage;
