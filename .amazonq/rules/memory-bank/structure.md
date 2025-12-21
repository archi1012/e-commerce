# E-commerce Web App - Project Structure

## Directory Organization

### Root Level
- **src/**: Main application source code
- **guidelines/**: Project documentation and development guidelines
- **.amazonq/**: AI assistant configuration and memory bank
- **package.json**: Dependencies and build configuration
- **vite.config.ts**: Vite build tool configuration
- **index.html**: Application entry point

### Source Structure (`src/`)

#### Application Core (`src/app/`)
- **App.tsx**: Main application component with routing setup
- **main.tsx**: Application entry point and React DOM rendering

#### Components (`src/app/components/`)
- **ProductCard.tsx**: Reusable product display component
- **Header.tsx**: Navigation and branding component
- **Footer.tsx**: Site footer with links and information
- **figma/**: Figma-specific components for design integration
- **ui/**: Comprehensive UI component library (50+ components)

#### UI Component Library (`src/app/components/ui/`)
Extensive collection of reusable components:
- **Form Components**: input.tsx, button.tsx, checkbox.tsx, select.tsx
- **Layout Components**: card.tsx, separator.tsx, sheet.tsx, sidebar.tsx
- **Navigation**: breadcrumb.tsx, navigation-menu.tsx, pagination.tsx
- **Feedback**: alert.tsx, toast (sonner.tsx), progress.tsx
- **Data Display**: table.tsx, badge.tsx, avatar.tsx, skeleton.tsx
- **Overlays**: dialog.tsx, drawer.tsx, popover.tsx, tooltip.tsx

#### Pages (`src/app/pages/`)
- **HomePage.tsx**: Landing page with featured products
- **ProductDetailPage.tsx**: Individual product information
- **CartPage.tsx**: Shopping cart management
- **CheckoutPage.tsx**: Purchase completion flow
- **CategoryPage.tsx**: Product category browsing
- **LoginPage.tsx**: User authentication
- **RegisterPage.tsx**: New user registration
- **ProfilePage.tsx**: User account management

#### State Management (`src/app/context/`)
- **CartContext.tsx**: Global cart and wishlist state management

#### Data Layer (`src/app/data/`)
- **products.ts**: Product catalog data and type definitions

#### Styling (`src/styles/`)
- **index.css**: Global styles and CSS reset
- **tailwind.css**: Tailwind CSS configuration
- **fonts.css**: Custom font definitions
- **theme.css**: Color schemes and design tokens

## Core Components Relationships

### State Flow
1. **CartContext** provides global state for cart and wishlist
2. **ProductCard** consumes context for add-to-cart functionality
3. **Pages** coordinate between components and context
4. **UI Components** provide consistent design system

### Routing Architecture
- React Router DOM handles client-side navigation
- Pages directory contains route components
- Header component provides navigation links
- App.tsx configures route definitions

### Component Hierarchy
```
App.tsx
├── Header.tsx
├── Pages (Route Components)
│   ├── HomePage.tsx
│   │   └── ProductCard.tsx (multiple)
│   ├── ProductDetailPage.tsx
│   ├── CartPage.tsx
│   └── Other Pages...
└── Footer.tsx
```

## Architectural Patterns

### Component Design
- **Composition over Inheritance**: UI components built with slots and variants
- **Props Interface**: TypeScript interfaces for component contracts
- **Context Pattern**: Global state management without prop drilling
- **Custom Hooks**: Reusable logic extraction (useCart, useMobile)

### Styling Strategy
- **Tailwind CSS**: Utility-first styling approach
- **Component Variants**: Class variance authority for component states
- **Responsive Design**: Mobile-first breakpoint system
- **Design Tokens**: Consistent color and spacing system