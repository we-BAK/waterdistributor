import React, { useState } from "react";
import "./Insertsales.css";

function InsertSales() {
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!type || !quantity || !unitPrice) {
      setMessage("Please fill all fields before submitting. (እባክዎን ከመላክዎ በፊት ሁሉንም መስኮች ይሙሉ።)");
      setMessageType("error");
      return;
    }

    // Calculate total
    const total = parseInt(quantity) * parseFloat(unitPrice);

    setMessage(`Sales record added successfully! (የሽያጭ መዝገብ በተሳካ ሁኔታ ታክሏል!) Total (ጠቅላላ): ${total.toLocaleString()} ብር`);
    setMessageType("success");

    // Clear form after submit
    setTimeout(() => {
      setType("");
      setQuantity("");
      setUnitPrice("");
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  return (
    <div className="insert-sales-page-container">
      <div className="insert-sales-card">
        <div className="form-header">
          <h2 className="form-title">Insert Sales Record (የሽያጭ መዝገብ ያስገቡ)</h2>
          <p className="form-subtitle">Record new sales transactions (አዲስ የሽያጭ ዝውውሮችን ይመዝግቡ)</p>
        </div>

        <form className="insert-sales-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="type">Bottle Type (የጠርሙስ አይነት)</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="form-select"
            >
              <option value="">-- Select Type (አይነት ይምረጡ) --</option>
              <option value="2L">2L</option>
              <option value="1L">1L</option>
              <option value="1/2L">1/2L</option>
              <option value="1/4L">1/4L</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity (ብዛት)</label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity (ብዛት ያስገቡ)"
              className="form-input"
              min="1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="unitPrice">Unit Price (Birr) (የአንዱ ዋጋ በብር)</label>
            <input
              id="unitPrice"
              type="number"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              placeholder="Enter price per unit (የአንዱን ዋጋ ያስገቡ)"
              className="form-input"
              min="0"
              step="0.01"
            />
          </div>

          {quantity && unitPrice && (
            <div className="total-preview">
              <span className="total-label">Total Amount (ጠቅላላ መጠን):</span>
              <span className="total-value">
                {(parseInt(quantity) * parseFloat(unitPrice) || 0).toLocaleString()} ብር
              </span>
            </div>
          )}

          <button type="submit" className="submit-btn">
            Submit Sales Record (የሽያጭ መዝገብ ያስገቡ)
          </button>
        </form>

        {message && (
          <div className={`message ${messageType}`}>
            <span className="message-icon">
              {messageType === "success" ? "✅" : "⚠️"}
            </span>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InsertSales;
