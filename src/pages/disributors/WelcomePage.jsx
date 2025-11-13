import React from "react";
import "./WelcomePage.css";

function WelcomePage() {
  return (
    <div className="welcome-page-container">
      <div className="welcome-hero">
        <div className="welcome-content">
          <div className="welcome-section">
            <h2 className="welcome-title">እንኳን በደህና ተመለሱ!</h2>
            <p className="welcome-text">
              የሽያጭ ተግባሮችዎን ያቀናብሩ እና እድገትዎን በቀላሉ ይከታተሉ። 
              የተቀበሉትን የውሃ ቦታሎች ይመልከቱ፣ የሽያጭ ዝውውሮችን ይመዝግቡ፣ 
              እና የሽያጭ ታሪክዎን በአንድ ቦታ ይከታተሉ።
            </p>
            <div className="welcome-features">
              <div className="feature-item">
                <span className="feature-icon">📦</span>
                <span>የተቀበሉ ቦታሎችን ይከታተሉ</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📝</span>
                <span>የሽያጭ ዝውውሮችን ይመዝግቡ</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📈</span>
                <span>የሽያጭ ታሪክን ይመልከቱ</span>
              </div>
            </div>
          </div>

          <div className="welcome-image-container">
            <div className="welcome-illustration">
              <span className="illustration-icon">💧</span>
            </div>
          </div>
        </div>
      </div>

      <div className="welcome-stats">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <div className="stat-value">250</div>
            <div className="stat-label">ዛሬ የተቀበሉ</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <div className="stat-value">5,000</div>
            <div className="stat-label">የዛሬ ሽያጭ (ብር)</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <div className="stat-value">120</div>
            <div className="stat-label">የተሸጡ ቦታሎች</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <div className="stat-value">85%</div>
            <div className="stat-label">የሽያጭ ግብ</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
