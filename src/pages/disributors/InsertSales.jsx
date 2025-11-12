import React, { useState } from "react";
import "./Insertsales.css";

function InsertSales() {
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!type || !quantity || !unitPrice) {
      setMessage("⚠️ Please fill all fields before submitting.");
      return;
    }

    setMessage("✅ Sales record added successfully!");

    // Clear form after submit
    setType("");
    setQuantity("");
    setUnitPrice("");
  };

  return (
    <div className="insert-sales-container">
      <h2>Insert Sales Record</h2>
      <form className="insert-sales-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">-- Select Type --</option>
            <option value="2L">2L</option>
            <option value="1L">1L</option>
            <option value="1/2L">1/2L</option>
            <option value="1/4L">1/4L</option>
          </select>
        </div>

        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
          />
        </div>

        <div className="form-group">
          <label>Unit Price (Birr):</label>
          <input
            type="number"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            placeholder="Enter price per unit"
          />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default InsertSales;
