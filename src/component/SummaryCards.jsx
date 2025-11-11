import React from "react";

const SummaryCards = () => {
  const totalReceived = 1200;
  const totalDistributed = 450;
  const currentStock = totalReceived - totalDistributed;

  return (
    <div className="summary">
      <div className="card">
        <h3>Hand Over Delivery (ተቀባይነት)</h3>
        <p className="count">{totalReceived}</p>
        <span>Total bottles received</span>
      </div>
      <div className="card">
        <h3>Distributed (ተላላኪ)</h3>
        <p className="count">{totalDistributed}</p>
        <span>Bottles to salespersons</span>
      </div>
      <div className="card">
        <h3>Current Stock (አሁን ያለው)</h3>
        <p className="count">{currentStock}</p>
        <span>Available bottles</span>
      </div>
    </div>
  );
};

export default SummaryCards;
