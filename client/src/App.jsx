import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Navbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                  />
                }
              />

              <Route path="/products/:id" element={<ProductDetails />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly>
                    <Admin />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          <footer>
            <div className="footer-inner">
              <div>
                <h3>SHOPEZ</h3>
                <p>Curated products. Simple shopping.</p>
              </div>
              <p>© 2026 SHOPEZ</p>
            </div>
          </footer>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
