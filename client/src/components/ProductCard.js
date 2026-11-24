import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/product.css";

export default function ProductCard({ product }) {
  const { add } = useCart();
  const navigate = useNavigate();
  const [q, setQ] = useState(1);

  return (
    <div className="product-card">

      <img
        src={`http://localhost:3001/uploads/${product.image}`}
        alt={product.name}
      />

      <h3>{product.name}</h3>
      <p className="price">₹{product.price}</p>

      <input
        type="number"
        min="1"
        value={q}
        onChange={e => setQ(+e.target.value)}
      />

      <div className="product-btns">

        <button onClick={() => add({ ...product, qty: q })}>
          Add to Cart
        </button>

        <button
          className="buy-btn"
          onClick={() => {
            if (!localStorage.getItem("user")) {
              navigate("/login");
              return;
            }
            add({ ...product, qty: q });
            navigate("/payment");
          }}
        >
          Buy Now
        </button>

      </div>
    </div>
  );
}
