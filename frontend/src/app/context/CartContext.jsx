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
    
    // Refresh cart every 30 seconds to sync with database
    const interval = setInterval(() => {
      if (user) {
        loadCart();
      }
    }, 30000);
    
    // Refresh cart when user returns to tab
    const handleVisibilityChange = () => {
      if (!document.hidden && user) {
        loadCart();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user]);

  const loadCart = async () => {
    try {
      const data = await cartAPI.getCart();
      setCart(data.items || []);
    } catch (error) {
      console.error('Failed to load cart:', error);
      // If cart fails to load, clear it
      setCart([]);
    }
  };

  const addToCart = async (product) => {
    const productId = product._id || product.id;
    
    if (!user) {
      setCart(prevCart => {
        const existingItem = prevCart.find(item => {
          const itemId = item.product?._id || item.product?.id || item._id || item.id;
          return itemId === productId;
        });
        if (existingItem) {
          return prevCart.map(item => {
            const itemId = item.product?._id || item.product?.id || item._id || item.id;
            return itemId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item;
          });
        }
        return [...prevCart, { product, quantity: 1 }];
      });
      return;
    }

    try {
      await cartAPI.addToCart(productId);
      await loadCart();
    } catch (error) {
      console.error('Failed to add to cart:', error);
      if (error.message.includes('404') || error.message.includes('not found')) {
        throw new Error('Product not available');
      }
      if (error.message.includes('out of stock') || error.message.includes('available')) {
        throw new Error(error.message);
      }
      throw error;
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) {
      setCart(prevCart => prevCart.filter(item => {
        const itemId = item.product?._id || item.product?.id || item._id || item.id;
        return itemId !== productId;
      }));
      return;
    }

    try {
      await cartAPI.removeFromCart(productId);
      await loadCart();
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user) {
      setCart(prevCart =>
        prevCart.map(item => {
          const itemId = item.product?._id || item.product?.id || item._id || item.id;
          return itemId === productId ? { ...item, quantity } : item;
        })
      );
      return;
    }

    try {
      await cartAPI.updateCartItem(productId, quantity);
      await loadCart();
    } catch (error) {
      console.error('Failed to update quantity:', error);
      if (error.message.includes('404') || error.message.includes('not found')) {
        // Product was deleted, remove from cart
        setCart(prevCart => prevCart.filter(item => {
          const itemId = item.product?._id || item.product?.id || item._id || item.id;
          return itemId !== productId;
        }));
        throw new Error('Product no longer available and removed from cart');
      }
      if (error.message.includes('available')) {
        throw new Error(error.message);
      }
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
      const price = item.product?.price || item.price || 0;
      const quantity = item.quantity || 0;
      return total + (price * quantity);
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
        loadCart, // Expose loadCart for manual refresh
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