import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = localStorage.getItem("admin") === "true";
  const [open, setOpen] = useState(false);

  const count = cart.reduce((a, b) => a + b.qty, 0);

  return (
    <nav className="nav">
      {/* LOGO */}
      <div className="nav-logo" onClick={() => navigate("/")}>
        Furni<span>Style</span>
      </div>

      {/* MENU */}
      <div className="nav-menu">
        <span onClick={() => navigate("/")}>Home</span>
        <span onClick={() => navigate("/category/Sofas")}>Shop</span>
        <span onClick={() => navigate("/contact")}>Contact</span>
      </div>

      {/* ACTIONS */}
      <div className="nav-actions">
        {/* CART */}
        <div className="nav-cart" onClick={() => navigate("/cart")}>
          🛒
          {count > 0 && <span className="cart-badge">{count}</span>}
        </div>

        {/* AUTH */}
        {!user && !isAdmin ? (
          <>
            <span className="nav-link" onClick={() => navigate("/login")}>
              Login
            </span>

            <span
              className="nav-link register"
              onClick={() => navigate("/register")}
            >
              Register
            </span>

            {/* ADMIN LOGIN */}
            <span
              className="nav-link admin"
              onClick={() => navigate("/admin-login")}
            >
              Admin
            </span>
          </>
        ) : (
          <div className="nav-profile">
            <span onClick={() => setOpen(!open)}>
              {isAdmin ? "Admin" : user.name} ▾
            </span>

            {open && (
              <div className="profile-menu fade">
                {!isAdmin && (
                  <span onClick={() => navigate("/orders")}>
                    My Orders
                  </span>
                )}

                {isAdmin && (
                  <span onClick={() => navigate("/admin")}>
                    Admin Dashboard
                  </span>
                )}

                {/* LOGOUT */}
                <span
                  onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("admin");
                    setOpen(false);
                    navigate("/");
                  }}
                >
                  Logout
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
