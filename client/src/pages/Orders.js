import "../styles/orders.css";
import { useEffect, useState } from "react";
import API from "../api";
import OrderTrack from "../components/OrderTrack";

export default function Orders() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user || !user._id) return;

    API.get(`/orders/user/${user._id}`)
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  }, [user]);

  return (
    <div className="orders-page fade">
      <h2>My Orders</h2>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map(order => (
        <div key={order._id} className="order-card hover-up">

          <div className="order-header">
            <span>Order ID: #{order._id.slice(-6)}</span>
            <span>Total: ₹{order.total}</span>
          </div>

          {/* PRODUCTS */}
          <div className="order-items">
            {order.items.map(item => (
              <div key={item._id} className="order-item">
                <img
                  src={`http://localhost:3001/uploads/${item.image}`}
                  alt={item.name}
                />

                <div className="order-item-info">
                  <h4>{item.name}</h4>
                  <p>Qty: {item.qty}</p>
                  <p>₹{item.price * item.qty}</p>
                </div>
              </div>
            ))}
          </div>

          {/* STATUS */}
          <OrderTrack status={order.status} />
        </div>
      ))}
    </div>
  );
}
