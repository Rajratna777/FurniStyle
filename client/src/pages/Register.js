import "../styles/auth.css";
import API from "../api";
import { useState } from "react";

export default function Register() {

  const [f, set] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: ""
  });

  const submit = () => {
    API.post("/auth/register", f).then(() => {
      localStorage.setItem("email", f.email);
      window.location = "/otp";
    });
  };

  return (
    <div className="auth-box fade">

      <h2>Create Account</h2>

      <input
        placeholder="Name"
        onChange={e => set({ ...f, name: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={e => set({ ...f, email: e.target.value })}
      />

      <input
        placeholder="Phone"
        onChange={e => set({ ...f, phone: e.target.value })}
      />

      {/* ⭐ NEW ADDRESS FIELD */}
      <textarea
        placeholder="Address"
        onChange={e => set({ ...f, address: e.target.value })}
        rows="3"
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => set({ ...f, password: e.target.value })}
      />

      <button onClick={submit}>
        Register
      </button>

    </div>
  );
}