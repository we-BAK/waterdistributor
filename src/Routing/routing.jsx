// routing.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/loginpage';
import StockkeeperPage from '../pages/Stockkeeper/stockkeep';
import Sales from '../pages/disributors/Salesperson';
import Owner from '../pages/owner/OwnerDashboard' 

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/stockkeeper" element={<StockkeeperPage />} /> 
        <Route path="/sales" element={<Sales />} />
        <Route path="/owner" element={<Owner />} />  
      </Routes>
    </Router>
  );
}

export default Routing;
