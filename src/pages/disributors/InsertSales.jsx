import React, { useState } from "react";

const PRICES = {
  "2L": 300,
  "1L": 200,
  "1/2L": 100,
  "1/4L": 60,
};

function InsertSales() {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTypes((prev) => [...prev, value]);
      setQuantities((prev) => ({ ...prev, [value]: "" }));
    } else {
      setSelectedTypes((prev) => prev.filter((type) => type !== value));
      setQuantities((prev) => {
        const updatedQuantities = { ...prev };
        delete updatedQuantities[value];
        return updatedQuantities;
      });
    }
  };

  const handleQuantityChange = (type, value) => {
    setQuantities((prev) => ({ ...prev, [type]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedTypes.length === 0) {
      setMessage("Please select at least one item. (እባክዎን ቢያንስ አንድ ነገር ይምረጡ።)");
      setMessageType("error");
      return;
    }

    for (const type of selectedTypes) {
      if (!quantities[type] || parseInt(quantities[type]) <= 0) {
        setMessage(`Please enter a valid quantity for ${type}.`);
        setMessageType("error");
        return;
      }
    }

    let total = 0;
    for (const type of selectedTypes) {
      total += parseInt(quantities[type]) * PRICES[type];
    }

    setMessage(
      `Sales record added successfully! (የሽያጭ መዝገብ በተሳካ ሁኔታ ታክሏል!) Total (ጠቅላላ): ${total.toLocaleString()} ብር`
    );
    setMessageType("success");

    setTimeout(() => {
      setSelectedTypes([]);
      setQuantities({});
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-4xl">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-blue-700">Insert Sales Record</h2>
          <p className="text-lg text-gray-600 mt-2">Record new sales transactions with ease</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-4">
              Select Bottle Types
            </label>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(PRICES).map((type) => (
                <div key={type} className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      id={`type-${type}`}
                      type="checkbox"
                      value={type}
                      checked={selectedTypes.includes(type)}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor={`type-${type}`} className="ml-2 text-lg text-gray-700">
                      {type} - {PRICES[type]} ብር
                    </label>
                  </div>
                  {selectedTypes.includes(type) && (
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={quantities[type] || ""}
                      onChange={(e) => handleQuantityChange(type, e.target.value)}
                      className="w-28 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg"
                      min="1"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {selectedTypes.length > 0 && (
            <div className="bg-gray-100 p-4 rounded-lg text-gray-700">
              <span className="font-medium text-lg">Total Amount:</span>{" "}
              <span className="font-bold text-xl">
                {selectedTypes.reduce(
                  (acc, type) =>
                    acc + (parseInt(quantities[type] || 0) * PRICES[type] || 0),
                  0
                ).toLocaleString()}{" "}
                ብር
              </span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Sales Record
          </button>
        </form>

        {message && (
          <div
            className={`mt-6 p-4 rounded-lg text-lg font-medium ${
              messageType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            <span className="mr-3">{messageType === "success" ? "✅" : "⚠️"}</span>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default InsertSales;
