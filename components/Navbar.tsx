"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "@/constants";
import Button from "./Button";
import Cart from "./Cart";

const Navbar = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  useEffect(() => {
    const updateCart = () => {
      if (typeof window !== 'undefined') {
        const items = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(items);
        
        // Check if checkout was successful
        const success = localStorage.getItem('checkoutSuccess');
        if (success === 'true') {
          setCheckoutSuccess(true);
          localStorage.removeItem('checkoutSuccess'); // Clear the flag
        }
      }
    };

    // Initial cart load
    updateCart();

    // Set up interval to check cart regularly
    const intervalId = setInterval(updateCart, 1000);

    // Clean up interval on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
    setCheckoutSuccess(false); // Reset checkout success state when opening cart
  };

  return (
    <>
      <nav className="flexBetween max-container padding-container relative z-30 py-5">
        <Link href="/">
          <Image src="/pos-app-logo.svg" alt="logo" width={74} height={29} />
        </Link>

        <ul className="hidden h-full gap-12 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link 
              href={link.href} 
              key={link.key}
              className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
            >
              {link.label}
            </Link>
          ))}
        </ul>

        <div className="lg:flexCenter hidden cursor-pointer relative">
          <Button
            type="button"
            title={checkoutSuccess ? "Add to Cart Again" : "Cart"}
            icon="/cart2.svg"
            variant="btn_dark_green"
            onClick={handleCartClick}
          />
        </div>

        <div className="lg:hidden sm:flexCenter color:black relative">
          <Button
            type="button"
            title={checkoutSuccess ? "Add to Cart Again" : "Cart"}
            icon="/cart.svg"
            variant="btn_white"
            onClick={handleCartClick}
          />
        </div>
      </nav>

      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
    </>
  );
};

export default Navbar;