import React, { useState } from "react";

const RecordReceived = () => {
  const [receivedQty, setReceivedQty] = useState("");

  return (
    <div className="form-box">
      <h3>📦 መቀበያ (Record Received)</h3>
      <label>አይነት(በ ሌትር)</label>
      <select>
        <option>ሌትሩን ይምረጡ</option>
        <option>300ml</option>
        <option>500ml</option>
        <option>1L</option>
        <option>2L</option>
      </select>
      <label>ብዛት(በደርዘን)</label>
      <input
        type="number"
        placeholder="Enter quantity received"
        value={receivedQty}
        onChange={(e) => setReceivedQty(e.target.value)}
      />
      <label>የአንድ ዋጋ</label>
      <input
        type="number"
        placeholder="Enter unit price"
        value={receivedQty}
        onChange={(e) => setReceivedQty(e.target.value)}
      />
      
      <button>Submit</button>
    </div>
  );
};

export default RecordReceived;
