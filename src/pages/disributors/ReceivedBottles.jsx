import React, { useState } from "react";
import "./RecivedBottles.css";

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

  const totalQuantity = filteredData.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = filteredData.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="received-page-container">
      {/* Summary Card */}
      <div className="summary-card">
        <div className="summary-header">
          <span className="summary-icon">📦</span>
          <span className="summary-label">Total Received (የተቀበሉት ጠቅላላ)</span>
        </div>
        <div className="summary-value">{totalQuantity}</div>
        <div className="summary-footer">
          Total Amount (ጠቅላላ መጠን): {totalAmount.toLocaleString()} ብር
        </div>
      </div>

      {/* Records Card */}
      <div className="records-card">
        <div className="records-header">
          <h2 className="records-title">Received Water Bottles (የተቀበሉ ውሃ ጠርሙሶች)</h2>
          <p className="records-subtitle">View all bottles received from the store (ከመደብሩ የተቀበሉትን ጠርሙሶች ይመልከቱ)</p>
        </div>

        <div className="filter-bar">
          <label htmlFor="duration">Filter by (በመደብ ይመርጡ):</label>
          <select
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="filter-select"
          >
            <option value="today">Today (ዛሬ)</option>
            <option value="weekly">This Week (የዚህ ሳምንት)</option>
            <option value="yearly">All Time (ሁሉም ጊዜ)</option>
          </select>
        </div>

        <div className="table-container">
          <table className="received-table">
            <thead>
              <tr>
                <th>Type (አይነት)</th>
                <th>Quantity (ብዛት)</th>
                <th>Total (Birr) (ጠቅላላ ብር)</th>
                <th>Date (ቀን)</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.type}</td>
                    <td>{row.quantity}</td>
                    <td>{row.total.toLocaleString()}</td>
                    <td>{row.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data-cell">
                    <div className="no-data">
                      <span className="no-data-icon">📭</span>
                      <p>No records found for this duration. (በዚህ ጊዜ ምንም መዝገብ አልተገኘም)</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ReceivedBottles;
