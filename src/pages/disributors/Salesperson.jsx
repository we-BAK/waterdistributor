import React, { useState } from "react";
import "./Salesperson.css";
import logo from "../../assets/logo.png";

// import sub-components
import WelcomePage from "./WelcomePage";
import ReceivedBottles from "./ReceivedBottles";
import InsertSales from "./InsertSales";
import SellingHistory from "./SellingHistory";

function Salesperson() {
  const [activePage, setActivePage] = useState("welcome");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const renderContent = () => {
    switch (activePage) {
      case "received":
        return <ReceivedBottles />;
      case "insert":
        return <InsertSales />;
      case "history":
        return <SellingHistory />;
      default:
        return <WelcomePage />;
    }
  };

  return (
    <div className="sales-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" />
          <h2>Water Distributor</h2>
        </div>

        <div className="profile" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <span className="person-icon">👤</span>
          {dropdownOpen && (
            <div className="dropdown">
              <p><strong>Name:</strong> Alex</p>
              <p><strong>Role:</strong> Salesperson</p>
              <hr />
              <button>Change Password</button>
              <button>Logout</button>
            </div>
          )}
        </div>
      </header>

      {/* Sidebar */}
      <aside className="sidebar">
        <button onClick={() => setActivePage("welcome")}>🏠 Welcome</button>
        <button onClick={() => setActivePage("received")}>📦 Received Bottles</button>
        <button onClick={() => setActivePage("insert")}>🧾 Insert Sales History</button>
        <button onClick={() => setActivePage("history")}>📈 Selling History</button>
      </aside>

      {/* Main Content */}
      <main className="content">{renderContent()}</main>
    </div>
  );
}

export default Salesperson;
