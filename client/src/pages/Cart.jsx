import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, total, removeFromCart, updateQuantity, itemCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="empty-page">
        <div className="empty-icon"><ShoppingBag size={28} /></div>
        <h2>Your cart is empty</h2>
        <p>Add some products to get started.</p>
        <Link to="/" className="primary-button">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <div className="page-heading">
        <div>
          <div className="section-label">YOUR BAG</div>
          <h1>Shopping cart.</h1>
        </div>
        <span>{itemCount} ITEM{itemCount !== 1 ? "S" : ""}</span>
      </div>

      <div className="cart-layout">
        <div className="cart-items-list">
          {cart.map((item) => (
            <article className="cart-item-new" key={item._id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">
                <span>{item.category}</span>
                <h3>{item.name}</h3>
                <p>₹{Number(item.price).toLocaleString("en-IN")}</p>

                <div className="cart-item-actions">
                  <div className="quantity-control compact">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                      <Minus size={14} />
                    </button>
                    <strong>{item.quantity}</strong>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button className="text-danger" onClick={() => removeFromCart(item._id)}>
                    <Trash2 size={15} /> Remove
                  </button>
                </div>
              </div>

              <strong className="cart-line-total">
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </strong>
            </article>
          ))}
        </div>

        <aside className="cart-summary-new">
          <div className="section-label">SUMMARY</div>
          <h2>Order total</h2>

          <div className="summary-row">
            <span>Products</span>
            <span>{itemCount}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free">FREE</span>
          </div>
          <div className="summary-total-new">
            <span>Total</span>
            <strong>₹{total.toLocaleString("en-IN")}</strong>
          </div>

          <Link to="/checkout" className="primary-cta full">
            Checkout <ArrowRight size={17} />
          </Link>

          <Link to="/" className="continue-link">← Continue shopping</Link>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
