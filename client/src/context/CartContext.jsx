import { createContext, useContext, useState } from "react";

const CartContext = createContext();

function readStoredCart() {
  try {
    const saved = JSON.parse(localStorage.getItem("cart"));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readStoredCart);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const addToCart = (product) => {
    if (!product || product.stock <= 0) {
      return { success: false, message: "This product is out of stock." };
    }

    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      if (existing.quantity >= product.stock) {
        return {
          success: false,
          message: `Only ${product.stock} item(s) available.`,
        };
      }

      saveCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1, stock: product.stock }
            : item
        )
      );
    } else {
      saveCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }

    return { success: true };
  };

  const removeFromCart = (id) => {
    saveCart(cart.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, quantity) => {
    const item = cart.find((cartItem) => cartItem._id === id);

    if (!item) return;

    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    const maxStock = Number(item.stock);

    if (maxStock > 0 && quantity > maxStock) {
      return;
    }

    saveCart(
      cart.map((cartItem) =>
        cartItem._id === id
          ? { ...cartItem, quantity }
          : cartItem
      )
    );
  };

  const clearCart = () => saveCart([]);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
