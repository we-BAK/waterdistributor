import React, { useState } from "react";
import "./ReceivedBottles.jsx";

function ReceivedBottles() {
  const [duration, setDuration] = useState("today");

  // sample data for prototype
  const allData = [
    { type: "2L", quantity: 50, total: 500, date: "2025-11-11" },
    { type: "1L", quantity: 80, total: 640, date: "2025-11-09" },
    { type: "1/2L", quantity: 120, total: 720, date: "2025-11-01" },
    { type: "1/4L", quantity: 200, total: 800, date: "2025-10-01" },
  ];

  // for now, just simulate filters (real logic can be added later)
  const filteredData = allData.filter((item) => {
    if (duration === "today") return item.date === "2025-11-11";
    if (duration === "weekly") return item.date >= "2025-11-04";
    return item; // yearly - show all
  });

  return (
    <div className="received-container">
      <h2>📦 Received Water Bottles</h2>

      <div className="filter-bar">
        <label htmlFor="duration">Show by:</label>
        <select
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="weekly">Weekly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <table className="received-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Quantity</th>
            <th>Total (Birr)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td>{row.type}</td>
              <td>{row.quantity}</td>
              <td>{row.total}</td>
              <td>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredData.length === 0 && (
        <p className="no-data">No records found for this duration.</p>
      )}
    </div>
  );
}

export default ReceivedBottles;
