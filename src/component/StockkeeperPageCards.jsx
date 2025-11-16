import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  Truck,
  History,
  Database,
} from "lucide-react";

const StockkeeperPageCards = () => {
  const navigate = useNavigate();

  // Define the cards data
  const cards = [
    
    {
      title: "መረከብ (Record Received)",
      description: "Record new incoming stock and inventory.",
      icon: <Package className="text-green-600" size={28} />,
      path: "/StockKeeper/recordReceived"
    },
    {
      title: "መስረከብ (Distribution)",
      description: "Log the distribution and outflow of stock items.",
      icon: <Truck className="text-red-600" size={28} />,
      path: "/StockKeeper/distributionForm"
    },
    {
      title: "የተረከብነው (Stock Received History)",
      description: "Review the history of all received stock.",
      icon: <History className="text-yellow-600" size={28} />,
      path: "/StockKeeper/stockReceivedHistory"
    },
    {
      title: "ያስረከብነው (Distribution History)",
      description: "Review the history of all distributed stock.",
      icon: <History className="text-purple-600" size={28} />,
      path: "/StockKeeper/distributionHistory"
    },
    {
      title: "ቀራ (Current in Store)",
      description: "See the current quantity of all items in stock.",
      icon: <Database className="text-blue-600" size={28} />,
      path: "/StockKeeper/currentStock"
    },
  ];

  // Function to handle card click and navigate
  const handleCardClick = (path) => {
    // Assuming the component is used on a page that is part of the application's routing
    navigate(path);
  };

  return (
    <div className="p-6 overflow-auto h-full">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Stock Keeper Dashboard</h1>
      {/* Tailwind grid for responsiveness */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg 
                       hover:shadow-xl transition-all duration-300 cursor-pointer 
                       transform hover:-translate-y-1" // Hover effect for interactivity
            onClick={() => handleCardClick(card.path)}
          >
            <div className="flex items-start gap-4 mb-4">
              {/* Icon container styling */}
              <div className="p-3 bg-gray-50 rounded-lg shrink-0 border border-gray-100">
                {card.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 leading-snug self-center">
                {card.title}
              </h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockkeeperPageCards;