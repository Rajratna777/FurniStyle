import "../styles/cart.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, remove } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0)
    return <h3 className="cart-empty">Your cart is empty</h3>;

  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);

  return (
    <div className="cart-container">

      {cart.map(i => (
        <div className="cart-item" key={i._id}>
          <div>
            <h4>{i.name}</h4>
            <p>₹{i.price} × {i.qty}</p>
          </div>

          <button onClick={() => remove(i._id)}>
            Remove
          </button>
        </div>
      ))}

      <div className="cart-total">
        <h3>Total: ₹{total}</h3>
        <button onClick={() => navigate("/payment")}>
          Proceed to Checkout
        </button>
      </div>

    </div>
  );
}
