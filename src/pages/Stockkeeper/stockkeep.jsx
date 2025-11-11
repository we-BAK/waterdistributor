import React from 'react';

// WelcomeBanner.jsx — a simple reusable component for your water distributor website
// Displays a friendly greeting for any user role: owner, stockkeeper, or distributor

const WelcomeBanner = ({ name = '', role = '', subtitle = '' }) => {
  const roleLabel = {
    owner: 'Owner',
    stockkeeper: 'Stockkeeper',
    distributor: 'Distributor',
  }[role.toLowerCase?.() ?? role] || (role ? role.charAt(0).toUpperCase() + role.slice(1) : 'User');

  const hour = new Date().getHours();
  const timeOfDay =
    hour >= 5 && hour < 12
      ? 'Morning'
      : hour >= 12 && hour < 17
      ? 'Afternoon'
      : 'Evening';

  const mainTitle = name ? `Welcome, ${name}` : 'Welcome';
  const roleLine = role ? `${roleLabel} Dashboard` : 'Dashboard';
  const sub = subtitle || `Good ${timeOfDay}! You are viewing the ${roleLine}.`;

  return (
    <header className="w-full p-4 bg-gradient-to-r from-blue-50 via-white to-green-50 rounded-2xl shadow-sm">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white grid place-items-center shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8c-2.21 0-4 1.79-4 4v4h8v-4c0-2.21-1.79-4-4-4z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 4a4 4 0 110 8 4 4 0 010-8z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-semibold text-slate-900">{mainTitle}</h1>
            <p className="text-sm text-slate-600">{sub}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-500">Role</p>
          <p className="text-md font-medium text-slate-800">{roleLabel}</p>
        </div>
      </div>
    </header>
  );
};

export default WelcomeBanner;
