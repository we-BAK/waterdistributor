import React, { useState, useEffect, useRef } from "react";
import "./Salesperson.css";
import logo from "../../assets/logo.png";
import { CircleUser, Home, Package, FileText, BarChart3 } from "lucide-react";

// ንዑስ ክፍሎችን አስመጣ
import WelcomePage from "./WelcomePage";
import ReceivedBottles from "./ReceivedBottles";
import InsertSales from "./InsertSales";
import SellingHistory from "./SellingHistory";

function Salesperson() {
  const [activePage, setActivePage] = useState("welcome");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  // የውስጥ ዝርዝር እንዳይቀመጥ የመጫኛ አካል ከውጭ በመጫን ዝጋ
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

  const handleMenuClick = (page) => {
    setActivePage(page);
    setSidebarOpen(false); // በስልክ ላይ ከመምረጥ በኋላ የጎን መዝገብ ይዝጋ
  };

  return (
    <div className="sales-container">
      {/* የስልክ ሃምበርገር ምናሌ */}
      <div className="mobile-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
        &#9776;
      </div>

      {/* የጎን መዝገብ */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src={logo} alt="Logo" className="logo-img" />
            <h2 className="sidebar-title">ሽያጭ ባለሙያ</h2>
          </div>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-button ${activePage === "welcome" ? "active" : ""}`}
            onClick={() => handleMenuClick("welcome")}
          >
            <Home size={20} />
            <span>እንኳን ደህና መጡ</span>
          </button>
          <button
            className={`nav-button ${activePage === "received" ? "active" : ""}`}
            onClick={() => handleMenuClick("received")}
          >
            <Package size={20} />
            <span>የተቀበሉ ቦታሎች</span>
          </button>
          <button
            className={`nav-button ${activePage === "insert" ? "active" : ""}`}
            onClick={() => handleMenuClick("insert")}
          >
            <FileText size={20} />
            <span>የሽያጭ መዝገብ ያስገቡ</span>
          </button>
          <button
            className={`nav-button ${activePage === "history" ? "active" : ""}`}
            onClick={() => handleMenuClick("history")}
          >
            <BarChart3 size={20} />
            <span>የሽያጭ ታሪክ</span>
          </button>
        </nav>
      </aside>

      {/* ዋና ይዘት */}
      <div className="main-content-wrapper">
        {/* ራስጌ */}
        <header className="main-header">
          <div className="header-content">
            <h1 className="page-title">
              {activePage === "welcome" && "እንኳን ወደ የሽያጭ ዳሽቦርድ በደህና መጡ"}
              {activePage === "received" && "የተቀበሉ የውሃ ቦታሎች"}
              {activePage === "insert" && "የሽያጭ መዝገብ ያስገቡ"}
              {activePage === "history" && "የሽያጭ ታሪክ"}
            </h1>
            <p className="page-subtitle">
              {activePage === "welcome" && "የሽያጭ ስራዎን ያቀናብሩ እና የእድገትዎን ሂደት ይከታተሉ"}
              {activePage === "received" && "ከመደብሩ የተቀበሉትን የውሃ ቦታሎች ይመልከቱ"}
              {activePage === "insert" && "አዲስ የሽያጭ ዝውውሮችን ይመዝግቡ"}
              {activePage === "history" && "ሙሉ የሽያጭ ታሪክዎን ይመልከቱ"}
            </p>
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
                  <p className="dropdown-name">አሌክስ</p>
                  <p className="dropdown-role">ሽያጭ ባለሙያ</p>
                </div>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item">የይለፍ ቃል ይቀይሩ</button>
                <button className="dropdown-item">ይውጡ</button>
              </div>
            )}
          </div>
        </header>

        {/* ዋና ይዘት ክፍል */}
        <main className="content" onClick={() => setSidebarOpen(false)}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default Salesperson;
