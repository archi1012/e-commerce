const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthToken = () => localStorage.getItem('token');

const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();
  
  console.log('API Request:', url); // Debug log
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Expected JSON, got: ${text}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Request Error:', {
      url,
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
};

export const authAPI = {
  register: (userData) => apiRequest('/auth/register', { method: 'POST', body: userData }),
  login: (credentials) => apiRequest('/auth/login', { method: 'POST', body: credentials }),
  getProfile: () => apiRequest('/auth/profile'),
};

export const productsAPI = {
  getProducts: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/products${queryString ? `?${queryString}` : ''}`);
  },
  getProduct: (id) => {
    if (!id || id === 'undefined') {
      throw new Error('Product ID is required');
    }
    return apiRequest(`/products/${id}`);
  },
  getRecommendations: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/products/recommendations${queryString ? `?${queryString}` : ''}`);
  },
  getCategories: () => apiRequest('/products/categories'),
  addProduct: (productData) => apiRequest('/products', { method: 'POST', body: productData }),
  updateProduct: (id, productData) => apiRequest(`/products/${id}`, { method: 'PUT', body: productData }),
  deleteProduct: (id) => {
    if (!id || id === 'undefined') {
      throw new Error('Product ID is required');
    }
    return apiRequest(`/products/${id}`, { method: 'DELETE' });
  },
};

export const cartAPI = {
  getCart: () => apiRequest('/cart'),
  addToCart: (productId, quantity = 1) => apiRequest('/cart', { method: 'POST', body: { productId, quantity } }),
  updateCartItem: (productId, quantity) => apiRequest(`/cart/${productId}`, { method: 'PUT', body: { quantity } }),
  removeFromCart: (productId) => apiRequest(`/cart/${productId}`, { method: 'DELETE' }),
};

export const ordersAPI = {
  createOrder: (orderData) => apiRequest('/orders', { method: 'POST', body: orderData }),
  getOrders: () => apiRequest('/orders'),
  getOrder: (id) => apiRequest(`/orders/${id}`),
};

export const reviewsAPI = {
  addReview: (reviewData) => apiRequest('/reviews', { method: 'POST', body: reviewData }),
  getProductReviews: (productId) => {
    if (!productId) throw new Error('getProductReviews requires a productId');
    return apiRequest(`/reviews/product/${productId}`);
  },
};

export const paymentAPI = {
  createPaymentOrder: (amount) => apiRequest('/payment/create-order', { method: 'POST', body: { amount } }),
  verifyPayment: (paymentData) => apiRequest('/payment/verify', { method: 'POST', body: paymentData }),
};