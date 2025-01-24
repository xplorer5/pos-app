"use client";
import { PRODUCTS } from '@/constants';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';

const Products = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if redirected from checkout or close
    const params = new URLSearchParams(window.location.search);
    if (params.get('fromCheckout') === 'true' || params.get('fromClose') === 'true') {
      // Clear the cart after successful checkout or when closed
      localStorage.setItem('cart', '[]');
      // Clear URL parameters
      router.replace('/');
    }
  }, [router]);

  return (
    <section className="max-container padding-container py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((product) => (
          <div 
            key={product.id} 
            className="group relative overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[2px] transition-all duration-300 group-hover:blur-0"
              style={{
                backgroundImage: `url(${product.image})`,
              }}
            />
            <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/20" />
            <div className="relative h-[400px] p-6 flex flex-col justify-end">
              <div className="transform transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-xl font-semibold text-white/90 mb-2">{product.price}</p>
                <p className="text-white/80 mb-6 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  {product.description}
                </p>
                <button 
                  onClick={() => {
                    // Get existing cart items from localStorage or initialize empty array
                    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
                    
                    // Add new item to cart
                    const newItem = {
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      quantity: 1
                    };
                    
                    // Check if item already exists in cart
                    const existingItemIndex = existingCart.findIndex(
                      (item: any) => item.id === product.id
                    );
                    
                    if (existingItemIndex >= 0) {
                      // Increment quantity if item exists
                      existingCart[existingItemIndex].quantity += 1;
                    } else {
                      // Add new item if it doesn't exist
                      existingCart.push(newItem);
                    }
                    
                    // Save updated cart to localStorage
                    localStorage.setItem('cart', JSON.stringify(existingCart));
                    
                    // Update button text
                    const btn = document.getElementById(`add-btn-${product.id}`);
                    if (btn) {
                      btn.textContent = `Added to Cart 🛒`;
                    }
                  }}
                  id={`add-btn-${product.id}`}
                  className="w-full bg-white/90 text-gray-900 py-3 px-6 rounded-lg font-semibold 
                    hover:bg-white transition-colors duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Products