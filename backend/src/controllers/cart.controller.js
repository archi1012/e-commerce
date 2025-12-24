const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    
    if (cart) {
      // Filter out items with deleted products
      const originalLength = cart.items.length;
      cart.items = cart.items.filter(item => item.product !== null);
      
      // Save cart if items were removed
      if (cart.items.length !== originalLength) {
        await cart.save();
      }
      
      // Add stock status to remaining items
      cart.items = cart.items.map(item => {
        const itemObj = item.toObject();
        itemObj.isOutOfStock = item.product.stock === 0;
        return itemObj;
      });
    }
    
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    // Check if product exists and is in stock
    const Product = require('../models/Product');
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (product.stock === 0) {
      return res.status(400).json({ message: 'Product is out of stock' });
    }
    
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId);
    
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.stock) {
        return res.status(400).json({ message: `Only ${product.stock} items available` });
      }
      existingItem.quantity = newQuantity;
    } else {
      if (quantity > product.stock) {
        return res.status(400).json({ message: `Only ${product.stock} items available` });
      }
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    await cart.populate('items.product');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.product.toString() === req.params.productId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Check product stock
    const Product = require('../models/Product');
    const product = await Product.findById(req.params.productId);
    
    if (!product) {
      // Remove item if product is deleted
      cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
      await cart.save();
      return res.status(404).json({ message: 'Product no longer available' });
    }
    
    if (quantity > product.stock) {
      return res.status(400).json({ message: `Only ${product.stock} items available` });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate('items.product');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
    await cart.save();
    await cart.populate('items.product');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};