// 'use client';

// import { createContext, useContext, useState } from 'react';

// // Define the wishlist item type
// export type WishlistItem = {
//   _id: string;
//   title: string;
//   price: number;
//   imageUrl: string;
// };

// // Define the context type
// type WishlistContextType = {
//   wishlist: WishlistItem[];
//   addToWishlist: (item: WishlistItem) => void;
//   removeFromWishlist: (id: string) => void;
//   isInWishlist: (id: string) => boolean;
// };

// const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
//   const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

//   const addToWishlist = (item: WishlistItem) => {
//     setWishlist((prev) => {
//       if (prev.some(wishlistItem => wishlistItem._id === item._id)) {
//         return prev; // Don't add if already exists
//       }
//       return [...prev, item];
//     });
//   };

//   const removeFromWishlist = (id: string) => {
//     setWishlist((prev) => prev.filter((item) => item._id !== id));
//   };

//   const isInWishlist = (id: string) => {
//     return wishlist.some((item) => item._id === id);
//   };

//   return (
//     <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => {
//   const context = useContext(WishlistContext);
//   if (!context) {
//     throw new Error('useWishlist must be used within a WishlistProvider');
//   }
//   return context;
// };
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the wishlist item type - CORRECTED 'imageUrl' to 'imgUrl'
export type WishlistItem = {
  _id: string;
  title: string;
  price: number;
  imgUrl: string; // Corrected: changed from 'imageUrl' to 'imgUrl'
};

// Define the context type
type WishlistContextType = {
  wishlist: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
  wishlistItemCount: number;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const toggleWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      const exists = prev.some(wishlistItem => wishlistItem._id === item._id);
      if (exists) {
        return prev.filter((wishlistItem) => wishlistItem._id !== item._id);
      } else {
        return [...prev, item];
      }
    });
  };

  const isInWishlist = (id: string) => {
    return wishlist.some((item) => item._id === id);
  };

  const wishlistItemCount = wishlist.length;

  const contextValue: WishlistContextType = {
    wishlist,
    toggleWishlist,
    isInWishlist,
    wishlistItemCount,
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
