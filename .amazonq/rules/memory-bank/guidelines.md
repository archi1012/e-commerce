# E-commerce Web App - Development Guidelines

## Code Quality Standards

### TypeScript Usage
- **Strict Type Safety**: All components use explicit TypeScript interfaces and types
- **Interface Definitions**: Export interfaces for reusable types (Product, CartItem, CartContextType)
- **Generic Type Parameters**: Use React.ComponentProps<T> for component prop inheritance
- **Optional Properties**: Use `?` for optional props (brand?, originalPrice?, discount?)
- **Type Assertions**: Avoid any types, use proper type definitions

### Component Architecture Patterns
- **Functional Components**: All components use function declarations with TypeScript
- **Props Interface**: Every component defines explicit props interface
- **Default Parameters**: Use default values in function parameters (defaultOpen = true)
- **Component Composition**: Use Slot pattern from Radix UI for flexible component APIs
- **Forward Refs**: Components support ref forwarding with proper typing

### Import Organization
- **External Libraries First**: React, third-party libraries at top
- **Internal Imports**: Local components and utilities after external
- **Relative Imports**: Use relative paths for local files (../context/CartContext)
- **Named Exports**: Prefer named exports over default exports for utilities
- **Barrel Exports**: Export multiple components from single files

## Styling Conventions

### Tailwind CSS Patterns
- **Utility Classes**: Use Tailwind utilities for all styling
- **Custom CSS Variables**: Use CSS custom properties for dynamic values (--sidebar-width)
- **Responsive Design**: Mobile-first approach with md:, lg: breakpoints
- **State-Based Styling**: Use data attributes for component states (data-state, data-active)
- **Color System**: Consistent color palette using semantic color names
  - Primary: `[#1F3C88]` (blue)
  - Success: `[#10B981]` (green)
  - Warning: `[#F9C74F]` (yellow)
  - Background: `[#F5F7FA]` (light gray)

### Component Styling Standards
- **Conditional Classes**: Use template literals for dynamic class application
- **Class Merging**: Use `cn()` utility for conditional class merging
- **Hover States**: Consistent hover effects with transition classes
- **Focus States**: Proper focus-visible styles for accessibility
- **Animation**: Use Tailwind animation classes for transitions

## State Management Patterns

### Context API Usage
- **Provider Pattern**: Wrap application with context providers
- **Custom Hooks**: Create useCart() hook for context consumption
- **Error Boundaries**: Throw errors when context used outside provider
- **State Updates**: Use functional updates for complex state changes
- **Immutable Updates**: Always return new objects/arrays for state updates

### Form Handling
- **Controlled Components**: All form inputs use controlled state
- **Form Validation**: Use required attributes and proper input types
- **State Management**: Single state object for related form fields
- **Event Handling**: Proper event typing with React.FormEvent
- **Form Submission**: Prevent default and handle async operations

## Component Development Standards

### UI Component Library Structure
- **Primitive Wrapping**: Wrap Radix UI primitives with custom styling
- **Variant System**: Use class-variance-authority for component variants
- **Data Attributes**: Use data-slot and data-sidebar for component identification
- **Accessibility**: Maintain ARIA attributes from primitive components
- **Keyboard Navigation**: Support keyboard shortcuts and navigation

### Event Handling Patterns
- **Event Propagation**: Use preventDefault() and stopPropagation() appropriately
- **Async Operations**: Handle promises with proper error handling
- **Toast Notifications**: Use sonner for user feedback on actions
- **Navigation**: Use React Router's useNavigate for programmatic navigation

## API and Data Patterns

### Data Structure Standards
- **Interface Consistency**: Product interface used across all components
- **ID Management**: String IDs for all entities
- **Price Formatting**: Use toLocaleString('en-IN') for Indian currency
- **Image URLs**: Use Unsplash URLs with proper parameters
- **Category Organization**: Structured category data with icons and counts

### State Synchronization
- **Cart Operations**: Immutable updates with spread operators
- **Quantity Management**: Separate functions for add, remove, update
- **Wishlist Logic**: Prevent duplicate additions with find() checks
- **Total Calculations**: Pure functions for price and item calculations

## Performance Optimization

### React Optimization
- **useMemo**: Memoize expensive calculations and object creation
- **useCallback**: Memoize event handlers and functions
- **Conditional Rendering**: Use early returns and conditional operators
- **Component Splitting**: Separate concerns into focused components
- **Lazy Loading**: Consider code splitting for large components

### Memory Management
- **Event Cleanup**: Remove event listeners in useEffect cleanup
- **State Cleanup**: Clear state when components unmount
- **Cookie Management**: Set appropriate max-age for persistent data
- **Image Optimization**: Use appropriate image sizes and formats

## Error Handling and Validation

### Input Validation
- **Required Fields**: Use HTML5 required attribute
- **Type Validation**: Proper input types (email, tel, text)
- **Pattern Matching**: Use regex patterns for specific formats
- **Error Messages**: Provide clear user feedback for validation errors

### Error Boundaries
- **Context Errors**: Throw descriptive errors when context misused
- **Fallback UI**: Provide fallback components for error states
- **Error Logging**: Consider error reporting for production apps
- **Graceful Degradation**: Handle missing data gracefully

## Testing Considerations

### Component Testing
- **Props Testing**: Test component behavior with different props
- **State Testing**: Verify state changes and side effects
- **Event Testing**: Test user interactions and event handlers
- **Accessibility Testing**: Ensure keyboard navigation and screen readers

### Integration Testing
- **Context Testing**: Test context provider and consumer integration
- **Router Testing**: Test navigation and route changes
- **Form Testing**: Test form submission and validation
- **API Testing**: Mock external dependencies and test data flow