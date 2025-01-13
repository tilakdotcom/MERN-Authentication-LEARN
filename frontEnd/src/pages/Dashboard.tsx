import { Link } from 'react-router-dom';

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-1/4 bg-green-800 p-6">
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <nav className="mt-8">
          <ul>
            <li className="mb-4">
              <Link
                to="/profile"
                className="text-gray-200 hover:text-white text-lg block"
              >
                Profile
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/settings"
                className="text-gray-200 hover:text-white text-lg block"
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                to="/logout"
                className="text-gray-200 hover:text-white text-lg block"
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="w-3/4 p-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, User!</h1>
        <p className="mt-4 text-gray-600">
          This is your dashboard. Here you can manage your profile, change settings, and more.
        </p>
        {/* Add more sections here as needed */}
      </main>
    </div>
  );
}
