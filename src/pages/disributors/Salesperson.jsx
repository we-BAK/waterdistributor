import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Package, FileText, BarChart3 } from "lucide-react";

// Import subcomponents
import ReceivedBottles from "./ReceivedBottles";
import InsertSales from "./InsertSales";
import SellingHistory from "./SellingHistory";

function Salesperson() {
  const [activePage, setActivePage] = useState("");

  const renderContent = () => {
    switch (activePage) {
      case "received":
        return <ReceivedBottles />;
      case "insert":
        return <InsertSales />;
      case "history":
        return <SellingHistory />;
      default:
        return (
          <div className="flex flex-wrap gap-6 justify-center items-center mt-8">
            <div
              className="bg-white rounded-lg shadow-md p-6 text-center cursor-pointer hover:shadow-lg transition-transform transform hover:-translate-y-1 w-64"
              onClick={() => setActivePage("received")}
            >
              <Package size={40} className="text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">የተቀበሉ ቦታሎች</h3>
              <p className="text-sm text-gray-600">
                ከመደብሩ የተቀበሉትን የውሃ ቦታሎች ይመልከቱ
              </p>
            </div>
            <div
              className="bg-white rounded-lg shadow-md p-6 text-center cursor-pointer hover:shadow-lg transition-transform transform hover:-translate-y-1 w-64"
              onClick={() => setActivePage("insert")}
            >
              <FileText size={40} className="text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">የሽያጭ መዝገብ ያስገቡ</h3>
              <p className="text-sm text-gray-600">
                አዲስ የሽያጭ ዝውውሮችን ይመዝግቡ
              </p>
            </div>
            <div
              className="bg-white rounded-lg shadow-md p-6 text-center cursor-pointer hover:shadow-lg transition-transform transform hover:-translate-y-1 w-64"
              onClick={() => setActivePage("history")}
            >
              <BarChart3 size={40} className="text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">የሽያጭ ታሪክ</h3>
              <p className="text-sm text-gray-600">
                ሙሉ የሽያጭ ታሪክዎን ይመልከቱ
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 w-10 mr-3" />
            <h1 className="text-2xl font-bold">የሽያጭ ዳሽቦርድ</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default Salesperson;
