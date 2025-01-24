"use client";

import { useState } from "react";
import Products from "@/components/Products";
import Cart from "@/components/Cart";
import CheckoutForm from "@/components/CheckoutForm";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleCheckoutOpen = () => {
    setIsCheckoutOpen(true);
  };
  
  const handleCheckoutClose = () => {
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    // Add URL parameter to indicate coming from checkout close
    window.history.pushState({}, '', '?fromClose=true');
  };

  return (
    <>
      {isCheckoutOpen && <CheckoutForm onClose={handleCheckoutClose} />}
      {isCartOpen && <Cart onCheckout={handleCheckoutOpen} onClose={() => setIsCartOpen(false)} />}
      <Products />
    </>
  );
}
