import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar({
  searchTerm,
  setSearchTerm,
}) {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  // const [search, setSearch] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e) => {
  e.preventDefault();

  navigate("/");

  setTimeout(() => {
    document
      .getElementById("products")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }, 100);
};

  return (
    <header className="navbar">

      {/* LOGO */}

      <Link to="/" className="brand">
        SHOPEZ<span>.</span>
      </Link>


      {/* DESKTOP NAVIGATION */}

      <nav className="desktop-nav">

        <Link to="/">Shop</Link>

        <a href="/#categories">
          Categories
        </a>

        {user && (
          <Link to="/orders">
            Orders
          </Link>
        )}

        {user?.role === "admin" && (
          <Link to="/admin">
            Admin
          </Link>
        )}

      </nav>


      {/* SEARCH */}

      <form
        className="search-box"
        onSubmit={handleSearch}
      >
        <Search size={18} />

        <input
  type="text"
  placeholder="Search products..."
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm(e.target.value)
  }
/>
      </form>


      {/* ACTIONS */}

      <div className="nav-actions">

        {user ? (
          <button
            className="icon-button"
            title="Logout"
            onClick={handleLogout}
          >
            <User size={19} />
          </button>
        ) : (
          <Link
            to="/login"
            className="icon-button"
          >
            <User size={19} />
          </Link>
        )}

        <Link
          to="/cart"
          className="cart-button"
        >
          <ShoppingBag size={19} />

          <span>
            {cart.reduce(
              (total, item) =>
                total + item.quantity,
              0
            )}
          </span>
        </Link>

        <button
          className="mobile-menu-button"
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
        >
          {mobileOpen ? (
            <X />
          ) : (
            <Menu />
          )}
        </button>

      </div>


      {/* MOBILE MENU */}

      {mobileOpen && (
        <div className="mobile-menu">

          <Link
            to="/"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            Shop
          </Link>

          <a
            href="/#categories"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            Categories
          </a>

          {user && (
            <Link
              to="/orders"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              Orders
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              to="/admin"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              Admin
            </Link>
          )}

        </div>
      )}

    </header>
  );
}

export default Navbar;