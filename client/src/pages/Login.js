import "../styles/auth.css";

import API from "../api";
import { useState } from "react";

export default function Login() {
  const [f, set] = useState({});

  const login = () => {
    API.post("/auth/login", f).then(r => {
      localStorage.setItem("user", JSON.stringify(r.data));
      window.location = "/";
    });
  };

  return (
    <div className="auth-box fade">

      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={e => set({ ...f, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => set({ ...f, password: e.target.value })}
      />

      <button onClick={login}>
        Login
      </button>

    </div>
  );
}
