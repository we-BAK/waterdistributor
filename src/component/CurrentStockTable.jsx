import React from "react";

const CurrentStockTable = () => {
  const stockData = [
    {
      id: 1,
      type: "2L",
      quantity: 200,
      unitPrice: 15,
      
    },
    {
      id: 2,
      type: "1L",
      quantity: 150,
      unitPrice: 18,
     
    },
    {
      id: 3,
      type: "0.5L",
      quantity: 100,
      unitPrice: 20,
      
    },
  ];

  return (
    <div
      className="current-stock-table"
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        marginTop: "20px",
      }}
    >
      <h3 style={{ marginBottom: "10px", fontSize: "16px", fontWeight: "600" }}>
        አሁን ያለው (Current in Stock)
      </h3>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr
            style={{
              backgroundColor: "#f9fafb",
              textAlign: "left",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <th style={{ padding: "8px" }}>ተራ ቁጥር</th>
            <th style={{ padding: "8px" }}>የውሃ አይነት(በ ሌትር)</th>
            <th style={{ padding: "8px" }}>ብዛት(በደርዘን)</th>
            <th style={{ padding: "8px" }}>የአንድ ዋጋ</th>
            <th style={{ padding: "8px" }}>አጠቃላይ ዋጋ</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((item, index) => (
            <tr
              key={item.id}
              style={{
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <td style={{ padding: "8px" }}>{index + 1}</td>
              <td style={{ padding: "8px" }}>{item.type}</td>
              <td style={{ padding: "8px" }}>{item.quantity}</td>
              <td style={{ padding: "8px" }}>{item.unitPrice} Br</td>
              <td style={{ padding: "8px" }}>
                {item.quantity * item.unitPrice} Br
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentStockTable;
