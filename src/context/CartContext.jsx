import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ product, size, qty }]
  const [isOpen, setIsOpen] = useState(false);

  const openCart  = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen(v => !v);

  // Adiciona ou incrementa item
  const addItem = useCallback((product, size) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.product.id === product.id && i.size === size);
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { product, size, qty: 1 }];
    });
    setIsOpen(true); // abre o drawer ao adicionar
  }, []);

  // Remove item completamente
  const removeItem = useCallback((productId, size) => {
    setItems(prev => prev.filter(i => !(i.product.id === productId && i.size === size)));
  }, []);

  // Altera quantidade (remove se chegar a 0)
  const updateQty = useCallback((productId, size, delta) => {
    setItems(prev => {
      const next = prev.map(i => {
        if (i.product.id === productId && i.size === size) {
          return { ...i, qty: i.qty + delta };
        }
        return i;
      }).filter(i => i.qty > 0);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.priceNum * i.qty, 0);

  return (
    <CartContext.Provider value={{
      items, isOpen,
      openCart, closeCart, toggleCart,
      addItem, removeItem, updateQty, clearCart,
      totalItems, totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
