import "../styles/admin.css";
import { useEffect, useState } from "react";
import API from "../api";

export default function Admin() {

  // 🔐 Admin protection
  if (localStorage.getItem("admin") !== "true") {
    window.location = "/admin-login";
  }

  const [view, setView] = useState("products"); // products | orders
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/products").then(r => setProducts(r.data));
    API.get("/orders").then(r => setOrders(r.data));
  }, []);

  const updateStatus = (id, status) => {
    API.put(`/orders/status/${id}`, { status }).then(() => {
      setOrders(prev =>
        prev.map(o =>
          o._id === id ? { ...o, status } : o
        )
      );
    });
  };

  return (
    <div className="admin-layout fade">

      {/* ========== SIDEBAR ========== */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">FurniStyle</h2>

        <div
          className={view === "products" ? "side-link active" : "side-link"}
          onClick={() => setView("products")}
        >
          📦 Products
        </div>

        <div
          className={view === "orders" ? "side-link active" : "side-link"}
          onClick={() => setView("orders")}
        >
          🧾 Orders
        </div>

        <div
          className="side-link logout"
          onClick={() => {
            localStorage.removeItem("admin");
            window.location = "/admin-login";
          }}
        >
          🚪 Logout
        </div>
      </aside>

      {/* ========== CONTENT ========== */}
      <main className="admin-content">

        {/* PRODUCTS */}
        {view === "products" && (
          <>
            <h2>Products</h2>

            {products.map(p => (
              <div className="admin-card hover-up fade" key={p._id}>
                <strong>{p.name}</strong>
                <span>₹{p.price}</span>
              </div>
            ))}
          </>
        )}

        {/* ORDERS */}
        {view === "orders" && (
          <>
            <h2>Customer Orders</h2>

            {orders.length === 0 && <p>No orders yet</p>}

            {orders.map(o => (
              <div className="admin-order-card hover-up fade" key={o._id}>
                <p><b>Order ID:</b> {o._id}</p>
                <p><b>Total:</b> ₹{o.total}</p>

                <p>
                  <b>Status:</b>{" "}
                  <select
                    value={o.status}
                    onChange={e =>
                      updateStatus(o._id, e.target.value)
                    }
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </p>

                <div className="admin-order-items">
                  {o.items.map(i => (
                    <div key={i._id} className="admin-order-item">
                      <img
                        src={`http://localhost:3001/uploads/${i.image}`}
                        alt={i.name}
                      />
                      <div>
                        <p><b>{i.name}</b></p>
                        <p>Qty: {i.qty}</p>
                        <p>₹{i.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

      </main>
    </div>
  );
}
