import "../styles/paymentSuccess.css";
import { useEffect } from "react";

export default function PaymentSuccess() {

  useEffect(() => {
    setTimeout(() => {
      window.location = "/orders";
    }, 3000);
  }, []);

  return (
    <div className="success-container fade">

      <div className="checkmark">✓</div>

      <h1>Payment Successful</h1>

      <p>
        Thank you for shopping with <strong>FurniStyle</strong> 🪑
        <br />
        Your order has been placed successfully.
      </p>

      <span className="redirect">
        Redirecting to My Orders...
      </span>

    </div>
  );
}
