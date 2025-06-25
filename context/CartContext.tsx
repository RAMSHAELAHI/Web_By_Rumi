// // 'use client'; // This directive makes this module a Client Component

// import React, { createContext, useContext, useState, ReactNode } from 'react';

// // Define the type for a single item in the cart
// export type CartItem = {
//   _id: string; // Unique identifier for the product (e.g., from a database)
//   title: string;
//   price: number;
//   imgUrl: string; // URL for the product image
//   quantity: number; // Number of this item in the cart
//   size?: string; // Optional property for product size (e.g., "S", "M", "L")
// };

// // Define the type for the value that the CartContext will provide
// type CartContextType = {
//   cartItems: CartItem[]; // The array of items currently in the cart
//   addToCart: (item: CartItem) => void; // Function to add an item to the cart
//   removeFromCart: (id: string) => void; // Function to remove an item by its _id (removes all instances of that ID, regardless of size)
//   // Note: For removing specific size/ID combination, you might need to adjust removeFromCart or pass size as well.
//   updateQuantity: (id: string, quantity: number) => void; // Function to update an item's quantity by _id
//   clearCart: () => void; // Function to clear all items from the cart
//   cartTotal: number; // Computed total price of all items in the cart
//   cartItemCount: number; // Computed total number of items (sum of quantities) in the cart
// };

// // Create the context. It's initialized with 'undefined' and will be populated by the Provider.
// const CartContext = createContext<CartContextType | undefined>(undefined);

// // Define the props for the CartProvider component
// interface CartProviderProps {
//   children: ReactNode; // ReactNode allows any valid React child (elements, strings, numbers, fragments etc.)
// }

// // The CartProvider component responsible for managing the cart state and providing it
// export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
//   // State to hold the cart items
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   // Function to add an item to the cart
//   const addToCart = (item: CartItem) => {
//     setCartItems((prevCartItems) => {
//       // Check if an item with the same _id and size already exists in the cart
//       const existingItem = prevCartItems.find(
//         (cartItem) => cartItem._id === item._id && cartItem.size === item.size
//       );

//       if (existingItem) {
//         // If the item exists, update its quantity
//         return prevCartItems.map((cartItem) =>
//           cartItem._id === item._id && cartItem.size === item.size
//             ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
//             : cartItem
//         );
//       } else {
//         // If the item does not exist, add it as a new item to the cart
//         return [...prevCartItems, item];
//       }
//     });
//   };

//   // Function to remove an item from the cart by its _id
//   // Note: This removes all instances of a product with that ID, regardless of size.
//   // If you need to remove a specific size, you'd adjust this function (e.g., removeFromCart(id: string, size?: string)).
//   const removeFromCart = (id: string) => {
//     setCartItems((prevCartItems) => prevCartItems.filter((item) => item._id !== id));
//   };

//   // Function to update the quantity of an item by its _id
//   const updateQuantity = (id: string, quantity: number) => {
//     setCartItems((prevCartItems) =>
//       prevCartItems.map((item) =>
//         item._id === id
//           ? { ...item, quantity: Math.max(quantity, 1) } // Ensure quantity is at least 1
//           : item
//       )
//     );
//   };

//   // Function to clear all items from the cart
//   const clearCart = () => {
//     setCartItems([]);
//   };

//   // Calculate the total price of items in the cart
//   const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   // Calculate the total number of items (sum of quantities) in the cart
//   const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);


//   // The value provided by the context
//   const contextValue: CartContextType = {
//     cartItems,
//     addToCart,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//     cartTotal,
//     cartItemCount,
//   };

//   return (
//     <CartContext.Provider value={contextValue}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Custom hook to consume the CartContext
// export const useCart = () => {
//   const context = useContext(CartContext);
//   // Throw an error if the hook is used outside of a CartProvider
//   if (context === undefined) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };
'use client'; 

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Type for a single item in the cart
export type CartItem = {
  _id: string; // Unique identifier (e.g., from DB)
  title: string;
  price: number;
  imgUrl: string;
  quantity: number;
  size?: string; // Optional size
};

// Context value type
type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size?: string) => void; // Now optionally considers size
  updateQuantity: (id: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
};

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Add item to cart
  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find(
        (i) => i._id === item._id && i.size === item.size
      );

      if (existing) {
        return prevItems.map((i) =>
          i._id === item._id && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      return [...prevItems, item];
    });
  };

  // Remove item (by _id and optionally size)
  const removeFromCart = (id: string, size?: string) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => item._id !== id || (size && item.size !== size)
      )
    );
  };

  // Update quantity
  const updateQuantity = (id: string, quantity: number, size?: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id && item.size === size
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  // Clear all items
  const clearCart = () => {
    setCartItems([]);
  };

  // Total price
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Total item count
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Provided context value
  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Hook to access cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
