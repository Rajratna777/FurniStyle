import "../styles/auth.css";
import API from "../api";
import { useState } from "react";

export default function OTP() {
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState(""); // "", "success", "error"

  const email = localStorage.getItem("email");

  const verify = () => {
    setStatus("");

    API.post("/auth/verify", { email, otp })
      .then(() => {
        setStatus("success");
        localStorage.removeItem("email");

        setTimeout(() => {
          window.location = "/login";
        }, 2000);
      })
      .catch(() => setStatus("error"));
  };

  return (
    <div className="auth-box fade">

      <h2>Verify OTP</h2>

      <input
        type="text"
        maxLength={6}
        inputMode="numeric"
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
      />

      <button onClick={verify}>Verify</button>

      {/* SUCCESS ANIMATION */}
      {status === "success" && (
        <div className="otp-success">
          <div className="checkmark">✓</div>
          <p>Registration Successful</p>
        </div>
      )}

      {/* ERROR MESSAGE */}
      {status === "error" && (
        <p className="otp-error">Invalid or expired OTP</p>
      )}

    </div>
  );
}
