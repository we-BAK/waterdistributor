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


import React, { useState } from "react";
import "./stockkeeper.css";
import SummaryCards from "../../component/SummaryCards";
import RecordReceived from "../../component/RecordReceived";
import DistributionForm from "../../component/DistributionForm";
import StockReceivedHistory from "../../component/StockReceivedHistory";
import DistributionHistory from "../../component/DistributionHistory";
import CurrentStockTable from "../../component/CurrentStockTable";

const StockKeeperDashboard = () => {
  const [activeTab, setActiveTab] = useState("summary");
  const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile sidebar toggle

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

  return (
    <div className="dashboard-layout">
      {/* Hamburger for mobile */}
      <div className="mobile-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
        &#9776; {/* three lines */}
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2>📦 Stock Keeper</h2>
        <ul>
          <li className={activeTab === "summary" ? "active" : ""} onClick={() => setActiveTab("summary")}>Dashboard Summary</li>
          <li className={activeTab === "recordReceived" ? "active" : ""} onClick={() => setActiveTab("recordReceived")}>መረከብ (Record Received)</li>
          <li className={activeTab === "distribution" ? "active" : ""} onClick={() => setActiveTab("distribution")}>መስረከብ (Distribution)</li>
          <li className={activeTab === "stockHistory" ? "active" : ""} onClick={() => setActiveTab("stockHistory")}>የተረከብነው (Stock Received History)</li>
          <li className={activeTab === "distributionHistory" ? "active" : ""} onClick={() => setActiveTab("distributionHistory")}>ያስረከብነው (Distribution History)</li>
          <li className={activeTab === "currentStock" ? "active" : ""} onClick={() => setActiveTab("currentStock")}>ቀራ(current in store)</li>
        </ul>
      </aside>

      {/* Main Section */}
      <main className="main-content" onClick={() => setSidebarOpen(false)}>
        <header className="dashboard-header">
          <div>
            <h1>Storekeeper Dashboard</h1>
            <p>Manage your stock and distributions efficiently</p>
          </div>
          <div className="user-info">
            <p>Sarah Johnson</p>
            <span>storekeeper@waterdist.com</span>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="dashboard-content">{renderContent()}</div>
      </main>
    </div>
  );
};

export default StockKeeperDashboard;
