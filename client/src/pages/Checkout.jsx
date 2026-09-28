import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../api";

function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "India",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const items = cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      await api.post("/orders", {
        items,

        shippingAddress: {
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
          country: form.country,
        },
      });

      // Clear local cart after successful order
      clearCart();

      // Go to orders page
      navigate("/orders");

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to place order. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="checkout-empty">

        <div className="empty-icon">
          🛒
        </div>

        <h1>Your cart is empty</h1>

        <p>
          Add some products before checking out.
        </p>

        <Link
          to="/"
          className="primary-cta"
        >
          Continue Shopping
        </Link>

      </div>
    );
  }

  return (
    <div className="checkout-page">

      {/* Back button */}

      <Link
        to="/cart"
        className="back-link"
      >
        <ArrowLeft size={17} />
        Back to cart
      </Link>


      <div className="checkout-header">

        <div>
          <div className="section-label">
            CHECKOUT
          </div>

          <h1>
            Complete your order.
          </h1>
        </div>

        <div className="secure-label">
          <CheckCircle size={17} />
          Secure checkout
        </div>

      </div>


      <div className="checkout-layout">

        {/* =========================
            SHIPPING FORM
        ========================== */}

        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >

          <div className="checkout-card">

            <div className="checkout-card-title">

              <span>01</span>

              <div>
                <h2>
                  Shipping details
                </h2>

                <p>
                  Where should we deliver
                  your order?
                </p>
              </div>

            </div>


            {error && (
              <div className="checkout-error">
                {error}
              </div>
            )}


            <label>
              Address

              <input
                name="address"
                type="text"
                placeholder="House number, street, area"
                value={form.address}
                onChange={handleChange}
                required
              />
            </label>


            <div className="form-row">

              <label>
                City

                <input
                  name="city"
                  type="text"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </label>


              <label>
                Postal Code

                <input
                  name="postalCode"
                  type="text"
                  placeholder="411001"
                  value={form.postalCode}
                  onChange={handleChange}
                  required
                />
              </label>

            </div>


            <label>
              Country

              <input
                name="country"
                type="text"
                value={form.country}
                onChange={handleChange}
                required
              />
            </label>

          </div>


          <button
            type="submit"
            className="checkout-button"
            disabled={loading}
          >

            {loading
              ? "PLACING ORDER..."
              : `PLACE ORDER · ₹${total.toLocaleString(
                  "en-IN"
                )}`}

          </button>

        </form>


        {/* =========================
            ORDER SUMMARY
        ========================== */}

        <aside className="checkout-summary">

          <div className="section-label">
            YOUR ORDER
          </div>

          <h2>
            Order summary
          </h2>


          <div className="checkout-items">

            {cart.map((item) => (

              <div
                className="checkout-item"
                key={item._id}
              >

                <div className="checkout-item-image">

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <span>
                    {item.quantity}
                  </span>

                </div>


                <div className="checkout-item-info">

                  <strong>
                    {item.name}
                  </strong>

                  <small>
                    ₹{item.price.toLocaleString(
                      "en-IN"
                    )}
                  </small>

                </div>


                <strong>
                  ₹{(
                    item.price *
                    item.quantity
                  ).toLocaleString("en-IN")}
                </strong>

              </div>

            ))}

          </div>


          <div className="checkout-total">

            <div>
              <span>Subtotal</span>

              <span>
                ₹{total.toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>

            <div>
              <span>Shipping</span>

              <span className="free">
                FREE
              </span>
            </div>

            <div className="grand-total">

              <strong>
                Total
              </strong>

              <strong>
                ₹{total.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

          </div>

        </aside>

      </div>

    </div>
  );
}

export default Checkout;