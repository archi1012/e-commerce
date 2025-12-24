import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadCart();
    }
  }, [user]);

  const loadCart = async () => {
    try {
      const data = await cartAPI.getCart();
      setCart(data.items || []);
    } catch (error) {
      const logger = (await import('../utils/logger')).default;
      logger.error('Failed to load cart:', error);
    }
  };

  const addToCart = async (product) => {
    if (!user) {
      // Add to local state if not logged in
      setCart(prevCart => {
        const existingItem = prevCart.find(item => (item.product?.id || item.id) === product.id);
        if (existingItem) {
          return prevCart.map(item =>
            (item.product?.id || item.id) === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevCart, { ...product, quantity: 1 }];
      });
      return;
    }

    try {
      const data = await cartAPI.addToCart(product.id || product._id);
      setCart(data.items || []);
    } catch (error) {
      const logger = (await import('../utils/logger')).default;
      logger.error('Failed to add to cart:', error);
      // Fallback to local cart on error
      setCart(prevCart => {
        const existingItem = prevCart.find(item => (item.product?.id || item.id) === product.id);
        if (existingItem) {
          return prevCart.map(item =>
            (item.product?.id || item.id) === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevCart, { ...product, quantity: 1 }];
      });
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) {
      setCart(prevCart => prevCart.filter(item => (item.product?.id || item.id) !== productId));
      return;
    }

    try {
      const data = await cartAPI.removeFromCart(productId);
      setCart(data.items || []);
    } catch (error) {
      const logger = (await import('../utils/logger')).default;
      logger.error('Failed to remove from cart:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user) {
      setCart(prevCart =>
        prevCart.map(item =>
          (item.product?.id || item.id) === productId ? { ...item, quantity } : item
        )
      );
      return;
    }

    try {
      const data = await cartAPI.updateCartItem(productId, quantity);
      setCart(data.items || []);
    } catch (error) {
      const logger = (await import('../utils/logger')).default;
      logger.error('Failed to update quantity:', error);
    }
  };

  const addToWishlist = (product) => {
    setWishlist(prev => {
      if (!prev.find(item => item.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = item.product?.price || item.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        addToWishlist,
        removeFromWishlist,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}