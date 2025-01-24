# POS (Point of Sale) Application - Frontend

A simple and efficient Point of Sale frontend application built with Next.js 14, TailwindCSS, and TypeScript. This application focuses on streamlined checkout process without authentication requirements.

## Features

### 1. Product Display
- Grid layout showing products with:
  - Product image
  - Name
  - Price
  - Add to cart button
  -CheckoutForm

### 2. Shopping Cart
- Real-time cart updates
- Quantity adjustment
- Item removal
- Subtotal calculation
- Total amount display
- Cart data persists in local storage

### 3. Checkout Flow
- Checkout form with:
  - Customer details (optional)
  - Payment method selection (dummy implementation)
    - Card with MasterCard, American Express, Visa 
  - Order summary
- Order confirmation screen
- Downloadable receipt in txt format
- Cart clears automatically after successful order

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS for styling
- Shadcn UI components
- Local Storage for cart data
- React Text Generation for card details


## Live 
Check out the live deployed app on Vercel: (https://pos-ekzpjz7m7-xplorers-projects.vercel.app/)
