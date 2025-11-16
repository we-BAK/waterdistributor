import React, { useState } from "react";

const initialInventoryItems = [
  { size: "2L", label: "2L", isSelected: false, receivedQty: "", unitPrice: "" },
  { size: "1L", label: "1L", isSelected: false, receivedQty: "", unitPrice: "" },
  { size: "1/2L", label: "1/2L(500ml)", isSelected: false, receivedQty: "", unitPrice: "" },
  { size: "1/4L", label: "1/4L(300ml)", isSelected: false, receivedQty: "", unitPrice: "" },
];

const RecordReceived = () => {
  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  // Function to handle the checkbox/selection change
  const handleItemToggle = (index) => {
    // Clear status messages on interaction
    setSubmitStatus(null);
    const newItems = [...inventoryItems];
    newItems[index].isSelected = !newItems[index].isSelected;
    setInventoryItems(newItems);
  };

  // Function to handle input changes (Quantity or Unit Price)
  const handleInputChange = (index, field, value) => {
    // Clear status messages on interaction
    setSubmitStatus(null);
    const newItems = [...inventoryItems];
    // Ensure inputs are treated as positive numbers or empty string
    const sanitizedValue = value === "" ? "" : Math.max(0, parseFloat(value));
    newItems[index][field] = sanitizedValue;
    setInventoryItems(newItems);
  };

  // Filter only the selected items
  const selectedItems = inventoryItems.filter(item => item.isSelected);

  const handleSubmit = () => {
    // 1. Validation Check
    const isFormValid = selectedItems.every(item => 
      item.receivedQty !== "" && 
      parseFloat(item.receivedQty) > 0 &&
      item.unitPrice !== "" &&
      parseFloat(item.unitPrice) >= 0
    );

    if (selectedItems.length === 0) {
      setSubmitStatus('error-none-selected');
      return;
    }

    if (!isFormValid) {
      setSubmitStatus('error-validation');
      return;
    }
    
    // 2. Start Submission Simulation
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Simulate API call delay (e.g., 2 seconds)
    setTimeout(() => {
      console.log("Submitting Received Inventory:", selectedItems);

      // Simulate successful submission
      setIsSubmitting(false);
      setSubmitStatus('success');

      // 3. Reset the form state after success
      setInventoryItems(initialInventoryItems);
      
      // Optionally clear the success message after a few seconds
      setTimeout(() => setSubmitStatus(null), 5000); 

    }, 2000); // 2 second delay
  };

  // Determine if the main submit button should be globally disabled
  const isSubmitDisabled = isSubmitting || selectedItems.length === 0;

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
  
  // Define the spin animation outside React component or use keyframes if using CSS file
  // For simplicity, we assume this CSS keyframe is available or you handle it in a global style:
  /*
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  */

  return (
    <div className="form-box" style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px", maxWidth: "600px", margin: "20px auto" }}>
      <h3>📦 መቀበያ (Record Received)</h3>

      {/* Status Message Display */}
      {submitStatus === 'success' && (
        <div style={{ padding: '10px', backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', borderRadius: '4px', marginBottom: '15px', fontWeight: 'bold' }}>
          ✅ መዝገቡ በተሳካ ሁኔታ ገብቷል! (Record submitted successfully!)
        </div>
      )}
      {submitStatus === 'error-validation' && (
        <div style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', borderRadius: '4px', marginBottom: '15px', fontWeight: 'bold' }}>
          ❌ እባክዎን ለተመረጡት እቃዎች ሁሉ ብዛት እና ዋጋ ያስገቡ። (Please enter Quantity and Unit Price for all selected items.)
        </div>
      )}
      {submitStatus === 'error-none-selected' && (
        <div style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', borderRadius: '4px', marginBottom: '15px', fontWeight: 'bold' }}>
          ❌ እባክዎ ለመቀበል ቢያንስ አንድ እቃ ይምረጡ። (Please select at least one item to record.)
        </div>
      )}

      {/* --- Inventory Selection and Inputs --- */}
      <div className="flex flex-col" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {inventoryItems.map((item, index) => (
          <div key={item.size} style={{ border: "1px solid #eee", padding: "10px", borderRadius: "5px", backgroundColor: item.isSelected ? "#f0f8ff" : "white" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Checkbox to select the item type */}
              <input
                type="checkbox"
                id={`item-${item.size}`}
                checked={item.isSelected}
                onChange={() => handleItemToggle(index)}
                style={{ transform: "scale(1.5)" }}
              />
              <label htmlFor={`item-${item.size}`} style={{ fontWeight: "bold", flexGrow: 1 }}>
                {item.label}
              </label>
            </div>
            
            {/* Conditional Inputs: Display only if selected */}
            {item.isSelected && (
              <div style={{ marginTop: "10px", paddingLeft: "30px", borderLeft: "2px solid #007bff" }}>
                
                {/* Quantity Input */}
                <label style={{ display: "block", marginTop: "5px", fontWeight: "600", fontSize: "14px", color: (item.receivedQty === "" || parseFloat(item.receivedQty) <= 0) ? '#d9534f' : '#000' }}>
                  ብዛት (በደርዘን) *
                </label>
                <input
                  type="number"
                  placeholder="Enter quantity received"
                  value={item.receivedQty}
                  onChange={(e) => handleInputChange(index, "receivedQty", e.target.value)}
                  style={{ width: "100%", padding: "8px", margin: "5px 0 10px 0", border: `1px solid ${item.receivedQty === "" || parseFloat(item.receivedQty) <= 0 ? '#d9534f' : '#ccc'}`, borderRadius: "4px" }}
                  min="0"
                />

                {/* Unit Price Input */}
                <label style={{ display: "block", marginTop: "5px", fontWeight: "600", fontSize: "14px", color: item.unitPrice === "" ? '#d9534f' : '#000' }}>
                  የአንድ ዋጋ *
                </label>
                <input
                  type="number"
                  placeholder="Enter unit price"
                  value={item.unitPrice}
                  onChange={(e) => handleInputChange(index, "unitPrice", e.target.value)}
                  style={{ width: "100%", padding: "8px", margin: "5px 0 10px 0", border: `1px solid ${item.unitPrice === "" ? '#d9534f' : '#ccc'}`, borderRadius: "4px" }}
                  min="0"
                />
              </div>
            )}
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
          cursor: isSubmitDisabled ? "not-allowed" : "pointer",
          opacity: isSubmitDisabled && !isSubmitting ? 0.6 : 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isSubmitting ? (
          <>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            <span style={loaderStyle}></span>
            ... በመላክ ላይ (Submitting)
          </>
        ) : (
          'መመዝገብ (Submit)'
        )}
      </button>
    </div>
  );
};

export default RecordReceived;