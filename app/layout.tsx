"use client";
import { useState } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import CheckoutForm from "@/components/CheckoutForm";  // Assuming CheckoutForm is available
import { metadata } from "./metadata";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false); // Track if checkout is initiated

  const handleCheckout = () => {
    setIsCartOpen(false); // Close the cart when checkout is clicked
    setIsCheckout(true); // Show the checkout form
  };

  const handleCloseCheckout = () => {
    setIsCheckout(false); // Hide the checkout form when it's closed
  };

  return (
    <html lang="en">
      <body>
        <div className="fixed top-0 left-0 right-0 z-50 bg-white">
          <Navbar />
        </div>
        <div className="pt-[100px]"> {/* Add padding to account for fixed navbar */}
          <main className="relative overflow-hidden">
            {/* Show cart or checkout form depending on the state */}
            {isCheckout ? (
              <CheckoutForm onClose={handleCloseCheckout} /> // Pass a close handler for checkout
            ) : isCartOpen ? (
              <Cart onCheckout={handleCheckout} onClose={() => setIsCartOpen(false)} />
            ) : (
              children // Display other page content if neither cart nor checkout
            )}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
