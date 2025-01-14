import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-green-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-600">AuthApp</h1>
          <div className="space-x-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-green-600 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

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
              to="/get-started"
              className="bg-white text-green-600 py-2 px-6 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Get Started
            </Link>
            <Link
              to="/learn-more"
              className="bg-transparent border-2 border-white text-white py-2 px-6 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </header>

      {/* Footer */}
      <footer className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 AuthApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
