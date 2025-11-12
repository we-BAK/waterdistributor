import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function LoginCard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Mock users for demo (replace later with API)
  const users = [
    { email: "owner@waterdist.com", password: "1234", role: "owner" },
    { email: "storekeeper@waterdist.com", password: "1234", role: "storekeeper" },
    { email: "salesman@waterdist.com", password: "1234", role: "salesman" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    // Redirect based on role
    switch (user.role) {
      case "owner":
        navigate("/owner");
        break;
      case "storekeeper":
        navigate("/stockkeeper");
        break;
      case "salesman":
        navigate("/salesman");
        break;
      default:
        setError("Unknown role");
    }
  };

  return (
    <div className="page-bg">
      <div className="card">
        <div className="logo-wrap" aria-hidden>
          <svg
            className="logo"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Water logo"
          >
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0" stopColor="#25a9ff" />
                <stop offset="1" stopColor="#2db4ff" />
              </linearGradient>
            </defs>
            <rect width="64" height="64" rx="12" fill="url(#g)" />
            <path
              d="M32 16c-4.5 5-9 9.6-9 15 0 9.9 8.1 18 18 18s18-8.1 18-18c0-5.4-4.5-10-9-15C41 10 33 10 32 16z"
              fill="#fff"
              opacity="0.95"
            />
            <path
              d="M36 22c-1.7 1.9-3.4 3.6-4.6 5.6C30.9 29.3 30 31 30 34c0 3 2 6 6 6s6-3 6-6c0-2.6-1.9-4.6-3.9-7-1-1.2-2.1-2.6-3.1-4z"
              fill="#2da7ff"
              opacity="0.9"
            />
          </svg>
        </div>

        <h1 className="title">Water Distribution</h1>
        <p className="subtitle">Management System</p>

        <form className="form" onSubmit={handleLogin}>
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn">
            Login
          </button>

          <p className="hint">Use demo credentials (owner@ / storekeeper@ / salesman@)</p>
        </form>
      </div>
    </div>
  );
}
