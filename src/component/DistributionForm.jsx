import React, { useState } from "react";

const DistributionForm = () => {
  const [distributedQty, setDistributedQty] = useState("");
  const [selectedSalesperson, setSelectedSalesperson] = useState("");

  return (
    <div className="form-box">
      <h3>🚚 መላኪያ (Distribution)</h3>

      <label>አይነት(በ ሌትር)</label>
      <select>
        <option>ሌትሩን ይምረጡ</option>
        <option>300ml</option>
        <option>500ml</option>
        <option>1L</option>
        <option>2L</option>
      </select>

      <label>ሽያጭ (Salesperson)</label>
      <select
        value={selectedSalesperson}
        onChange={(e) => setSelectedSalesperson(e.target.value)}
      >
        <option>ሽያጩን ስም ይምረጡ (Select salesperson)</option>
        <option>Mike Wilson</option>
        <option>Emma Davis</option>
      </select>
      <label>ብዛት(በደርዘን)</label>
      <input
        type="number"
        placeholder="Enter quantity to distribute"
        value={distributedQty}
        onChange={(e) => setDistributedQty(e.target.value)}
      />
    
      <button>Submit</button>
    </div>
  );
};

export default DistributionForm;
