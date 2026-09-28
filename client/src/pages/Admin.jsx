import { useEffect, useState } from "react";
import {
  Check,
  Edit3,
  Package,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import api from "../api";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  image: "",
  category: "",
  stock: "",
  rating: "4.5",
};

const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

function Admin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setError("");
      const [productsRes, ordersRes] = await Promise.all([
        api.get("/products"),
        api.get("/orders"),
      ]);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load admin data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const notify = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2200);
  };

  const handleChange = (e) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const submitProduct = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        rating: Number(form.rating),
      };

      if (editingId) {
        await api.put(`/products/${editingId}`, payload);
        notify("Product updated successfully.");
      } else {
        await api.post("/products", payload);
        notify("Product added successfully.");
      }

      resetForm();
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save product.");
    } finally {
      setSaving(false);
    }
  };

  const editProduct = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price ?? "",
      image: product.image || "",
      category: product.category || "",
      stock: product.stock ?? "",
      rating: product.rating ?? "4.5",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;

    try {
      setError("");
      await api.delete(`/products/${id}`);
      notify("Product deleted.");
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete product.");
    }
  };

  const updateOrder = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      notify("Order status updated.");
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update order.");
    }
  };

  if (loading) {
    return <div className="route-loading"><p>Loading admin dashboard...</p></div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div>
          <div className="section-label">MANAGEMENT</div>
          <h1>Admin dashboard.</h1>
          <p>Manage your catalog and customer orders.</p>
        </div>
        <div className="admin-stats">
          <div><strong>{products.length}</strong><span>Products</span></div>
          <div><strong>{orders.length}</strong><span>Orders</span></div>
        </div>
      </div>

      {message && (
        <div className="form-success">
          <Check size={17} /> {message}
        </div>
      )}

      {error && <div className="form-error">{error}</div>}

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <span className="section-label">{editingId ? "EDIT PRODUCT" : "NEW PRODUCT"}</span>
            <h2>{editingId ? "Update product" : "Add a product"}</h2>
          </div>

          {editingId && (
            <button className="ghost-button" onClick={resetForm}>
              <X size={16} /> Cancel edit
            </button>
          )}
        </div>

        <form className="admin-product-form" onSubmit={submitProduct}>
          <input name="name" placeholder="Product name" value={form.name} onChange={handleChange} required />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
          <input name="price" type="number" min="0" placeholder="Price" value={form.price} onChange={handleChange} required />
          <input name="stock" type="number" min="0" placeholder="Stock" value={form.stock} onChange={handleChange} required />
          <input name="rating" type="number" min="0" max="5" step="0.1" placeholder="Rating" value={form.rating} onChange={handleChange} required />
          <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
          <textarea name="description" placeholder="Product description" value={form.description} onChange={handleChange} required />

          <button className="primary-cta admin-submit" disabled={saving}>
            {editingId ? <><Save size={17} /> {saving ? "SAVING..." : "SAVE CHANGES"}</> : <><Plus size={17} /> {saving ? "ADDING..." : "ADD PRODUCT"}</>}
          </button>
        </form>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <span className="section-label">CATALOG</span>
            <h2>Products</h2>
          </div>
          <span className="admin-count">{products.length} items</span>
        </div>

        <div className="admin-product-table">
          {products.map((product) => (
            <div className="admin-product-row" key={product._id}>
              <img src={product.image} alt="" />
              <div className="admin-product-info">
                <strong>{product.name}</strong>
                <span>{product.category} · ₹{Number(product.price).toLocaleString("en-IN")}</span>
              </div>
              <span className={`stock-pill ${product.stock === 0 ? "empty" : ""}`}>
                {product.stock} in stock
              </span>
              <div className="admin-row-actions">
                <button className="icon-action" title="Edit" onClick={() => editProduct(product)}>
                  <Edit3 size={16} />
                </button>
                <button className="icon-action danger" title="Delete" onClick={() => deleteProduct(product._id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <span className="section-label">FULFILLMENT</span>
            <h2>Orders</h2>
          </div>
          <Package size={24} />
        </div>

        {orders.length === 0 ? (
          <div className="admin-empty">No orders yet.</div>
        ) : (
          <div className="admin-orders">
            {orders.map((order) => (
              <div className="admin-order-row" key={order._id}>
                <div>
                  <strong>#{order._id.slice(-8).toUpperCase()}</strong>
                  <span>{order.user?.name || "Customer"} · {order.user?.email || ""}</span>
                </div>

                <strong>₹{Number(order.totalPrice).toLocaleString("en-IN")}</strong>

                <select
                  value={order.status}
                  onChange={(e) => updateOrder(order._id, e.target.value)}
                >
                  {statuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Admin;
