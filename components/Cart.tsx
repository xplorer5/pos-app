"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PRODUCTS } from "@/constants";
import CheckoutForm from "./CheckoutForm";
interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

interface CartProps {
  onClose: () => void;
  onCheckout?: () => void;
}

const Cart: React.FC<CartProps> = ({ onClose, onCheckout }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadCartItems = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const parsedCart: CartItem[] = JSON.parse(storedCart);
        setCartItems(parsedCart);
        calculateTotal(parsedCart);
      }
    };

    loadCartItems();
  }, []);

  const calculateTotal = (items: CartItem[]) => {
    const newTotal = items.reduce((sum, item) => {
      const itemPrice = parseFloat(item.price.replace("$", ""));
      return sum + itemPrice * item.quantity;
    }, 0);
    setTotal(newTotal);
  };

  const removeFromCart = (itemId: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(1, newQuantity) }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleCheckout = () => {
    setShowCheckoutForm(true);
    if (onCheckout) {
      onCheckout();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-end backdrop-blur-sm transition-all duration-300">
      <div className="w-[28rem] bg-white h-full shadow-2xl p-8 overflow-y-auto animate-slideIn">
        {showCheckoutForm ? (
          <CheckoutForm onClose={onClose}/>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8 border-b pb-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                Your Cart
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-full"
              >
                <Image src="/close-icon.svg" alt="Close" width={24} height={24} className="transform hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <Image src="/empty-cart.png" alt="Empty Cart" width={120} height={120} className="mx-auto mb-4 opacity-50" />
                <p className="text-gray-500 text-lg">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {cartItems.map((item) => {
                    const product = PRODUCTS.find((p) => p.id === item.id);
                    const itemPrice = parseFloat(item.price.replace("$", ""));
                    const updatedPrice = (itemPrice * item.quantity).toFixed(2);
                    return (
                      <div
                        key={item.id}
                        className="flex items-center p-4 border rounded-xl hover:shadow-md transition-shadow duration-300 bg-white"
                      >
                        <div className="relative">
                          <Image
                            src={product?.image || "/shopping-cart.png"}
                            alt={product?.name || item.name}
                            width={80}
                            height={80}
                            className="object-cover rounded-lg"
                          />
                          <span className="absolute -top-2 -right-2 bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-grow ml-4">
                          <h3 className="font-semibold text-lg">{product?.name || item.name}</h3>
                          <div className="flex items-center mt-2 space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
                            >
                              -
                            </button>
                            <span className="font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
                            >
                              +
                            </button>
                          </div>
                          <p className="mt-2 font-medium text-green-600">${updatedPrice}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-4 text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
                        >
                          <Image src="/remove-icon.svg" alt="Remove" width={20} height={20} />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 border-t pt-6">
                  <div className="flex justify-between mb-6">
                    <span className="text-xl font-bold">Total:</span>
                    <span className="text-xl font-bold text-green-600">${total.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold 
                             hover:from-green-600 hover:to-blue-600 transform hover:scale-[1.02] transition-all duration-200 
                             shadow-lg hover:shadow-xl active:scale-[0.98]"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
