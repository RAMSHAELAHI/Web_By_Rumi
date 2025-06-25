'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useCart } from '@/app/context/CartContext';
import { useWishlist } from '@/app/context/WishlistContext';
import { Heart, HeartOff } from 'lucide-react';
import { toast } from 'sonner';

const AllProducts = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const products = [
    { id: 1, name: "Library Stool Chair", price: 20, image: "/images/01.jpg", tag: "New" },
    { id: 2, name: "Classic Wooden Chair", price: 20, originalPrice: 30, image: "/images/02.jpg", tag: "Sales" },
    { id: 3, name: "Modern Desk Chair", price: 20, image: "/images/03.jpg" },
    { id: 4, name: "Ergonomic Office Chair", price: 20, image: "/images/01.jpg" },
    { id: 5, name: "Rustic Accent Chair", price: 20, image: "/images/08.jpg", tag: "New" },
    { id: 6, name: "Dining Chair Set", price: 20, originalPrice: 30, image: "/images/06.jpg", tag: "Sales" },
    { id: 7, name: "Folding Outdoor Chair", price: 20, image: "/images/07.jpg" },
    { id: 8, name: "Vintage Armchair", price: 20, image: "/images/01.jpg" },
    { id: 9, name: "Minimalist Lounge Chair", price: 20, originalPrice: null, image: "/images/grey wood2.png", tag: "New" },
    { id: 10, name: "Executive Leather Chair", price: 20, originalPrice: 30, image: "/images/02.jpg", tag: "Sales" },
    { id: 11, name: "Children's Study Chair", price: 20, image: "/images/03.jpg" },
    { id: 12, name: "Velvet Dining Chair", price: 20, image: "/images/bl wh2.png" },
  ];

  return (
    <>
      <Navbar />

      <section className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">All Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => {
            const isWishlisted = isInWishlist(product.id.toString());

            return (
              <div
                key={product.id}
                className="relative border rounded-lg p-4 shadow-lg hover:shadow-xl transition duration-300 flex flex-col justify-between bg-white"
              >
                {/* Tag */}
                {product.tag && (
                  <span
                    className={`absolute top-2 left-2 inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      product.tag === "New"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.tag}
                  </span>
                )}

                {/* Wishlist Icon */}
                <button
                  onClick={() => {
                    toggleWishlist({
                      _id: product.id.toString(),
                      title: product.name,
                      price: product.price,
                      imgUrl: product.image,
                    });
                    toast.success(
                      isWishlisted
                        ? "Removed from Wishlist"
                        : "Added to Wishlist"
                    );
                  }}
                  className="absolute top-2 right-2 text-rose-500 hover:text-rose-600 z-10 p-1 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition"
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {isWishlisted ? <HeartOff size={24} /> : <Heart size={24} />}
                </button>

                {/* Product Image & Link */}
                <Link href={`/productDescription/${product.id}`} passHref className="block">
                  <div className="w-full h-48 mb-4 overflow-hidden rounded-md">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h2>
                </Link>

                <p className="text-gray-700 font-bold text-lg mb-1">
                  ${product.price.toFixed(2)}
                  {product.originalPrice && (
                    <span className="line-through text-gray-500 text-base ml-2">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </p>

                {/* Add to Cart */}
                <button
                  onClick={() => {
                    addToCart({
                      _id: product.id.toString(),
                      title: product.name,
                      price: product.price,
                      imgUrl: product.image,
                      quantity: 1,
                    });
                    toast.success("Added to cart");
                  }}
                  className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition w-full text-center"
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default AllProducts;
