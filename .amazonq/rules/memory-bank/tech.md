# E-commerce Web App - Technology Stack

## Programming Languages
- **TypeScript**: Primary language for type-safe development
- **JavaScript**: ES6+ features with module system
- **CSS**: Modern CSS with custom properties and flexbox/grid
- **HTML**: Semantic HTML5 structure

## Core Framework & Libraries

### React Ecosystem
- **React 18.3.1**: Component-based UI library with hooks
- **React DOM 18.3.1**: DOM rendering and hydration
- **React Router DOM 7.11.0**: Client-side routing and navigation

### Build System
- **Vite 6.3.5**: Fast build tool and development server
- **@vitejs/plugin-react 4.7.0**: React integration for Vite
- **PostCSS**: CSS processing and optimization

### Styling & UI
- **Tailwind CSS 4.1.12**: Utility-first CSS framework
- **@tailwindcss/vite 4.1.12**: Vite integration for Tailwind
- **Radix UI**: Comprehensive component primitives library
  - 20+ Radix components for accessibility and functionality
- **Lucide React 0.487.0**: Modern icon library
- **Class Variance Authority 0.7.1**: Component variant management
- **Tailwind Merge 3.2.0**: Conditional class merging

### State Management & Forms
- **React Context**: Built-in state management for cart/wishlist
- **React Hook Form 7.55.0**: Form validation and handling
- **Sonner 2.0.3**: Toast notification system

### UI Enhancement Libraries
- **Motion 12.23.24**: Animation and gesture library
- **Embla Carousel React 8.6.0**: Carousel component
- **React Resizable Panels 2.1.7**: Resizable layout panels
- **Vaul 1.1.2**: Drawer component library
- **Next Themes 0.4.6**: Theme switching functionality

### Utility Libraries
- **Date-fns 3.6.0**: Date manipulation and formatting
- **CLSX 2.1.1**: Conditional className utility
- **CMDK 1.1.1**: Command palette component

## Development Commands

### Installation
```bash
npm i                    # Install all dependencies
```

### Development
```bash
npm run dev             # Start development server with hot reload
```

### Production
```bash
npm run build           # Build optimized production bundle
```

## Configuration Files

### Build Configuration
- **vite.config.ts**: Vite build settings and plugins
- **postcss.config.mjs**: PostCSS processing configuration
- **package.json**: Dependencies and script definitions

### Styling Configuration
- **tailwind.css**: Tailwind CSS imports and base styles
- **index.css**: Global CSS reset and custom styles
- **fonts.css**: Custom font face declarations
- **theme.css**: CSS custom properties for theming

## Development Environment

### Package Manager
- **NPM**: Primary package manager with lock file
- **PNPM Overrides**: Vite version pinning for consistency

### TypeScript Configuration
- **Strict Type Checking**: Enabled for better code quality
- **Module Resolution**: ES6 modules with proper imports
- **JSX Support**: TSX files for React components

### Browser Support
- **Modern Browsers**: ES6+ features and CSS Grid/Flexbox
- **Mobile Responsive**: Touch-friendly interactions
- **Progressive Enhancement**: Graceful degradation for older browsers

## Key Dependencies by Category

### Core React (3)
- react, react-dom, react-router-dom

### UI Components (20+)
- All @radix-ui/* packages for accessible primitives
- lucide-react for icons
- sonner for notifications

### Styling (5)
- tailwindcss, class-variance-authority, clsx, tailwind-merge, tw-animate-css

### Build Tools (3)
- vite, @vitejs/plugin-react, @tailwindcss/vite

### Utilities (8)
- date-fns, motion, embla-carousel-react, react-hook-form, etc.