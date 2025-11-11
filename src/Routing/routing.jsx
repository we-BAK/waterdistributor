// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WelcomeBanner from '../../src/pages/disributors/dis';

// Simple placeholder pages
const OwnerPage = () => (
  <div className="p-6">
    <WelcomeBanner name="Marsilas Daniel" role="owner" />
    <p className="mt-4 text-gray-700">This is the Owner dashboard.</p>
  </div>
);

const StockkeeperPage = () => (
  <div className="p-6">
    <WelcomeBanner name="Samuel" role="stockkeeper" />
    <p className="mt-4 text-gray-700">This is the Stockkeeper page for managing inventory.</p>
  </div>
);

const DistributorPage = () => (
  <div className="p-6">
    <WelcomeBanner name="Kidist" role="distributor" />
    <p className="mt-4 text-gray-700">This is the Distributor page for managing deliveries.</p>
  </div>
);

// Main App with routes
const App = () => {
  return (
    <Router>
      <nav className="bg-blue-600 text-white p-4 flex justify-around">
        <Link to="/" className="hover:underline">Owner</Link>
        <Link to="/stockkeeper" className="hover:underline">Stockkeeper</Link>
        <Link to="/distributor" className="hover:underline">Distributor</Link>
      </nav>

      <Routes>
        <Route path="/" element={<OwnerPage />} />
        <Route path="/stockkeeper" element={<StockkeeperPage />} />
        <Route path="/distributor" element={<DistributorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
