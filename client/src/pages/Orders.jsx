import { useEffect, useState } from "react";
import { Package, ChevronDown, ChevronUp } from "lucide-react";
import api from "../api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openOrder, setOpenOrder] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await api.get("/orders/my");
        setOrders(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load your orders.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return <div className="route-loading"><p>Loading your orders...</p></div>;
  }

  return (
    <div className="shop-page orders-page">
      <div className="page-heading">
        <div>
          <div className="section-label">ACCOUNT</div>
          <h1>My orders.</h1>
        </div>
        <Package size={28} />
      </div>

      {error && <div className="form-error">{error}</div>}

      {!error && orders.length === 0 ? (
        <div className="empty-page compact-empty">
          <Package size={30} />
          <h2>No orders yet.</h2>
          <p>Your completed purchases will appear here.</p>
        </div>
      ) : (
        <div className="orders-list-new">
          {orders.map((order) => {
            const isOpen = openOrder === order._id;

            return (
              <article className="order-card-new" key={order._id}>
                <button
                  className="order-card-header"
                  onClick={() => setOpenOrder(isOpen ? null : order._id)}
                >
                  <div>
                    <span>ORDER #{order._id.slice(-8).toUpperCase()}</span>
                    <strong>
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </strong>
                  </div>

                  <div className="order-header-right">
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="order-expanded">
                    {order.items.map((item, index) => (
                      <div className="order-line" key={item._id || `${item.product}-${index}`}>
                        <div>
                          <strong>{item.name}</strong>
                          <span>Qty {item.quantity}</span>
                        </div>
                        <strong>₹{(item.price * item.quantity).toLocaleString("en-IN")}</strong>
                      </div>
                    ))}

                    <div className="order-total-line">
                      <span>Total</span>
                      <strong>₹{Number(order.totalPrice).toLocaleString("en-IN")}</strong>
                    </div>

                    {order.shippingAddress && (
                      <div className="order-address">
                        <span>DELIVERY ADDRESS</span>
                        <p>
                          {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                          {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Orders;
