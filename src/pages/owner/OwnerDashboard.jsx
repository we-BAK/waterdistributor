import React, { useState, useEffect, useRef } from "react";
import "./OwnerDashboard.css";
import {
  CircleUser,
  Milk,
  Home,
  X,
  Lock,
  Eye,
  EyeOff,
  Users,
  DollarSign,
  CheckCircle,
  UserPlus,
  Power,
  PowerOff,
  ArrowLeft,
  Download,
  Calendar,
} from "lucide-react";
import jsPDF from "jspdf";

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

  // User Management State
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "ቃልኪዳን ሽመልስ",
      role: "Sales Person",
      email: "kalkidan@example.com",
      status: "active",
    },
    {
      id: 2,
      name: "አንተነህ ወርቁ",
      role: "Sales Person",
      email: "anteneh@example.com",
      status: "active",
    },
    {
      id: 3,
      name: "አብነት አስራት",
      role: "Sales Person",
      email: "abinet@example.com",
      status: "active",
    },
    {
      id: 4,
      name: "ሀና መንግስቱ",
      role: "Sales Person",
      email: "hana@example.com",
      status: "inactive",
    },
    {
      id: 5,
      name: "ሳራ ዮሐንስ",
      role: "Store Keeper",
      email: "sara@example.com",
      status: "active",
    },
  ]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Sales Person",
    password: "",
  });

  // Price Approval State
  // const [pendingPrices, setPendingPrices] = useState([
  //   {
  //     id: 1,
  //     category: "500ml",
  //     newPrice: 18,
  //     currentPrice: 15,
  //     requestedBy: "ቃልኪዳን ሽመልስ",
  //     date: "1/20/2025",
  //     status: "pending",
  //   },
  //   {
  //     id: 2,
  //     category: "1L",
  //     newPrice: 28,
  //     currentPrice: 25,
  //     requestedBy: "አንተነህ ወርቁ",
  //     date: "1/21/2025",
  //     status: "pending",
  //   },
  // ]);
  // const [approvedPrices, setApprovedPrices] = useState([]);

  // // Price Setting State
  // const [prices, setPrices] = useState([
  //   { category: "500ml", price: 15 },
  //   { category: "1L", price: 25 },
  //   { category: "1.5L", price: 30 },
  //   { category: "2L", price: 35 },
  // ]);
  const [editingPrice, setEditingPrice] = useState(null);
  const [priceInput, setPriceInput] = useState("");

  // Total Sold Filter State
  const [soldFilter, setSoldFilter] = useState("all"); // all, weekly, monthly, yearly

  // Report Filter State
  const [reportFilter, setReportFilter] = useState("all"); // all, 6months, yearly

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

  // const [selectedSalesPerson, setSelectedSalesPerson] = useState("");
  // Sales persons list for dropdown
  // const salesPersons = ["ቃልኪዳን ሽመልስ", "አንተነህ ወርቁ", "አብነት አስራት", "ሀና መንግስቱ"];

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

  // User Management Functions
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("Please fill all fields");
      return;
    }
    const user = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "active",
    };
    setUsers([...users, user]);
    setNewUser({ name: "", email: "", role: "Sales Person", password: "" });
    setShowAddUserModal(false);
  };

  const toggleUserStatus = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user
      )
    );
  };

  // Price Approval Functions
  // const approvePrice = (priceId) => {
  //   const price = pendingPrices.find((p) => p.id === priceId);
  //   if (price) {
  //     setApprovedPrices([...approvedPrices, { ...price, status: "approved" }]);
  //     setPendingPrices(pendingPrices.filter((p) => p.id !== priceId));
  //     // Update the actual price
  //     setPrices(
  //       prices.map((p) =>
  //         p.category === price.category ? { ...p, price: price.newPrice } : p
  //       )
  //     );
  //   }
  // };

  // //  const [selectedSalesPerson, setSelectedSalesPerson] = useState("");
  // const approvePrice = (priceId) => {
  //   const price = pendingPrices.find((p) => p.id === priceId);

  //   if (!selectedSalesPerson) {
  //     alert("Please select a salesperson before approving.");
  //     return;
  //   }

  //   if (price) {
  //     setApprovedPrices([
  //       ...approvedPrices,
  //       {
  //         ...price,
  //         status: "approved",
  //         approvedBy: selectedSalesPerson, // 👈 NEW LINE
  //       },
  //     ]);

  //     setPendingPrices(pendingPrices.filter((p) => p.id !== priceId));

  //     // Update the actual price
  //     setPrices(
  //       prices.map((p) =>
  //         p.category === price.category ? { ...p, price: price.newPrice } : p
  //       )
  //     );
  //   }
  // };

  // const rejectPrice = (priceId) => {
  //   setPendingPrices(pendingPrices.filter((p) => p.id !== priceId));
  // };

  // Price Setting Functions
  const startEditingPrice = (category) => {
    const price = prices.find((p) => p.category === category);
    setEditingPrice(category);
    setPriceInput(price.price.toString());
  };

  const savePrice = (category) => {
    const newPrice = parseFloat(priceInput);
    if (isNaN(newPrice) || newPrice <= 0) {
      alert("Please enter a valid price");
      return;
    }
    setPrices(
      prices.map((p) =>
        p.category === category ? { ...p, price: newPrice } : p
      )
    );
    setEditingPrice(null);
    setPriceInput("");
  };

  const cancelEditingPrice = () => {
    setEditingPrice(null);
    setPriceInput("");
  };

  // Filter Total Sold Data
  const getFilteredSoldData = () => {
    // In a real app, you would filter by actual dates
    // For now, we'll return all data or simulate filtered data
    if (soldFilter === "all") {
      return totalSoldDataState;
    }
    // Simulate filtered data - in production, filter by actual dates
    return totalSoldDataState;
  };

  // Filter Report Data
  const getFilteredReportData = () => {
    // In a real app, you would filter by actual dates
    // For now, we'll return all data with additional monthly/yearly data
    let filteredReceived = [...totalReceivedData];
    let filteredSold = [...totalSoldDataState];

    if (reportFilter === "6months") {
      // Add more data for 6 months
      filteredReceived = [
        ...totalReceivedData,
        {
          category: "500ml",
          quantity: 600,
          unitPrice: 15,
          date: "2/5/2025",
          storeKeeperName: "ሳራ ዮሐንስ",
        },
        {
          category: "1L",
          quantity: 400,
          unitPrice: 25,
          date: "2/10/2025",
          storeKeeperName: "ሳምሶን ታደሰ",
        },
        {
          category: "1.5L",
          quantity: 500,
          unitPrice: 30,
          date: "2/15/2025",
          storeKeeperName: "ወንድምአገኝ በተላ",
        },
        {
          category: "2L",
          quantity: 300,
          unitPrice: 35,
          date: "2/20/2025",
          storeKeeperName: "ሳራ ዮሐንስ",
        },
        {
          category: "500ml",
          quantity: 450,
          unitPrice: 15,
          date: "3/1/2025",
          storeKeeperName: "ሳምሶን ታደሰ",
        },
        {
          category: "1L",
          quantity: 350,
          unitPrice: 25,
          date: "3/5/2025",
          storeKeeperName: "ወንድምአገኝ በተላ",
        },
      ];
      filteredSold = [
        ...totalSoldDataState,
        {
          category: "500ml",
          quantity: 400,
          salesPersonName: "ቃልኪዳን ሽመልስ",
          price: 6000,
        },
        {
          category: "1L",
          quantity: 300,
          salesPersonName: "አንተነህ ወርቁ",
          price: 7500,
        },
        {
          category: "1.5L",
          quantity: 350,
          salesPersonName: "አብነት አስራት",
          price: 10500,
        },
        {
          category: "2L",
          quantity: 200,
          salesPersonName: "ሀና መንግስቱ",
          price: 7000,
        },
      ];
    } else if (reportFilter === "yearly") {
      // Add more data for yearly
      filteredReceived = [
        ...totalReceivedData,
        {
          category: "500ml",
          quantity: 600,
          unitPrice: 15,
          date: "2/5/2025",
          storeKeeperName: "ሳራ ዮሐንስ",
        },
        {
          category: "1L",
          quantity: 400,
          unitPrice: 25,
          date: "2/10/2025",
          storeKeeperName: "ሳምሶን ታደሰ",
        },
        {
          category: "1.5L",
          quantity: 500,
          unitPrice: 30,
          date: "2/15/2025",
          storeKeeperName: "ወንድምአገኝ በተላ",
        },
        {
          category: "2L",
          quantity: 300,
          unitPrice: 35,
          date: "2/20/2025",
          storeKeeperName: "ሳራ ዮሐንስ",
        },
        {
          category: "500ml",
          quantity: 450,
          unitPrice: 15,
          date: "3/1/2025",
          storeKeeperName: "ሳምሶን ታደሰ",
        },
        {
          category: "1L",
          quantity: 350,
          unitPrice: 25,
          date: "3/5/2025",
          storeKeeperName: "ወንድምአገኝ በተላ",
        },
        {
          category: "1.5L",
          quantity: 550,
          unitPrice: 30,
          date: "4/1/2025",
          storeKeeperName: "ሳራ ዮሐንስ",
        },
        {
          category: "2L",
          quantity: 400,
          unitPrice: 35,
          date: "4/10/2025",
          storeKeeperName: "ሳምሶን ታደሰ",
        },
        {
          category: "500ml",
          quantity: 700,
          unitPrice: 15,
          date: "5/1/2025",
          storeKeeperName: "ወንድምአገኝ በተላ",
        },
        {
          category: "1L",
          quantity: 500,
          unitPrice: 25,
          date: "5/15/2025",
          storeKeeperName: "ሳራ ዮሐንስ",
        },
      ];
      filteredSold = [
        ...totalSoldDataState,
        {
          category: "500ml",
          quantity: 400,
          salesPersonName: "ቃልኪዳን ሽመልስ",
          price: 6000,
        },
        {
          category: "1L",
          quantity: 300,
          salesPersonName: "አንተነህ ወርቁ",
          price: 7500,
        },
        {
          category: "1.5L",
          quantity: 350,
          salesPersonName: "አብነት አስራት",
          price: 10500,
        },
        {
          category: "2L",
          quantity: 200,
          salesPersonName: "ሀና መንግስቱ",
          price: 7000,
        },
        {
          category: "500ml",
          quantity: 500,
          salesPersonName: "ቃልኪዳን ሽመልስ",
          price: 7500,
        },
        {
          category: "1L",
          quantity: 450,
          salesPersonName: "አንተነህ ወርቁ",
          price: 11250,
        },
        {
          category: "1.5L",
          quantity: 400,
          salesPersonName: "አብነት አስራት",
          price: 12000,
        },
        {
          category: "2L",
          quantity: 300,
          salesPersonName: "ሀና መንግስቱ",
          price: 10500,
        },
      ];
    }

    return {
      totalReceived: filteredReceived,
      currentStock: currentStockData,
      totalSold: filteredSold,
    };
  };

  // Download PDF Report
  const downloadPDF = () => {
    const reportData = getFilteredReportData();
    const doc = new jsPDF();

    // Report Title
    const reportType =
      reportFilter === "all"
        ? "Complete Report"
        : reportFilter === "6months"
        ? "6 Months Report"
        : "Yearly Report";
    doc.setFontSize(18);
    doc.text("WATER DISTRIBUTION REPORT", 14, 20);
    doc.setFontSize(12);
    doc.text(reportType, 14, 28);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 36);

    let yPos = 50;

    // Total Received Section
    doc.setFontSize(14);
    doc.text("TOTAL RECEIVED", 14, yPos);
    yPos += 8;
    doc.setFontSize(10);
    doc.text("Category", 14, yPos);
    doc.text("Quantity", 60, yPos);
    doc.text("Unit Price", 90, yPos);
    doc.text("Date", 130, yPos);
    doc.text("Store Keeper", 160, yPos);
    yPos += 6;

    reportData.totalReceived.forEach((record) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(record.category, 14, yPos);
      doc.text(record.quantity.toString(), 60, yPos);
      doc.text(`${record.unitPrice} ETB`, 90, yPos);
      doc.text(record.date, 130, yPos);
      doc.text(record.storeKeeperName, 160, yPos);
      yPos += 6;
    });

    yPos += 10;

    // Current Stock Section
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFontSize(14);
    doc.text("CURRENT STOCK", 14, yPos);
    yPos += 8;
    doc.setFontSize(10);
    doc.text("Category", 14, yPos);
    doc.text("Quantity", 60, yPos);
    doc.text("Price", 90, yPos);
    yPos += 6;

    reportData.currentStock.forEach((record) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(record.category, 14, yPos);
      doc.text(record.quantity.toString(), 60, yPos);
      doc.text(`${record.price.toLocaleString()} ETB`, 90, yPos);
      yPos += 6;
    });

    yPos += 10;

    // Total Sold Section
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFontSize(14);
    doc.text("TOTAL SOLD", 14, yPos);
    yPos += 8;
    doc.setFontSize(10);
    doc.text("Category", 14, yPos);
    doc.text("Quantity", 60, yPos);
    doc.text("Sales Person", 90, yPos);
    doc.text("Price", 160, yPos);
    yPos += 6;

    reportData.totalSold.forEach((record) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(record.category, 14, yPos);
      doc.text(record.quantity.toString(), 60, yPos);
      doc.text(record.salesPersonName, 90, yPos);
      doc.text(`${record.price.toLocaleString()} ETB`, 160, yPos);
      yPos += 6;
    });

    yPos += 10;

    // Total Revenue
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text(`TOTAL REVENUE: ${totalRevenue.toLocaleString()} ETB`, 14, yPos);

    // Save the PDF
    doc.save(
      `Water_Distribution_Report_${reportFilter}_${
        new Date().toISOString().split("T")[0]
      }.pdf`
    );
  };
  //my udate
  // 1️⃣ Actual system prices
  const [prices, setPrices] = useState([
    { category: "500ml", price: 15 },
    { category: "1L", price: 25 },
  ]);

  // 2️⃣ Form states
  const [selectedSalesPerson, setSelectedSalesPerson] = useState("");
  const [selectedCatagory, setselectedCatagory] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const salesPersons = ["ቃልኪዳን ሽመልስ", "አንተነህ ወርቁ", "ሚካኤል ተክለ"];

  // 3️⃣ Approve and apply the new price to both categories (500ml & 1L)
  const approvePrice = () => {
    if (!selectedSalesPerson || !newPrice) {
      alert("Please fill all fields.");
      return;
    }

    // update new price for all categories (or you can update 1 category if you want)
    setPrices(
      prices.map((p) => ({
        ...p,
        price: Number(newPrice),
      }))
    );

    // clear the form
    setSelectedSalesPerson("");
    setNewPrice("");

    alert("Price updated successfully!");
  };

  return (
    <div className="dashboard-container">
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
                {activeSection === "users" && "User Management"}
                {activeSection === "priceApproval" && "Special page"}
                {activeSection === "setPrices" && "Set Prices"}
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
                {activeSection === "users" &&
                  "Add, manage, and control user access to the system."}
                {activeSection === "priceApproval" &&
                  " approve new price for sales persons."}
                {activeSection === "setPrices" &&
                  "Set and manage prices for different water bottle categories."}
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
              {/* Navigation Cards */}
              <div className="navigation-cards">
                <div
                  className="nav-card"
                  onClick={(e) => handleMenuClick("totalReceived", e)}
                >
                  <div className="nav-card-icon">
                    <Milk size={32} />
                  </div>
                  <div className="nav-card-content">
                    <h3 className="nav-card-title">Total Received</h3>
                    <p className="nav-card-subtitle">አጠቃላይ የተረከብነው</p>
                  </div>
                </div>
                <div
                  className="nav-card"
                  onClick={(e) => handleMenuClick("currentStock", e)}
                >
                  <div className="nav-card-icon">
                    <Milk size={32} />
                  </div>
                  <div className="nav-card-content">
                    <h3 className="nav-card-title">Current Stock</h3>
                    <p className="nav-card-subtitle">አሁን ያለ ክምችት</p>
                  </div>
                </div>
                <div
                  className="nav-card"
                  onClick={(e) => handleMenuClick("totalSold", e)}
                >
                  <div className="nav-card-icon">📈</div>
                  <div className="nav-card-content">
                    <h3 className="nav-card-title">Total Sold</h3>
                    <p className="nav-card-subtitle">አጠቃላይ የተሸጠ</p>
                  </div>
                </div>
                <div
                  className="nav-card"
                  onClick={(e) => handleMenuClick("report", e)}
                >
                  <div className="nav-card-icon">📄</div>
                  <div className="nav-card-content">
                    <h3 className="nav-card-title">Report</h3>
                    <p className="nav-card-subtitle">Complete Report</p>
                  </div>
                </div>
                <div
                  className="nav-card"
                  onClick={(e) => handleMenuClick("users", e)}
                >
                  <div className="nav-card-icon">
                    <Users size={32} />
                  </div>
                  <div className="nav-card-content">
                    <h3 className="nav-card-title">User Management</h3>
                    <p className="nav-card-subtitle">Manage Users</p>
                  </div>
                </div>
                <div
                  className="nav-card"
                  onClick={(e) => handleMenuClick("priceApproval", e)}
                >
                  <div className="nav-card-icon">
                    <CheckCircle size={32} />
                  </div>
                  <div className="nav-card-content">
                    <h3 className="nav-card-title">Special page</h3>
                    <p className="nav-card-subtitle">Special page</p>
                  </div>
                </div>
                <div
                  className="nav-card"
                  onClick={(e) => handleMenuClick("setPrices", e)}
                >
                  <div className="nav-card-icon">
                    <DollarSign size={32} />
                  </div>
                  <div className="nav-card-content">
                    <h3 className="nav-card-title">Set Prices</h3>
                    <p className="nav-card-subtitle">Manage Prices</p>
                  </div>
                </div>
              </div>

              {/* Stat Cards Below Navigation */}
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
                      {totalRevenue.toLocaleString()} ETB
                    </div>
                    <div className="stat-label">Total Revenue</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeSection !== "overview" &&
            activeSection !== "users" &&
            activeSection !== "priceApproval" &&
            activeSection !== "setPrices" && (
              <div className="content-header-section">
                {/* Back Button */}
                <button
                  className="btn-back"
                  onClick={(e) => handleMenuClick("overview", e)}
                >
                  <ArrowLeft size={20} />
                  Back to Overview
                </button>
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
                      `${totalRevenue.toLocaleString()} ETB`}
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
                    {getFilteredReportData().totalReceived.map(
                      (record, index) => (
                        <tr key={index}>
                          <td>{record.category}</td>
                          <td>{record.quantity}</td>
                          <td>{record.unitPrice} ETB</td>
                          <td>{record.date}</td>
                          <td>{record.storeKeeperName}</td>
                        </tr>
                      )
                    )}
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
                        <td>{record.price.toLocaleString()} ETB</td>
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <div>
                    <h2 className="records-title">Sold Stock Records</h2>
                    <p className="records-subtitle">
                      All water bottles sold to customers.
                    </p>
                  </div>
                  <div className="filter-buttons">
                    <button
                      className={`filter-btn ${
                        soldFilter === "all" ? "active" : ""
                      }`}
                      onClick={() => setSoldFilter("all")}
                    >
                      All
                    </button>
                    <button
                      className={`filter-btn ${
                        soldFilter === "weekly" ? "active" : ""
                      }`}
                      onClick={() => setSoldFilter("weekly")}
                    >
                      Weekly
                    </button>
                    <button
                      className={`filter-btn ${
                        soldFilter === "monthly" ? "active" : ""
                      }`}
                      onClick={() => setSoldFilter("monthly")}
                    >
                      Monthly
                    </button>
                    <button
                      className={`filter-btn ${
                        soldFilter === "yearly" ? "active" : ""
                      }`}
                      onClick={() => setSoldFilter("yearly")}
                    >
                      Yearly
                    </button>
                  </div>
                </div>
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
                    {getFilteredSoldData().map((record, index) => (
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
                        <td>{record.price.toLocaleString()} ETB</td>
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
              {/* Report Header with Filters and Download */}
              <div className="records-card">
                <div className="records-header">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      flexWrap: "wrap",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <h2 className="records-title">Complete Report</h2>
                      <p className="records-subtitle">
                        Comprehensive report of all operations.
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <div className="filter-buttons">
                        <button
                          className={`filter-btn ${
                            reportFilter === "all" ? "active" : ""
                          }`}
                          onClick={() => setReportFilter("all")}
                        >
                          All
                        </button>
                        <button
                          className={`filter-btn ${
                            reportFilter === "6months" ? "active" : ""
                          }`}
                          onClick={() => setReportFilter("6months")}
                        >
                          6 Months
                        </button>
                        <button
                          className={`filter-btn ${
                            reportFilter === "yearly" ? "active" : ""
                          }`}
                          onClick={() => setReportFilter("yearly")}
                        >
                          Yearly
                        </button>
                      </div>
                      <button
                        className="btn-download-pdf"
                        onClick={downloadPDF}
                      >
                        <Download size={20} />
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Combined Report Table */}
              <div className="records-card">
                <div className="records-header">
                  <h2 className="records-title">Complete Report Data</h2>
                  <p className="records-subtitle">
                    All operations data in one comprehensive table.
                  </p>
                </div>

                <div className="table-container">
                  <table className="stock-table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total Price</th>
                        <th>Date</th>
                        <th>Person/Store Keeper</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredReportData().totalReceived.map(
                        (record, index) => (
                          <tr key={`received-${index}`}>
                            <td>
                              <span className="report-type-badge received">
                                Received
                              </span>
                            </td>
                            <td>{record.category}</td>
                            <td>{record.quantity}</td>
                            <td>{record.unitPrice} ETB</td>
                            <td>
                              {(
                                record.quantity * record.unitPrice
                              ).toLocaleString()}{" "}
                              ETB
                            </td>
                            <td>{record.date}</td>
                            <td>{record.storeKeeperName}</td>
                          </tr>
                        )
                      )}
                      {getFilteredReportData().currentStock.map(
                        (record, index) => (
                          <tr key={`stock-${index}`}>
                            <td>
                              <span className="report-type-badge stock">
                                Current Stock
                              </span>
                            </td>
                            <td>{record.category}</td>
                            <td>{record.quantity}</td>
                            <td>-</td>
                            <td>{record.price.toLocaleString()} ETB</td>
                            <td>-</td>
                            <td>-</td>
                          </tr>
                        )
                      )}
                      {getFilteredReportData().totalSold.map(
                        (record, index) => (
                          <tr key={`sold-${index}`}>
                            <td>
                              <span className="report-type-badge sold">
                                Sold
                              </span>
                            </td>
                            <td>{record.category}</td>
                            <td>{record.quantity}</td>
                            <td>-</td>
                            <td>{record.price.toLocaleString()} ETB</td>
                            <td>-</td>
                            <td>{record.salesPersonName}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {/* User Management Section */}
          {activeSection === "users" && (
            <>
              <button
                className="btn-back"
                onClick={(e) => handleMenuClick("overview", e)}
                style={{ marginBottom: "24px" }}
              >
                <ArrowLeft size={20} />
                Back to Overview
              </button>
              <div className="records-card">
                <div className="records-header">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <h2 className="records-title">User Management</h2>
                      <p className="records-subtitle">
                        Add, manage, and control user access to the system.
                      </p>
                    </div>
                    <button
                      className="btn-add-user"
                      onClick={() => setShowAddUserModal(true)}
                    >
                      <UserPlus size={20} />
                      Add User
                    </button>
                  </div>
                </div>

                <div className="table-container">
                  <table className="stock-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>
                            <span
                              className={`status-badge ${
                                user.status === "active" ? "active" : "inactive"
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className={`btn-status ${
                                user.status === "active"
                                  ? "btn-deactivate"
                                  : "btn-activate"
                              }`}
                              onClick={() => toggleUserStatus(user.id)}
                              title={
                                user.status === "active"
                                  ? "Deactivate"
                                  : "Activate"
                              }
                            >
                              {user.status === "active" ? (
                                <PowerOff size={18} />
                              ) : (
                                <Power size={18} />
                              )}
                              {user.status === "active"
                                ? "Deactivate"
                                : "Activate"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
          {/* Price Approval Section */}
          {activeSection === "priceApproval" && (
            <>
              <button
                className="btn-back"
                onClick={(e) => handleMenuClick("overview", e)}
                style={{ marginBottom: "24px" }}
              >
                <ArrowLeft size={20} />
                Back to Overview
              </button>

              <div className="price-approval-container">
                {/* Update Price Section */}
                <div className="records-card">
                  <div className="records-header">
                    <h2 className="records-title">Special page</h2>
                    <p className="records-subtitle">
                      Choose a salesperson and set a new price.
                    </p>
                  </div>
                  <div className="form-col">
                    {/* Sales Person Selection */}
                    <div className="form-row">
                      <label className="form-group label">
                        Select Sales Person:
                      </label>
                      <select
                        className="form-control"
                        value={selectedSalesPerson}
                        onChange={(e) => setSelectedSalesPerson(e.target.value)}
                      >
                        <option value="">Select Sales Person</option>
                        {salesPersons.map((s, index) => (
                          <option key={index} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* //select the catagory */}
                    <div className="form-row">
                      <label className="form-group label">Category:</label>
                      <select
                        className="form-control"
                        value={selectedCatagory}
                        onChange={(e) => setselectedCatagory(e.target.value)}
                      >
                        <option value="1L">1L</option>
                        <option value="2L">2L</option>
                      </select>
                    </div>

                    {/* New Price Input */}
                    <div className="form-row" style={{ marginTop: "15px" }}>
                      <label className="form-group label">New Price:</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Enter new price"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                      />
                      <button
                        className="approve-btn"
                        onClick={approvePrice}
                        style={{ marginLeft: 10 }}
                      >
                        Approve
                      </button>
                    </div>
                  </div>

                  {/* Display Updated Prices */}
                  {/* <div style={{ marginTop: 25 }}>
                    <h3 className="records-title">Updated Prices</h3>
                    <div className="table-container">
                      <table className="stock-table">
                        <thead>
                          <tr>
                            <th>Category</th>
                            <th>Updated Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {prices.map((p) => (
                            <tr key={p.category}>
                              <td>{p.category}</td>
                              <td>{p.price} Birr</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div> */}
                </div>
              </div>
            </>
          )}

          {/* Set Prices Section */}
          {activeSection === "setPrices" && (
            <>
              <button
                className="btn-back"
                onClick={(e) => handleMenuClick("overview", e)}
                style={{ marginBottom: "24px" }}
              >
                <ArrowLeft size={20} />
                Back to Overview
              </button>
              <div className="records-card">
                <div className="records-header">
                  <h2 className="records-title">Set Prices</h2>
                  <p className="records-subtitle">
                    Set and manage prices for different water bottle categories.
                  </p>
                </div>

                <div className="table-container">
                  <table className="stock-table">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Current Price</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prices.map((price) => (
                        <tr key={price.category}>
                          <td>{price.category}</td>
                          <td>
                            {editingPrice === price.category ? (
                              <div
                                style={{
                                  display: "flex",
                                  gap: "8px",
                                  alignItems: "center",
                                }}
                              >
                                <input
                                  type="number"
                                  value={priceInput}
                                  onChange={(e) =>
                                    setPriceInput(e.target.value)
                                  }
                                  className="price-input"
                                  min="0"
                                  step="0.01"
                                />
                                <button
                                  className="btn-save-price"
                                  onClick={() => savePrice(price.category)}
                                >
                                  Save
                                </button>
                                <button
                                  className="btn-cancel-price"
                                  onClick={cancelEditingPrice}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <span
                                style={{ fontSize: "18px", fontWeight: "bold" }}
                              >
                                {price.price} ETB
                              </span>
                            )}
                          </td>
                          <td>
                            {editingPrice !== price.category && (
                              <button
                                className="btn-edit-price"
                                onClick={() =>
                                  startEditingPrice(price.category)
                                }
                              >
                                Edit Price
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
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

      {/* Add User Modal */}
      {showAddUserModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowAddUserModal(false)}
        >
          <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add New User</h2>
              <button
                className="modal-close-btn"
                onClick={() => setShowAddUserModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="modal-content">
              <form onSubmit={handleAddUser} className="password-form">
                <div className="form-group">
                  <label htmlFor="userName">Full Name</label>
                  <input
                    type="text"
                    id="userName"
                    className="form-input"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="userEmail">Email</label>
                  <input
                    type="email"
                    id="userEmail"
                    className="form-input"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="userRole">Role</label>
                  <select
                    id="userRole"
                    className="form-input"
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({ ...newUser, role: e.target.value })
                    }
                    required
                  >
                    <option value="Sales Person">Sales Person</option>
                    <option value="Store Keeper">Store Keeper</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="userPassword">Password</label>
                  <input
                    type="password"
                    id="userPassword"
                    className="form-input"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    placeholder="Enter password"
                    required
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => setShowAddUserModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
