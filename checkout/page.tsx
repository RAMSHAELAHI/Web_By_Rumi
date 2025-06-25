'use client';

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  zipCode: string;
  country: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();

  const [formData, setFormData] = useState<CheckoutForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 0.25 * subtotal;
  const tax = 0.1 * subtotal;
  const total = (subtotal - discount + tax).toFixed(2);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePlaceOrder = () => {
    if (!formData.firstName || !formData.email || !formData.phone || !formData.address1) {
      alert("Please fill in all required fields!");
      return;
    }

    setIsOrderPlaced(true);
    console.log("Placing order with:", { formData, cartItems, total });

    setTimeout(() => {
      clearCart();
      router.push('/thank-you');
    }, 1000);
  };

  return (
    <>
      {/* ✅ Removed unnecessary spacing, and margin fixes */}
      <section
        className="bg-cover bg-center h-48 flex items-center justify-center m-0"
        style={{ backgroundImage: "url('/images/bg_cover.png')" }}
      >
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold">Checkout</h2>
          <p className="pt-1">
            <Link href="/" className="text-yellow-400 font-bold h-22 w-10">Checking Out</Link> › Checkout
          </p>
        </div>
      </section>

      <main className="max-w-screen-2xl mx-auto w-full px-4 lg:px-16 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Shipping Address Form */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" value={formData.firstName} onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-md" />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" value={formData.lastName} onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-md" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={formData.email} onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-md" />
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-md" />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="address1">Address Line 1</label>
              <input type="text" id="address1" value={formData.address1} onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-md" />
            </div>

            <div className="mt-4">
              <label htmlFor="address2">Address Line 2</label>
              <input type="text" id="address2" value={formData.address2} onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-md" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label htmlFor="city">City</label>
                <input type="text" id="city" value={formData.city} onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-md" />
              </div>
              <div>
                <label htmlFor="zipCode">Zip Code</label>
                <input type="text" id="zipCode" value={formData.zipCode} onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-md" />
              </div>
              <div>
                <label htmlFor="country">Country</label>
                <select id="country" value={formData.country} onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-md">
                  <option value="">Select Country</option>
                  <option value="USA">United States</option>
                  <option value="CA">Canada</option>
                  <option value="PK">Pakistan</option>
                </select>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="border rounded-lg p-6 shadow-sm bg-white">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4 items-center">
                    <div className="relative w-20 h-20">
                      <Image src={item.imgUrl} alt={item.title} fill className="object-cover rounded-md" unoptimized />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-500">${item.price} × {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2 border-t pt-4 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Discount (25%)</span><span>-${discount.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Tax (10%)</span><span>+${tax.toFixed(2)}</span></div>
                <div className="flex justify-between font-semibold border-t pt-2"><span>Total</span><span>${total}</span></div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isOrderPlaced}
                className={`w-full mt-6 px-6 py-3 rounded-md text-white font-medium ${
                  isOrderPlaced ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-orange-600'
                }`}
              >
                {isOrderPlaced ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
