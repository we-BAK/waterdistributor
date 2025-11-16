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
    {
      id: 4,
      type: "300ml",
      quantity: 50,
      unitPrice: 12,
    },
  ];

  // Calculate the total value of the current stock
  const totalStockValue = stockData.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

  const styles = {
    container: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      padding: "24px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      marginTop: "20px",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      marginBottom: "20px",
      fontSize: "20px",
      fontWeight: "700",
      color: "#007bff", // Blue for current status
      borderBottom: "2px solid #e0f0ff",
      paddingBottom: "10px",
    },
    summaryBox: {
        backgroundColor: '#e0f0ff', // Light blue background
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        textAlign: 'right',
        fontSize: '16px',
        fontWeight: '700',
        color: '#007bff'
    },
    thead: {
      backgroundColor: "#f0f8ff",
      color: "#333",
      fontSize: "14px",
      fontWeight: "600",
    },
    th: {
      padding: "12px 15px",
      textAlign: "left",
      borderBottom: "2px solid #c9dff0",
    },
    td: {
      padding: "12px 15px",
      borderBottom: "1px solid #f0f0f0",
      fontSize: "14px",
      color: "#444",
    },
  };

  return (
    <div style={styles.container} className="current-stock-table">
      <h3 style={styles.header}>
        📊 አሁን ያለው ክምችት (Current in Stock)
      </h3>

      {/* Summary Box */}
      <div style={styles.summaryBox}>
        <span>ጠቅላላ ክምችት ዋጋ: </span>
        <span style={{ color: '#d9534f' }}>{totalStockValue.toLocaleString()} Br</span>
      </div>

      <table style={{ width: "100%", borderCollapse: "separate" }}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>ተ.ቁ</th>
            <th style={styles.th}>አይነት(በ ሌትር)</th>
            <th style={styles.th}>ብዛት(በደርዘን)</th>
            <th style={styles.th}>የአንድ ዋጋ</th>
            <th style={{ ...styles.th, textAlign: 'right' }}>አጠቃላይ ዋጋ</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((item, index) => (
            <tr
              key={item.id}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f8ff'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <td style={styles.td}>{index + 1}</td>
              <td style={{ ...styles.td, fontWeight: '500' }}>{item.type}</td>
              <td style={{ ...styles.td, color: '#32cd32' }}>{item.quantity.toLocaleString()}</td>
              <td style={styles.td}>{item.unitPrice.toLocaleString()} Br</td>
              <td style={{ ...styles.td, fontWeight: '700', color: '#0056b3', textAlign: 'right' }}>
                {(item.quantity * item.unitPrice).toLocaleString()} Br
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentStockTable;