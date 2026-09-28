import { Link } from "react-router-dom";
import { ShoppingBag, ArrowUpRight, Star } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [message, setMessage] = useState("");

  const handleAdd = () => {
    const result = addToCart(product);
    setMessage(result?.message || "Added to cart");
    window.setTimeout(() => setMessage(""), 1600);
  };

  return (
    <article className="product-card-new">
      <Link to={`/products/${product._id}`} className="product-image product-image-link">
        <img src={product.image} alt={product.name} />
        <span className="product-category">{product.category}</span>
      </Link>

      <button
        className="quick-add"
        onClick={handleAdd}
        disabled={product.stock === 0}
      >
        <ShoppingBag size={17} />
        {product.stock > 0 ? "ADD TO CART" : "SOLD OUT"}
      </button>

      {message && <span className="cart-feedback">{message}</span>}

      <Link to={`/products/${product._id}`} className="product-meta">
        <div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
        <ArrowUpRight size={19} />
      </Link>

      <div className="product-price-row">
        <strong>
          ₹{Number(product.price).toLocaleString("en-IN")}
        </strong>
        <span>
          <Star size={14} fill="currentColor" />
          {Number(product.rating || 0).toFixed(1)}
        </span>
      </div>
    </article>
  );
}

export default ProductCard;
