import React, { useState } from "react";
import "./SellingHistory.css";

function SellingHistory() {
  const [filter, setFilter] = useState("today");

  // Example static data for prototype
  const salesData = [
    { id: 1, type: "2L", quantity: 50, unitPrice: 20, date: "2025-11-10" },
    { id: 2, type: "1L", quantity: 80, unitPrice: 15, date: "2025-11-11" },
    { id: 3, type: "1/2L", quantity: 120, unitPrice: 10, date: "2025-11-11" },
    { id: 4, type: "1/4L", quantity: 200, unitPrice: 5, date: "2025-11-09" },
  ];

  return (
    <div className="selling-history-container">
      <h2>Selling History</h2>

      {/* Filter Bar */}
      <div className="filter-bar">
        <label>Duration:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="weekly">This Week</option>
          <option value="monthly">This Month</option>
        </select>
      </div>

      {/* Sales Table */}
      <table className="sales-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Quantity</th>
            <th>Unit Price (Birr)</th>
            <th>Total (Birr)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((row) => (
            <tr key={row.id}>
              <td>{row.type}</td>
              <td>{row.quantity}</td>
              <td>{row.unitPrice}</td>
              <td>{row.quantity * row.unitPrice}</td>
              <td>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SellingHistory;
