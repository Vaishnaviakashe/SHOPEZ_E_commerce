import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import api from "../api";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addProduct = () => {
    for (let i = 0; i < quantity; i += 1) {
      const result = addToCart(product);
      if (!result?.success) {
        setError(result?.message || "Unable to add product.");
        return;
      }
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  if (loading) {
    return <div className="route-loading"><p>Loading product...</p></div>;
  }

  if (error || !product) {
    return (
      <div className="empty-page">
        <h2>Product unavailable</h2>
        <p>{error || "This product could not be found."}</p>
        <Link to="/" className="primary-button">Back to shop</Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <Link to="/" className="back-link">
        <ArrowLeft size={17} /> Back to collection
      </Link>

      <div className="product-detail-grid">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
          <span>{product.category}</span>
        </div>

        <div className="product-detail-content">
          <div className="section-label">PRODUCT DETAILS</div>
          <h1>{product.name}</h1>

          <div className="detail-rating">
            <Star size={16} fill="currentColor" />
            {Number(product.rating || 0).toFixed(1)}
          </div>

          <div className="detail-price">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </div>

          <p className="detail-description">{product.description}</p>

          <div className={`stock-message ${product.stock > 0 ? "in-stock" : "out-stock"}`}>
            <span />
            {product.stock > 0 ? `${product.stock} available` : "Currently sold out"}
          </div>

          {product.stock > 0 && (
            <>
              <div className="quantity-control">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <strong>{quantity}</strong>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button className="detail-add-button" onClick={addProduct}>
                {added ? <><Check size={18} /> ADDED TO CART</> : <><ShoppingBag size={18} /> ADD TO CART</>}
              </button>

              <button className="detail-buy-button" onClick={() => {
                addProduct();
                navigate("/cart");
              }}>
                VIEW CART
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
