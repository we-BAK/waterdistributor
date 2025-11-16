import React from "react";

const StockReceivedHistory = () => {
  const receivedHistory = [
    {
      id: 1,
      type: "2L",
      quantity: 200, 
      unitPrice: 15,  
      date: "11/11/2025",
    },
    {
      id: 2,
      type: "1L",
      quantity: 150,
      unitPrice: 18,
      date: "11/11/2025",
    },
    {
      id: 3,
      type: "0.5L",
      quantity: 100,
      unitPrice: 20,
      date: "11/11/2025",
    },
    {
      id: 4,
      type: "300ml",
      quantity: 50,
      unitPrice: 12,
      date: "12/11/2025",
    },
  ];

  const totalReceivedValue = receivedHistory.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  
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
      color: "#0056b3", // Dark Green
      borderBottom: "2px solid #e0f0ff",
      paddingBottom: "10px",
    },
    summaryBox: {
        backgroundColor: '#eaf2f8', // Light Green
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        textAlign: 'right',
        fontSize: '16px',
        fontWeight: '700',
        color: '#0056b3'
    },
    thead: {
      backgroundColor: "#eaf2f8", // Very light green header background
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
    <div style={styles.container} className="history-box">
      <h3 style={styles.header}>
        📦 የተረከቡ እቃዎች ታሪክ (Stock Received History)
      </h3>

      <div style={styles.summaryBox}>
        <span>ጠቅላላ የተረከቡ ዋጋ: </span>
        <span style={{ color: '#d9534f' }}>{totalReceivedValue.toLocaleString()} Br</span>
      </div>

      <table style={{ width: "100%", borderCollapse: "separate" }}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>ተ.ቁ</th>
            <th style={styles.th}>አይነት(በ ሌትር)</th>
            <th style={styles.th}>ብዛት(በደርዘን)</th>
            <th style={styles.th}>የአንድ ዋጋ</th>
            <th style={{ ...styles.th, textAlign: 'right' }}>አጠቃላይ ዋጋ</th>
            <th style={styles.th}>ቀን</th>
          </tr>
        </thead>
        <tbody>
          {receivedHistory.map((item, index) => (
            <tr
              key={item.id}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <td style={styles.td}>{index + 1}</td>
              <td style={{ ...styles.td, fontWeight: '500' }}>{item.type}</td>
              <td style={{ ...styles.td, color: '#32cd32' }}>{item.quantity.toLocaleString()}</td>
              <td style={styles.td}>{item.unitPrice.toLocaleString()} Br</td>
              <td style={{ ...styles.td, fontWeight: '700', color: '#007bff', textAlign: 'right' }}>
                {(item.quantity * item.unitPrice).toLocaleString()} Br
              </td>
              <td style={styles.td}>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockReceivedHistory;