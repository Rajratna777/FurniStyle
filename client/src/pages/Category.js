import "../styles/category.css";
import "../styles/product.css";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";

export default function Category() {
  const { c } = useParams();
  const [p, set] = useState([]);

  useEffect(() => {
    API.get("/products").then(r =>
      set(r.data.filter(x => x.category === c))
    );
  }, [c]);

  return (
    <div className="fade">

      {/* Category Banner */}
      <div className="category-banner">
        {c}
      </div>

      {/* Products Grid */}
      <div className="product-grid">
        {p.map(x => (
          <ProductCard key={x._id} product={x} />
        ))}
      </div>

    </div>
  );
}
