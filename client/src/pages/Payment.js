import "../styles/payment.css";
import { useCart } from "../context/CartContext";
import API from "../api";
import { useState } from "react";

export default function Payment() {
  const { cart, clear } = useCart();
  const user = JSON.parse(localStorage.getItem("user"));

  const [method, setMethod] = useState("COD");
  const [upi, setUpi] = useState("");
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });

  if (!user) return <h3>Please login to continue</h3>;

  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);

  const place = () => {
    API.post("/orders/place", {
      userId: user._id,
      userEmail: user.email,
      userName: user.name,
      items: cart,
      total
    }).then(() => {
      clear();
      window.location = "/success";
    });
  };

  return (
    <div className="payment-page fade">

      {/* LEFT */}
      <div className="payment-left">
        <h2>Order Summary</h2>

        {cart.map(i => (
          <div className="summary-item" key={i._id}>
            <img
              src={`http://localhost:3001/uploads/${i.image}`}
              alt={i.name}
            />
            <div>
              <h4>{i.name}</h4>
              <p>Qty: {i.qty}</p>
              <p>₹{i.price * i.qty}</p>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="payment-right">
        <h2>Payment Details</h2>

        <div className="payment-method">
          <label>
            <input
              type="radio"
              name="pay"
              checked={method === "COD"}
              onChange={() => setMethod("COD")}
            />
            Cash on Delivery
          </label>

          <label>
            <input
              type="radio"
              name="pay"
              checked={method === "UPI"}
              onChange={() => setMethod("UPI")}
            />
            UPI
          </label>

          <label>
            <input
              type="radio"
              name="pay"
              checked={method === "CARD"}
              onChange={() => setMethod("CARD")}
            />
            Card
          </label>
        </div>

        {/* UPI FORM */}
        {method === "UPI" && (
          <div className="pay-form">
            <input
              placeholder="Enter UPI ID (example@bank)"
              value={upi}
              onChange={e => setUpi(e.target.value)}
            />
          </div>
        )}

        {/* CARD FORM */}
        {method === "CARD" && (
          <div className="pay-form">
            <input
              placeholder="Card Number"
              maxLength="16"
              value={card.number}
              onChange={e =>
                setCard({ ...card, number: e.target.value.replace(/\D/g, "") })
              }
            />
            <input
              placeholder="Card Holder Name"
              value={card.name}
              onChange={e => setCard({ ...card, name: e.target.value })}
            />
            <div className="card-row">
              <input
                placeholder="MM/YY"
                value={card.expiry}
                onChange={e => setCard({ ...card, expiry: e.target.value })}
              />
              <input
                placeholder="CVV"
                maxLength="3"
                value={card.cvv}
                onChange={e =>
                  setCard({ ...card, cvv: e.target.value.replace(/\D/g, "") })
                }
              />
            </div>
          </div>
        )}

        <div className="total-box">
          <h3>Total Amount</h3>
          <h1>₹{total}</h1>
        </div>

        <button className="pay-btn" onClick={place}>
          Pay & Place Order
        </button>

      </div>
    </div>
  );
}
