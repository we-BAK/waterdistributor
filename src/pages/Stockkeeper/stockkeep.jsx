// import React, { useState } from "react";
// import "./stockkeeper.css";
// import SummaryCards from "../../component/SummaryCards";
// import RecordReceived from "../../component/RecordReceived";
// import DistributionForm from "../../component/DistributionForm";
// import StockReceivedHistory from "../../component/StockReceivedHistory";
// import DistributionHistory from "../../component/DistributionHistory";
// import CurrentStockTable from "../../component/CurrentStockTable"
// const StockKeeperDashboard = () => {
//   const [activeTab, setActiveTab] = useState("summary");

//   const renderContent = () => {
//     switch (activeTab) {
//       case "recordReceived":
//         return <RecordReceived />;
//       case "distribution":
//         return <DistributionForm />;
//       case "stockHistory":
//         return <StockReceivedHistory />;
//       case "distributionHistory":
//         return <DistributionHistory />;
//       case "currentStock":
//         return <CurrentStockTable />;
//       default:
//         return <SummaryCards />;
//     }
//   };

//   return (
//     <div className="dashboard-layout">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <h2>📦 Stock Keeper</h2>
//         <ul>
//           <li
//             className={activeTab === "summary" ? "active" : ""}
//             onClick={() => setActiveTab("summary")}
//           >
//             Dashboard Summary
//           </li>
//           <li
//             className={activeTab === "recordReceived" ? "active" : ""}
//             onClick={() => setActiveTab("recordReceived")}
//           >
//             መረከብ (Record Received)
//           </li>
//           <li
//             className={activeTab === "distribution" ? "active" : ""}
//             onClick={() => setActiveTab("distribution")}
//           >
//             መስረከብ (Distribution)
//           </li>
//           <li
//             className={activeTab === "stockHistory" ? "active" : ""}
//             onClick={() => setActiveTab("stockHistory")}
//           >
//             የተረከብነው (Stock Received History)
//           </li>
//           <li
//             className={activeTab === "distributionHistory" ? "active" : ""}
//             onClick={() => setActiveTab("distributionHistory")}
//           >
//             ያስረከብነው (Distribution History)
//           </li>
//           <li
//             className={activeTab === "currentStock" ? "active" : ""}
//             onClick={() => setActiveTab("currentStock")}
//           >
//              ቀራ(current in store)
//           </li>
//         </ul>
//       </aside>

//       {/* Main Section */}
//       <main className="main-content">
//         <header className="dashboard-header">
//           <div>
//             <h1>Storekeeper Dashboard</h1>
//             <p>Manage your stock and distributions efficiently</p>
//           </div>
//           <div className="user-info">
//             <p>Sarah Johnson</p>
//             <span>storekeeper@waterdist.com</span>
//           </div>
//         </header>

//         {/* Dynamic Content */}
//         <div className="dashboard-content">{renderContent()}</div>
//       </main>
//     </div>
//   );
// };

// export default StockKeeperDashboard;


import React, { useState, useEffect, useRef } from "react";
import "./stockkeeper.css";
import logo from "../../assets/logo.png";
import { CircleUser, Home, Package, Truck, History, Database, BarChart3 } from "lucide-react";
import SummaryCards from "../../component/SummaryCards";
import RecordReceived from "../../component/RecordReceived";
import DistributionForm from "../../component/DistributionForm";
import StockReceivedHistory from "../../component/StockReceivedHistory";
import DistributionHistory from "../../component/DistributionHistory";
import CurrentStockTable from "../../component/CurrentStockTable";

const StockKeeperDashboard = () => {
  const [activeTab, setActiveTab] = useState("summary");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const renderContent = () => {
    switch (activeTab) {
      case "recordReceived":
        return <RecordReceived />;
      case "distribution":
        return <DistributionForm />;
      case "stockHistory":
        return <StockReceivedHistory />;
      case "distributionHistory":
        return <DistributionHistory />;
      case "currentStock":
        return <CurrentStockTable />;
      default:
        return <SummaryCards />;
    }
  };

  const handleMenuClick = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "summary":
        return "Stock Keeper Dashboard";
      case "recordReceived":
        return "Record Received Stock";
      case "distribution":
        return "Distribute Stock";
      case "stockHistory":
        return "Stock Received History";
      case "distributionHistory":
        return "Distribution History";
      case "currentStock":
        return "Current Stock";
      default:
        return "Stock Keeper Dashboard";
    }
  };

  const getPageSubtitle = () => {
    switch (activeTab) {
      case "summary":
        return "Manage your stock and distributions efficiently";
      case "recordReceived":
        return "Record new stock received from factory";
      case "distribution":
        return "Distribute stock to salespersons";
      case "stockHistory":
        return "View complete history of received stock";
      case "distributionHistory":
        return "View complete history of distributed stock";
      case "currentStock":
        return "View current stock inventory";
      default:
        return "Manage your stock and distributions efficiently";
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Mobile Hamburger */}
      <div className="mobile-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
        &#9776;
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src={logo} alt="Logo" className="logo-img" />
            <h2 className="sidebar-title">Stock Keeper</h2>
          </div>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-button ${activeTab === "summary" ? "active" : ""}`}
            onClick={() => handleMenuClick("summary")}
          >
            <BarChart3 size={20} />
            <span>Dashboard Summary</span>
          </button>
          <button
            className={`nav-button ${activeTab === "recordReceived" ? "active" : ""}`}
            onClick={() => handleMenuClick("recordReceived")}
          >
            <Package size={20} />
            <span>መረከብ (Record Received)</span>
          </button>
          <button
            className={`nav-button ${activeTab === "distribution" ? "active" : ""}`}
            onClick={() => handleMenuClick("distribution")}
          >
            <Truck size={20} />
            <span>መስረከብ (Distribution)</span>
          </button>
          <button
            className={`nav-button ${activeTab === "stockHistory" ? "active" : ""}`}
            onClick={() => handleMenuClick("stockHistory")}
          >
            <History size={20} />
            <span>የተረከብነው (Stock History)</span>
          </button>
          <button
            className={`nav-button ${activeTab === "distributionHistory" ? "active" : ""}`}
            onClick={() => handleMenuClick("distributionHistory")}
          >
            <History size={20} />
            <span>ያስረከብነው (Distribution History)</span>
          </button>
          <button
            className={`nav-button ${activeTab === "currentStock" ? "active" : ""}`}
            onClick={() => handleMenuClick("currentStock")}
          >
            <Database size={20} />
            <span>ቀራ (Current in Store)</span>
          </button>
        </nav>
      </aside>

      {/* Main Section */}
      <div className="main-content-wrapper">
        <header className="main-header" onClick={() => setSidebarOpen(false)}>
          <div className="header-content">
            <h1 className="page-title">{getPageTitle()}</h1>
            <p className="page-subtitle">{getPageSubtitle()}</p>
          </div>
          <div className="profile-area" ref={dropdownRef}>
            <div
              className="profile-icon"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <CircleUser size={28} strokeWidth={2.5} />
            </div>
            {dropdownOpen && (
              <div className="dropdown">
                <div className="dropdown-header">
                  <p className="dropdown-name">Sarah Johnson</p>
                  <p className="dropdown-role">Stock Keeper</p>
                </div>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item">Change Password</button>
                <button className="dropdown-item">Logout</button>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="dashboard-content">{renderContent()}</main>
      </div>
    </div>
  );
};

export default StockKeeperDashboard;
