import React, { createContext, useContext, useState, useEffect } from 'react';

const SellerContext = createContext();

export function SellerProvider({ children }) {
  const [seller, setSeller] = useState(null);
  const [isSellerMode, setIsSellerMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sellerData = localStorage.getItem('seller');
    const sellerMode = localStorage.getItem('sellerMode');
    
    if (sellerData) {
      setSeller(JSON.parse(sellerData));
    }
    
    // Only set seller mode if explicitly stored as true
    if (sellerMode === 'true' && sellerData) {
      setIsSellerMode(true);
    }
    
    setLoading(false);
  }, []);

  const loginSeller = (sellerData) => {
    setSeller(sellerData);
    setIsSellerMode(true);
    localStorage.setItem('seller', JSON.stringify(sellerData));
    localStorage.setItem('sellerMode', 'true');
  };

  const logoutSeller = () => {
    setSeller(null);
    setIsSellerMode(false);
    localStorage.removeItem('seller');
    localStorage.removeItem('sellerMode');
  };

  const switchToUserMode = () => {
    setIsSellerMode(false);
    localStorage.setItem('sellerMode', 'false');
  };

  const switchToSellerMode = () => {
    if (seller) {
      setIsSellerMode(true);
      localStorage.setItem('sellerMode', 'true');
    }
  };

  return (
    <SellerContext.Provider value={{
      seller,
      isSellerMode,
      loading,
      loginSeller,
      logoutSeller,
      switchToUserMode,
      switchToSellerMode
    }}>
      {children}
    </SellerContext.Provider>
  );
}

export function useSeller() {
  const context = useContext(SellerContext);
  if (!context) {
    throw new Error('useSeller must be used within a SellerProvider');
  }
  return context;
}