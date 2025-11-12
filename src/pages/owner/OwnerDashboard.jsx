import React, { useState, useEffect, useRef } from "react";
import "./OwnerDashboard.css";
import { CircleUser, Milk, Home, X, Lock, Eye, EyeOff } from "lucide-react";

export default function OwnerDashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const dropdownRef = useRef(null);
  const settingsModalRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Prevent body scroll when modal is open and handle ESC key
  useEffect(() => {
    if (showSettings) {
      document.body.style.overflow = "hidden";

      const handleEscape = (event) => {
        if (event.key === "Escape") {
          setShowSettings(false);
        }
      };

      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showSettings]);

  // Total Received Data - Category (liters), Quantity, Unit Price, Date, Store Keeper Name
  const totalReceivedData = [
    {
      category: "500ml",
      quantity: 500,
      unitPrice: 15,
      date: "1/8/2025",
      storeKeeperName: "ሳራ ዮሐንስ",
    },
    {
      category: "1L",
      quantity: 300,
      unitPrice: 25,
      date: "1/10/2025",
      storeKeeperName: "ሳራ ዮሐንስ",
    },
    {
      category: "1.5L",
      quantity: 400,
      unitPrice: 30,
      date: "1/12/2025",
      storeKeeperName: "ሳምሶን ታደሰ",
    },
    {
      category: "500ml",
      quantity: 250,
      unitPrice: 15,
      date: "1/15/2025",
      storeKeeperName: "ወንድምአገኝ በተላ",
    },
    {
      category: "2L",
      quantity: 200,
      unitPrice: 35,
      date: "1/18/2025",
      storeKeeperName: "ሳራ ዮሐንስ",
    },
  ];

  // Total Sold Data - Category, Quantity, Sales Person Name, Price (using state)
  const [totalSoldDataState, setTotalSoldDataState] = useState([
    {
      category: "500ml",
      quantity: 350,
      salesPersonName: "ቃልኪዳን ሽመልስ",
      price: 5250,
    },
    {
      category: "1L",
      quantity: 200,
      salesPersonName: "አንተነህ ወርቁ",
      price: 5000,
    },
    {
      category: "1.5L",
      quantity: 250,
      salesPersonName: "አብነት አስራት",
      price: 7500,
    },
    {
      category: "2L",
      quantity: 150,
      salesPersonName: "ሀና መንግስቱ",
      price: 5250,
    },
  ]);

  // Current Stock Data - Category, Quantity, Price
  const currentStockData = [
    {
      category: "500ml",
      quantity: 400,
      price: 6000,
    },
    {
      category: "1L",
      quantity: 100,
      price: 2500,
    },
    {
      category: "1.5L",
      quantity: 150,
      price: 4500,
    },
    {
      category: "2L",
      quantity: 50,
      price: 1750,
    },
  ];

  // Sales persons list for dropdown
  const salesPersons = ["ቃልኪዳን ሽመልስ", "አንተነህ ወርቁ", "አብነት አስራት", "ሀና መንግስቱ"];

  // Calculate totals
  const totalReceived = totalReceivedData.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalSold = totalSoldDataState.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalCurrentStock = currentStockData.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalRevenue = totalSoldDataState.reduce(
    (sum, item) => sum + item.price,
    0
  );

  // Handle menu click
  const handleMenuClick = (section, e) => {
    e.preventDefault();
    setActiveSection(section);
  };

  // Handle sales person change
  const handleSalesPersonChange = (index, newSalesPerson) => {
    const updatedData = [...totalSoldDataState];
    updatedData[index].salesPersonName = newSalesPerson;
    setTotalSoldDataState(updatedData);
  };

  // Handle settings button click
  const handleSettingsClick = () => {
    setOpen(false);
    setShowSettings(true);
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    // Validate form
    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      setPasswordError("All fields are required");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New password and confirm password do not match");
      return;
    }

    if (passwordForm.currentPassword === passwordForm.newPassword) {
      setPasswordError("New password must be different from current password");
      return;
    }

    // Simulate password change (replace with actual API call)
    setTimeout(() => {
      setPasswordSuccess("Password changed successfully!");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => {
        setPasswordSuccess("");
      }, 3000);
    }, 500);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
    setPasswordError("");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Owner Dashboard</h2>
        </div>
        <nav className="sidebar-nav">
          {/* <div className="nav-section-label">Navigation</div> */}
          <a
            href="#"
            className={`menu-item ${
              activeSection === "overview" ? "active" : ""
            }`}
            onClick={(e) => handleMenuClick("overview", e)}
          >
            <span className="menu-icon">
              <Home
                color={activeSection === "overview" ? "#ffffff" : "#000000"}
                size={20}
              />
            </span>
            <span>Overview</span>
          </a>
          <a
            href="#"
            className={`menu-item ${
              activeSection === "totalReceived" ? "active" : ""
            }`}
            onClick={(e) => handleMenuClick("totalReceived", e)}
          >
            <span className="menu-icon">
              <Milk
                color={
                  activeSection === "totalReceived" ? "#ffffff" : "#000000"
                }
                size={20}
              />
            </span>
            <span>Total Received(አጠቃላይ የተረከብነው)</span>
          </a>
          <a
            href="#"
            className={`menu-item ${
              activeSection === "currentStock" ? "active" : ""
            }`}
            onClick={(e) => handleMenuClick("currentStock", e)}
          >
            <span className="menu-icon">
              <Milk
                color={activeSection === "currentStock" ? "#ffffff" : "#000000"}
                size={20}
              />
            </span>
            <span>Current Stock(አሁን ያለ ክምችት)</span>
          </a>
          <a
            href="#"
            className={`menu-item ${
              activeSection === "totalSold" ? "active" : ""
            }`}
            onClick={(e) => handleMenuClick("totalSold", e)}
          >
            <span className="menu-icon">📈</span>
            <span>Total Sold(አጠቃላይ የተሸጠ)</span>
          </a>
          <a
            href="#"
            className={`menu-item ${
              activeSection === "report" ? "active" : ""
            }`}
            onClick={(e) => handleMenuClick("report", e)}
          >
            <span className="menu-icon">📄</span>
            <span>Report</span>
          </a>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="main-content">
        {/* Header */}
        <header className="main-header">
          <div className="header-wrapper">
            <div className="header-content">
              <h1 className="page-title">
                {activeSection === "overview" && "Welcome to Owner Dashboard"}
                {activeSection === "totalReceived" &&
                  "Total Received Water Bottles"}
                {activeSection === "currentStock" && "Current Stock"}
                {activeSection === "totalSold" && "Total Sold Water Bottles"}
                {activeSection === "report" && "Complete Report"}
              </h1>
              <p className="page-subtitle">
                {activeSection === "overview" &&
                  "Manage your water distribution business efficiently and effectively."}
                {activeSection === "totalReceived" &&
                  "Complete history of all stock received from factory."}
                {activeSection === "currentStock" &&
                  "Current inventory of water bottles in stock."}
                {activeSection === "totalSold" &&
                  "Complete history of all water bottles sold."}
                {activeSection === "report" &&
                  "Comprehensive report of all operations."}
              </p>
            </div>
            <div className="profile-area" ref={dropdownRef}>
              <div onClick={() => setOpen(!open)} className="profile-icon">
                <CircleUser color="#3b82f6" size={28} strokeWidth={2.5} />
              </div>

              {open && (
                <div className="dropdown">
                  <p>Aby</p>
                  <button onClick={handleSettingsClick}>Settings</button>
                  <button onClick={() => setOpen(false)}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="content-body">
          {/* Overview Section */}
          {activeSection === "overview" && (
            <div className="overview-container">
              <div className="overview-hero">
                <div className="overview-content">
                  <div className="welcome-section">
                    <h2 className="welcome-title">Welcome Back!</h2>
                    <p className="welcome-text">
                      Manage your water distribution business with ease. Track
                      inventory, monitor sales, and generate comprehensive
                      reports all in one place.
                    </p>
                    <div className="welcome-features">
                      {/* <div className="feature-item">
                        <span className="feature-icon">📦</span>
                        <span>Track Inventory</span>
                      </div> */}
                      {/* <div className="feature-item">
                        <span className="feature-icon">📈</span>
                        <span>Monitor Sales</span>
                      </div> */}
                      {/* <div className="feature-item">
                        <span className="feature-icon">📄</span>
                        <span>Generate Reports</span>
                      </div> */}
                    </div>
                  </div>
                  <div className="overview-image-container">
                    <img
                      src="https://media.istockphoto.com/id/1018107448/photo/natural-drinking-water-in-a-large-bottle.jpg?s=1024x1024&w=is&k=20&c=LVNYSsGSdUaganIhSJ972Y6ZDOVK8yPKkWNgfFxxo9M="
                      alt="Natural drinking water in a large bottle"
                      className="overview-image"
                    />
                  </div>
                </div>
              </div>

              <div className="overview-stats">
                <div className="stat-card">
                  <div className="stat-icon">📦</div>
                  <div className="stat-info">
                    <div className="stat-value">{totalReceived}</div>
                    <div className="stat-label">Total Received</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📊</div>
                  <div className="stat-info">
                    <div className="stat-value">{totalCurrentStock}</div>
                    <div className="stat-label">Current Stock</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📈</div>
                  <div className="stat-info">
                    <div className="stat-value">{totalSold}</div>
                    <div className="stat-label">Total Sold</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">💰</div>
                  <div className="stat-info">
                    <div className="stat-value">
                      ${totalRevenue.toLocaleString()}
                    </div>
                    <div className="stat-label">Total Revenue</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection !== "overview" && (
            <div className="content-header-section">
              {/* Summary Card */}
              <div className="summary-card">
                <div className="summary-header">
                  <span className="summary-icon">
                    {activeSection === "totalReceived" && "📦"}
                    {activeSection === "currentStock" && "📦"}
                    {activeSection === "totalSold" && "📈"}
                    {activeSection === "report" && "📄"}
                  </span>
                  <span className="summary-label">
                    {activeSection === "totalReceived" && "Total Received"}
                    {activeSection === "currentStock" && "Current Stock"}
                    {activeSection === "totalSold" && "Total Sold"}
                    {activeSection === "report" && "Total Revenue"}
                  </span>
                </div>
                <div className="summary-value">
                  {activeSection === "totalReceived" && totalReceived}
                  {activeSection === "currentStock" && totalCurrentStock}
                  {activeSection === "totalSold" && totalSold}
                  {activeSection === "report" &&
                    `$${totalRevenue.toLocaleString()}`}
                </div>
                <div className="summary-footer">
                  {activeSection === "totalReceived" && "All time"}
                  {activeSection === "currentStock" && "In stock"}
                  {activeSection === "totalSold" && "All time"}
                  {activeSection === "report" && "Total earnings"}
                </div>
              </div>
            </div>
          )}

          {/* Total Received Table */}
          {activeSection === "totalReceived" && (
            <div className="records-card">
              <div className="records-header">
                <h2 className="records-title">Received Stock Records</h2>
                <p className="records-subtitle">
                  All water bottles received from the factory.
                </p>
              </div>

              <div className="table-container">
                <table className="stock-table">
                  <thead>
                    <tr>
                      <th>Category (Liters)</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Date</th>
                      <th>Store Keeper Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {totalReceivedData.map((record, index) => (
                      <tr key={index}>
                        <td>{record.category}</td>
                        <td>{record.quantity}</td>
                        <td>${record.unitPrice}</td>
                        <td>{record.date}</td>
                        <td>{record.storeKeeperName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Current Stock Table */}
          {activeSection === "currentStock" && (
            <div className="records-card">
              <div className="records-header">
                <h2 className="records-title">Current Stock Records</h2>
                <p className="records-subtitle">
                  Current inventory of water bottles available in stock.
                </p>
              </div>

              <div className="table-container">
                <table className="stock-table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentStockData.map((record, index) => (
                      <tr key={index}>
                        <td>{record.category}</td>
                        <td>{record.quantity}</td>
                        <td>${record.price.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Total Sold Table */}
          {activeSection === "totalSold" && (
            <div className="records-card">
              <div className="records-header">
                <h2 className="records-title">Sold Stock Records</h2>
                <p className="records-subtitle">
                  All water bottles sold to customers.
                </p>
              </div>

              <div className="table-container">
                <table className="stock-table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Quantity</th>
                      <th>Sales Person Name</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {totalSoldDataState.map((record, index) => (
                      <tr key={index}>
                        <td>{record.category}</td>
                        <td>{record.quantity}</td>
                        <td>
                          <select
                            className="sales-person-select"
                            value={record.salesPersonName}
                            onChange={(e) =>
                              handleSalesPersonChange(index, e.target.value)
                            }
                          >
                            {salesPersons.map((person, idx) => (
                              <option key={idx} value={person}>
                                {person}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>${record.price.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Report Section - All Data Combined */}
          {activeSection === "report" && (
            <div className="report-container">
              {/* Total Received Section */}
              <div className="records-card">
                <div className="records-header">
                  <h2 className="records-title">Total Received</h2>
                  <p className="records-subtitle">
                    Complete history of all stock received from factory.
                  </p>
                </div>

                <div className="table-container">
                  <table className="stock-table">
                    <thead>
                      <tr>
                        <th>Category (Liters)</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Date</th>
                        <th>Store Keeper Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {totalReceivedData.map((record, index) => (
                        <tr key={index}>
                          <td>{record.category}</td>
                          <td>{record.quantity}</td>
                          <td>${record.unitPrice}</td>
                          <td>{record.date}</td>
                          <td>{record.storeKeeperName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Current Stock Section */}
              <div className="records-card">
                <div className="records-header">
                  <h2 className="records-title">Current Stock</h2>
                  <p className="records-subtitle">
                    Current inventory of water bottles available in stock.
                  </p>
                </div>

                <div className="table-container">
                  <table className="stock-table">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentStockData.map((record, index) => (
                        <tr key={index}>
                          <td>{record.category}</td>
                          <td>{record.quantity}</td>
                          <td>${record.price.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total Sold Section */}
              <div className="records-card">
                <div className="records-header">
                  <h2 className="records-title">Total Sold</h2>
                  <p className="records-subtitle">
                    All water bottles sold to customers.
                  </p>
                </div>

                <div className="table-container">
                  <table className="stock-table">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Sales Person Name</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {totalSoldDataState.map((record, index) => (
                        <tr key={index}>
                          <td>{record.category}</td>
                          <td>{record.quantity}</td>
                          <td>{record.salesPersonName}</td>
                          <td>${record.price.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="modal-overlay" onClick={() => setShowSettings(false)}>
          <div
            className="settings-modal"
            ref={settingsModalRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">Settings</h2>
              <button
                className="modal-close-btn"
                onClick={() => setShowSettings(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="modal-content">
              <div className="settings-section">
                <h3 className="settings-section-title">
                  <Lock size={20} />
                  Change Password
                </h3>
                <form onSubmit={handlePasswordChange} className="password-form">
                  <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <div className="password-input-wrapper">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <div className="password-input-wrapper">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Enter new password (min 8 characters)"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">
                      Confirm New Password
                    </label>
                    <div className="password-input-wrapper">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  {passwordError && (
                    <div className="form-error">{passwordError}</div>
                  )}
                  {passwordSuccess && (
                    <div className="form-success">{passwordSuccess}</div>
                  )}

                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={() => setShowSettings(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-submit">
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
