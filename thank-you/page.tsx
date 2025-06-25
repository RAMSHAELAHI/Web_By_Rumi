"use client";

import React, { useEffect, useState } from "react";

interface CheckoutData {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

const ThankYouPage = () => {
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);

  useEffect(() => {
    // Get data from localStorage
    const data = localStorage.getItem("checkoutData");
    if (data) {
      setCheckoutData(JSON.parse(data));
      localStorage.removeItem("checkoutData"); // Clear after use
    }
  }, []);

  if (!checkoutData) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold">No order data found</h1>
        <p>You may have reached this page directly without placing an order.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Thank You for Your Order!</h1>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Shipping Information</h2>
        
        <div>
          <p><span className="font-medium">Name:</span> {checkoutData.name}</p>
          <p><span className="font-medium">Email:</span> {checkoutData.email}</p>
          <p><span className="font-medium">Address:</span> {checkoutData.address}</p>
          <p><span className="font-medium">City:</span> {checkoutData.city}</p>
          <p><span className="font-medium">Postal Code:</span> {checkoutData.postalCode}</p>
          <p><span className="font-medium">Country:</span> {checkoutData.country}</p>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p>Your order has been placed successfully.</p>
          <p>We'll send a confirmation email shortly.</p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;