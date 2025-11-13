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

  const totalQuantity = salesData.reduce((sum, item) => sum + item.quantity, 0);
  const totalRevenue = salesData.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  return (
    <div className="selling-history-page-container">
      {/* Summary Cards */}
      <div className="history-summary">
        <div className="summary-card">
          <div className="summary-header">
            <span className="summary-icon">📊</span>
            <span className="summary-label">Total Sales (ጠቅላላ ሽያጭ)</span>
          </div>
          <div className="summary-value">{totalQuantity}</div>
          <div className="summary-footer">Bottles sold (የተሸጡ ቦታሎች)</div>
        </div>
        <div className="summary-card">
          <div className="summary-header">
            <span className="summary-icon">💰</span>
            <span className="summary-label">Total Revenue (ጠቅላላ ገቢ)</span>
          </div>
          <div className="summary-value">{totalRevenue.toLocaleString()}</div>
          <div className="summary-footer">Birr (ብር)</div>
        </div>
      </div>

      {/* Records Card */}
      <div className="records-card">
        <div className="records-header">
          <h2 className="records-title">Selling History (የሽያጭ ታሪክ)</h2>
          <p className="records-subtitle">
            Complete history of all your sales transactions (የሁሉም የሽያጭ ዝውውሮች ሙሉ ታሪክ)
          </p>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <label htmlFor="filter">Filter by (በመስፈርት ይመርጡ):</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="today">Today (ዛሬ)</option>
            <option value="yesterday">Yesterday (ትናንት)</option>
            <option value="weekly">This Week (በዚህ ሳምንት)</option>
            <option value="monthly">This Month (በዚህ ወር)</option>
          </select>
        </div>

        {/* Sales Table */}
        <div className="table-container">
          <table className="sales-table">
            <thead>
              <tr>
                <th>Type (ዓይነት)</th>
                <th>Quantity (ብዛት)</th>
                <th>Unit Price (የአንዱ ዋጋ) (ብር)</th>
                <th>Total (ጠቅላላ) (ብር)</th>
                <th>Date (ቀን)</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((row) => (
                <tr key={row.id}>
                  <td>{row.type}</td>
                  <td>{row.quantity}</td>
                  <td>{row.unitPrice.toLocaleString()}</td>
                  <td className="total-cell">
                    {(row.quantity * row.unitPrice).toLocaleString()}
                  </td>
                  <td>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SellingHistory;
