// app/products/page.tsx or any listing component
"use client";

import Link from "next/link";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Library Stool Chair",
    price: 20,
    image: "/images/01.jpg",
  },
  {
    id: 2,
    name: "Classic Wooden Chair",
    price: 20,
    image: "/images/02.jpg",
  },
  // ... more products
];

const ProductsPage = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-8">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded shadow">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={200}
            className="rounded mb-4"
          />
          <h2 className="text-lg font-bold mb-2">{product.name}</h2>
          <p className="text-emerald-700 font-semibold mb-4">${product.price}</p>
          <Link href={`/product/${product.id}`}>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition">
              View Details
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
