const API_BASE_URL = 'http://localhost:5000/api';

const getAuthToken = () => localStorage.getItem('token');

const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();
  
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

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
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
  getProduct: (id) => apiRequest(`/products/${id}`),
  getCategories: () => apiRequest('/products/categories'),
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

export const paymentAPI = {
  createPaymentOrder: (amount) => apiRequest('/payment/create-order', { method: 'POST', body: { amount } }),
  verifyPayment: (paymentData) => apiRequest('/payment/verify', { method: 'POST', body: paymentData }),
};