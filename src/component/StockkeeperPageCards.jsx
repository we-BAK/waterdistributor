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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="transform cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          onClick={() => handleCardClick(card.path)}
        >
          <div className="mb-4 flex items-start gap-4">
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              {card.icon}
            </div>
            <h3 className="text-lg font-semibold leading-snug text-gray-900">
              {card.title}
            </h3>
          </div>
          <p className="mt-2 text-sm text-gray-600">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default StockkeeperPageCards;