import "../styles/adminLogin.css";
import { useState } from "react";
import API from "../api";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const login = () => {
    API.post("/auth/admin-login", form)
      .then(() => {
        localStorage.setItem("admin", "true");
        window.location = "/admin";
      })
      .catch(() => setError("Invalid admin credentials"));
  };

  return (
    <div className="admin-login-page fade">
      <div className="admin-login-box hover-up">
        <h2>Admin Login</h2>
        <p className="subtitle">FurniStyle Control Panel</p>

        {error && <div className="error">{error}</div>}

        <input
          type="email"
          placeholder="Admin Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}
