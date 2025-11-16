import React, { useState } from "react";

// Define the available product sizes and their initial state
const initialDistributionItems = [
  { size: "300ml", label: "300ml", distributedQty: "" },
  { size: "500ml", label: "500ml", distributedQty: "" },
  { size: "1L", label: "1L", distributedQty: "" },
  { size: "2L", label: "2L", distributedQty: "" },
];

// Define available salespersons
const salespersons = [
  "Mike Wilson",
  "Emma Davis",
  "John Smith",
];

const DistributionForm = () => {
  const [selectedSalesperson, setSelectedSalesperson] = useState("");
  const [distributionItems, setDistributionItems] = useState(initialDistributionItems);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  // Function to handle salesperson selection change
  const handleSalespersonChange = (value) => {
    setSubmitStatus(null);
    setSelectedSalesperson(value);
  };

  // Function to handle quantity input change for a specific size
  const handleQuantityChange = (index, value) => {
    setSubmitStatus(null);
    // Ensure the value is a positive integer or empty string
    const sanitizedValue = value === "" ? "" : Math.max(0, parseInt(value, 10));

    const newItems = [...distributionItems];
    newItems[index].distributedQty = sanitizedValue;
    setDistributionItems(newItems);
  };

  const handleSubmit = () => {
    // 1. Filter items with a quantity greater than zero
    const itemsToDistribute = distributionItems.filter(
      (item) => item.distributedQty > 0
    );

    // 2. Validation Checks
    if (!selectedSalesperson) {
      setSubmitStatus('error-salesperson');
      return;
    }

    if (itemsToDistribute.length === 0) {
      setSubmitStatus('error-quantity');
      return;
    }

    // 3. Start Submission Simulation
    setIsSubmitting(true);
    setSubmitStatus(null);

    const distributionData = {
      salesperson: selectedSalesperson,
      items: itemsToDistribute,
    };

    // Simulate API call delay (e.g., 2 seconds)
    setTimeout(() => {
      console.log("Submitting Distribution Data:", distributionData);

      // Simulate successful submission
      setIsSubmitting(false);
      setSubmitStatus('success');

      // 4. Reset the form state after success
      setSelectedSalesperson("");
      setDistributionItems(initialDistributionItems);

      // Optionally clear the success message after a few seconds
      setTimeout(() => setSubmitStatus(null), 5000);

    }, 2000); // 2 second delay
  };
  
  // Custom styling for the loading spinner
  const loaderStyle = {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #007bff',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    animation: 'spin 1s linear infinite',
    marginRight: '10px',
    display: 'inline-block',
  };
  
  // Custom CSS keyframes for the spinner (necessary for inline style approach)
  const spinKeyframes = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;

  const isSubmitDisabled = isSubmitting || !selectedSalesperson || distributionItems.every(item => item.distributedQty <= 0);
  
  // Helper to check if any item has a positive quantity entered
  const hasQuantityEntered = distributionItems.some(item => item.distributedQty > 0);

  return (
    <div
      className="form-box"
      style={{
        padding: "20px",
        border: "1px solid #0056b3",
        borderRadius: "8px",
        maxWidth: "600px",
        margin: "20px auto",
        backgroundColor: "#f4f9ff",
      }}
    >
      <style>{spinKeyframes}</style>
      <h3>🚚 መላኪያ (Distribution)</h3>

      {/* Status Message Display */}
      {submitStatus === 'success' && (
        <div style={{ padding: '10px', backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', borderRadius: '4px', marginBottom: '15px', fontWeight: 'bold' }}>
          ✅ መላኩ በተሳካ ሁኔታ ተመዝግቧል! (Distribution recorded successfully!)
        </div>
      )}
      {submitStatus === 'error-salesperson' && (
        <div style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', borderRadius: '4px', marginBottom: '15px', fontWeight: 'bold' }}>
          ❌ እባክዎን የሽያጭ ሰው ስም ይምረጡ። (Please select a salesperson.)
        </div>
      )}
      {submitStatus === 'error-quantity' && (
        <div style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', borderRadius: '4px', marginBottom: '15px', fontWeight: 'bold' }}>
          ❌ እባክዎን ለመላክ ቢያንስ ለአንድ አይነት ብዛት ያስገቡ። (Please enter quantity for at least one item.)
        </div>
      )}

      {/* --- Salesperson Selection (Single Select) --- */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: !selectedSalesperson && submitStatus === 'error-salesperson' ? '#d9534f' : '#000' }}>
          ሽያጭ (Salesperson) *
        </label>
        <select
          value={selectedSalesperson}
          onChange={(e) => handleSalespersonChange(e.target.value)}
          style={{ 
            width: "100%", 
            padding: "10px", 
            borderRadius: "4px", 
            border: `1px solid ${!selectedSalesperson && submitStatus === 'error-salesperson' ? '#d9534f' : '#ccc'}` 
          }}
        >
          <option value="">ሽያጩን ስም ይምረጡ (Select salesperson)</option>
          {salespersons.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <hr style={{ margin: "20px 0" }} />

      {/* --- Multi-Item Quantity Inputs --- */}
      <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold", color: !hasQuantityEntered && submitStatus === 'error-quantity' ? '#d9534f' : '#000' }}>
        አይነት(በ ሌትር) እና ብዛት(በደርዘን) *
      </label>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {distributionItems.map((item, index) => (
          <div
            key={item.size}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "8px",
              backgroundColor: item.distributedQty > 0 ? "#e0f7ff" : "#ffffff", // Light blue background when quantity entered
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            {/* Label (Product Size) */}
            <div style={{ minWidth: "80px", fontWeight: "600" }}>
              {item.label}
            </div>

            {/* Quantity Input */}
            <div style={{ flexGrow: 1 }}>
              <input
                type="number"
                placeholder="ብዛት (በደርዘን)"
                value={item.distributedQty}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: `1px solid ${!hasQuantityEntered && submitStatus === 'error-quantity' && item.distributedQty <= 0 ? '#d9534f' : '#ccc'}`,
                  borderRadius: "4px",
                }}
                min="0"
              />
            </div>
          </div>
        ))}
      </div>

      <hr style={{ margin: "20px 0" }} />

      {/* --- Submit Button --- */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: isSubmitDisabled && !isSubmitting ? "not-allowed" : "pointer",
          opacity: isSubmitDisabled && !isSubmitting ? 0.6 : 1,
          width: "100%",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isSubmitting ? (
          <>
            <span style={loaderStyle}></span>
            ... በመላክ ላይ (Submitting)
          </>
        ) : (
          'መመዝገብ (Submit Distribution)'
        )}
      </button>
    </div>
  );
};

export default DistributionForm;