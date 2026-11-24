import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

  // ✅ Load cart from localStorage on first render
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // ✅ Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const add = (p) => {
    setCart(prev => {
      const found = prev.find(i => i._id === p._id);

      if (found) {
        return prev.map(i =>
          i._id === p._id
            ? { ...i, qty: i.qty + p.qty }
            : i
        );
      }

      return [...prev, p];
    });
  };

  const remove = (id) => {
    setCart(prev => prev.filter(i => i._id !== id));
  };

  const clear = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ cart, add, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
};
