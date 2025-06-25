// src/app/allProducts/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import { Heart, HeartOff } from "lucide-react";
import { toast } from "sonner"; // ✅ Import

const AllProducts = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const products = [
    { id: 1, name: "Library Stool Chair", price: 20, image: "/images/01.jpg", tag: "New" },
    { id: 2, name: "Classic Wooden Chair", price: 20, originalPrice: 30, image: "/images/02.jpg", tag: "Sales" },
    // ...other products
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
              <div key={product.id} className="relative border rounded-lg p-4 shadow-lg hover:shadow-xl transition bg-white">
                {/* Tag */}
                {product.tag && (
                  <span className={`absolute top-2 left-2 px-3 py-1 text-xs font-semibold rounded-full ${
                    product.tag === "New" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {product.tag}
                  </span>
                )}

                {/* Wishlist */}
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
                  className="absolute top-2 right-2 text-rose-500 hover:text-rose-600 z-10 p-1 bg-white bg-opacity-80 rounded-full"
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {isWishlisted ? <HeartOff size={22} /> : <Heart size={22} />}
                </button>

                {/* Image */}
                <Link href={`/productDescription/${product.id}`}>
                  <div className="w-full h-48 mb-4 overflow-hidden rounded-md">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h2>
                </Link>

                <p className="text-gray-700 font-bold">
                  ${product.price}
                  {product.originalPrice && (
                    <span className="ml-2 line-through text-gray-400 text-sm">${product.originalPrice}</span>
                  )}
                </p>

                <button
                  onClick={() => {
                    addToCart({
                      _id: product.id.toString(),
                      title: product.name,
                      price: product.price,
                      imgUrl: product.image,
                      quantity: 1,
                    });
                    toast.success("Item added to cart");
                  }}
                  className="mt-3 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition w-full"
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
