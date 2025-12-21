# E-commerce React App

A modern e-commerce web application built with **React** and **Tailwind CSS**. This project has been converted from TypeScript to plain JavaScript React for easier development and broader accessibility.

## 🚀 Features

- **Product Catalog**: Browse products with detailed cards showing images, ratings, pricing, and discounts
- **Shopping Cart**: Add/remove items with real-time cart management and quantity controls
- **Wishlist**: Save favorite products for later purchase with heart icon interactions
- **User Authentication**: Login and registration pages for user account management
- **Product Details**: Dedicated product pages with comprehensive information
- **Checkout Process**: Complete purchase flow with order processing
- **Category Navigation**: Browse products by categories with filtering capabilities
- **User Profile**: Personal account management and wishlist viewing
- **Responsive Design**: Mobile-first approach with adaptive layouts across devices
- **Toast Notifications**: Real-time feedback for user actions (add to cart, wishlist, etc.)

## 🛠️ Tech Stack

- **React 18.3.1** - Modern React with hooks and functional components
- **Tailwind CSS 4.1.12** - Utility-first CSS framework for rapid UI development
- **React Router DOM** - Client-side routing for single-page application
- **Lucide React** - Beautiful & consistent icon library
- **Sonner** - Toast notifications for user feedback
- **Vite** - Fast build tool and development server

## 📦 Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/          # Reusable React components
│   │   ├── ui/             # UI component library (50+ components)
│   │   ├── Header.jsx      # Navigation and branding
│   │   ├── Footer.jsx      # Site footer
│   │   └── ProductCard.jsx # Product display component
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx    # Landing page
│   │   ├── CartPage.jsx    # Shopping cart
│   │   ├── LoginPage.jsx   # User authentication
│   │   └── ...            # Other pages
│   ├── context/            # React Context for state management
│   │   └── CartContext.jsx # Global cart and wishlist state
│   ├── data/              # Static data and mock APIs
│   │   └── products.js    # Product catalog data
│   └── App.jsx            # Main application component
├── styles/                # CSS and styling files
│   ├── index.css         # Global styles
│   ├── tailwind.css      # Tailwind configuration
│   └── theme.css         # Design tokens
└── main.jsx              # Application entry point
```

## 🎨 Design System

- **Primary Colors**: 
  - Blue: `#1F3C88` (primary brand color)
  - Yellow: `#F9C74F` (accent/CTA color)
  - Green: `#10B981` (success/ratings)
- **Typography**: Modern font stack with proper hierarchy
- **Components**: Consistent design system with reusable UI components
- **Responsive**: Mobile-first approach with breakpoints for all devices

## 🔧 Key Components

### CartContext
Global state management for:
- Shopping cart items and quantities
- Wishlist management
- Price calculations
- Cart operations (add, remove, update)

### ProductCard
Reusable component featuring:
- Product image with hover effects
- Rating and review display
- Price with discount calculations
- Add to cart and wishlist functionality
- Responsive design

### Header
Navigation component with:
- Logo and branding
- Search functionality
- Category navigation
- User actions (login, cart, wishlist)
- Mobile-responsive menu

## 🚀 Getting Started

The application is ready to run out of the box. Simply install dependencies and start the development server to begin exploring the e-commerce interface.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px and up
- **Tablet**: 768px and up  
- **Desktop**: 1024px and up
- **Large screens**: 1280px and up

## 🎯 Browser Support

Supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

**Note**: This project has been converted from TypeScript to plain JavaScript React for easier development and broader accessibility. All functionality remains intact while removing TypeScript complexity.