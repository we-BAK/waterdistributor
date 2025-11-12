import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OwnerDashboard from "../pages/owner/OwnerDashboard";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OwnerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
