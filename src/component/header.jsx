import React from 'react';
import { User } from 'lucide-react';



// You will need to pass props for your application's specific logo/title and user actions.
const Navbar = ({ appName, logoSrc, onUserIconClick }) => {
  return (
    // Fixed navbar at the top, styled with a light background and shadow
    <header className="relative w-full bg-white shadow-md z-30 border border-gray-200">
  <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">

      {/* Left Section: Logo */}
      <div className="flex items-center space-x-3 shrink-0">
        {logoSrc ? (
          <img className="h-8 w-auto" src={logoSrc} alt={appName || "App Logo"} />
        ) : (
          <h1 className="text-xl font-bold text-gray-900 cursor-pointer">
            {appName || "Stock Keeper"}
          </h1>
        )}
      </div>

      {/* Center Section: Company name */}
      <div className="flex-1 text-center mx-4 min-w-0">
        <p className="text-gray-700 font-medium truncate">
          Company Name
        </p>
      </div>

      {/* Right Section: User Icon */}
      <div className="shrink-0">
        <button
          onClick={onUserIconClick}
          className="flex items-center p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
          aria-label="User Profile Menu"
        >
          <User size={24} />
        </button>
      </div>

    </div>
  </div>
</header>

  );
};

export default Navbar;