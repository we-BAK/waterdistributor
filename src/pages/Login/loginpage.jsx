// Loginpage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function LoginCard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Validate password
    if (password !== "1234") {
      setError("Invalid username or password");
      return;
    }

    // Extract role from username (format: role@example.com)
    const emailPattern = /^(.+)@example\.com$/;
    const match = username.trim().toLowerCase().match(emailPattern);

    if (!match) {
      setError("Invalid username format. Use: {role}@example.com");
      return;
    }

    const role = match[1];

    // Redirect based on role
    switch (role) {
      case "owner":
        navigate("/owner");
        break;
      case "stockkeeper":
        navigate("/stockkeeper");
        break;
      case "sales":
        navigate("/sales");
        break;
      default:
        setError("Invalid role. Valid roles: owner, stockkeeper, sales");
    }
  };

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
          <label htmlFor="username" className="label">Username</label>
          <input
            id="username"
            type="text"
            className="input"
            placeholder="role@example.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />

          <label htmlFor="password" className="label">Password</label>
          <input
            id="password"
            type="password"
            className="input"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn">Login</button>

          <p className="hint">Username format: role@example.com | Password: 1234</p>
        </form>
      </div>
    </div>
  );
}