import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginCard from "../pages/loginpage";
import StockKeeperDashboard from "../pages/Stockkeeper/stockkeep";

// Placeholder components for other roles
const OwnerDashboard = () => <h2 style={{ textAlign: "center" }}>🏠 Owner Dashboard</h2>;
const SalesmanDashboard = () => <h2 style={{ textAlign: "center" }}>🚚 Salesman Dashboard</h2>;

function Routering() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginCard />} />
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/stockkeeper" element={<StockKeeperDashboard />} />
        <Route path="/salesman" element={<SalesmanDashboard />} />
      </Routes>
    </Router>
  );
}

export default Routering;
