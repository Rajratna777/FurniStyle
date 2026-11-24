import "../styles/home.css";
import "../styles/slider.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

/* ✅ MOVE SLIDES OUTSIDE */
const slides = [
  {
    title: "Furnish Your Dream Home",
    desc: "Premium Furniture for Modern Living",
    img: "slider1.jpg",
    link: "/category/Sofas"
  },
  {
    title: "Luxury Meets Comfort",
    desc: "Discover Elegant Bedroom Collections",
    img: "slider2.jpg",
    link: "/category/Beds"
  },
  {
    title: "Smart Workspaces",
    desc: "Office Furniture That Inspires",
    img: "slider3.jpg",
    link: "/category/Office"
  }
];

export default function Home() {
  const [cats, setCats] = useState([]);
  const [products, setProducts] = useState([]);
  const [slide, setSlide] = useState(0);

  /* AUTO SLIDER */
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide(s => (s + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []); // ✔ No warning now

  /* FETCH DATA */
  useEffect(() => {
    API.get("/categories").then(r => setCats(r.data));
    API.get("/products").then(r => setProducts(r.data.slice(0, 4)));
  }, []);

  return (
    <div className="home-page fade">

      {/* HERO SLIDER */}
      <div className="slider">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`slide ${i === slide ? "active" : ""}`}
            style={{
              backgroundImage: `url(http://localhost:3001/uploads/${s.img})`
            }}
          >
            <div className="slide-content">
              <h1>{s.title}</h1>
              <p>{s.desc}</p>

              {/* ✅ USE LINK */}
              <Link to={s.link} className="hero-btn">
                Shop Now
              </Link>

            </div>
          </div>
        ))}

        {/* DOTS */}
        <div className="dots">
          {slides.map((_, i) => (
            <span
              key={i}
              className={i === slide ? "dot active" : "dot"}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <h2 className="section-title">Shop by Category</h2>
      <div className="cat-grid">
        {cats.map(c => (
          <Link
            key={c._id}
            to={`/category/${c.name}`}
            className="cat-card hover-up"
          >
            <img
              src={`http://localhost:3001/uploads/${c.image}`}
              alt={c.name}
            />
            <p>{c.name}</p>
          </Link>
        ))}
      </div>

      {/* FEATURED PRODUCTS */}
      <h2 className="section-title">Featured Products</h2>
      <div className="featured-grid">
        {products.map(p => (
          <div key={p._id} className="featured-card hover-up">
            <img
              src={`http://localhost:3001/uploads/${p.image}`}
              alt={p.name}
            />
            <h4>{p.name}</h4>
            <p className="price">₹{p.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* INFO BAR */}
      <div className="info-bar">
        <div>🚚 Free Shipping</div>
        <div>📞 24/7 Support</div>
        <div>🔄 Easy Returns</div>
      </div>

    </div>
  );
}