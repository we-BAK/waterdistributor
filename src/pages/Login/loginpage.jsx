// Loginpage.jsx
// Usage: place LoginCard.jsx and LoginCard.css in the same folder and import LoginCard into your app

import React, { useState } from "react";
import "./login.css";

export default function LoginCard() {
  const [user, setUser] = useState("");

  const demoUsers = [
    { id: "", label: "Choose a user to login" },
    { id: "agent", label: "Agent - Tsegaye" },
    { id: "manager", label: "Manager - Selam" },
    { id: "admin", label: "Admin - Bereket" }
  ];

  function handleLogin(e) {
    e.preventDefault();
    if (!user) {
      alert("Please select a user to login (demo mode).");
      return;
    }
    alert(`Logging in as: ${user}`);
  }

  return (
    <div className="page-bg">
      <div className="card">
        <div className="logo-wrap" aria-hidden>
          {/* Simple water droplet SVG icon */}
          <svg className="logo" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Water logo">
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0" stopColor="#25a9ff" />
                <stop offset="1" stopColor="#2db4ff" />
              </linearGradient>
            </defs>
            <rect width="64" height="64" rx="12" fill="url(#g)" />
            <path d="M32 16c-4.5 5-9 9.6-9 15 0 9.9 8.1 18 18 18s18-8.1 18-18c0-5.4-4.5-10-9-15C41 10 33 10 32 16z" fill="#fff" opacity="0.95" transform="translate(0,0)" />
            <path d="M36 22c-1.7 1.9-3.4 3.6-4.6 5.6C30.9 29.3 30 31 30 34c0 3 2 6 6 6s6-3 6-6c0-2.6-1.9-4.6-3.9-7-1-1.2-2.1-2.6-3.1-4z" fill="#2da7ff" opacity="0.9" />
          </svg>
        </div>

        <h1 className="title">Water Distribution</h1>
        <p className="subtitle">Management System</p>

        <form className="form" onSubmit={handleLogin} aria-labelledby="login-heading">
          <label htmlFor="user" className="label">Select User</label>
          <div className="select-wrap">
            <select
              id="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="select"
              aria-required="true"
            >
              {demoUsers.map((u) => (
                <option key={u.id || "placeholder"} value={u.id} disabled={u.id === ""}>
                  {u.label}
                </option>
              ))}
            </select>
            <span className="chev" aria-hidden>▾</span>
          </div>

          <button type="submit" className="btn">Login</button>

          <p className="hint">Demo mode - Select any user to access their dashboard</p>
        </form>
      </div>
    </div>
  );
}