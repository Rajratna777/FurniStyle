import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-col">
          <h3>FurniStyle</h3>
          <p>Premium Furniture for Modern Homes.</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/cart">Cart</a>
          <a href="/orders">My Orders</a>
          <a href="/login">Login</a>
        </div>

        <div className="footer-col">
          <h4>Categories</h4>
          <a href="/category/sofa">Sofa</a>
          <a href="/category/bed">Bed</a>
          <a href="/category/chair">Chair</a>
          <a href="/category/table">Table</a>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>Email: support@furnistyle.com</p>
          <p>Phone: +91 9876543210</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} FurniStyle. All rights reserved.
      </div>
    </footer>
  );
}
