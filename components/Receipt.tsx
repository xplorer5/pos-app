/*import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ReceiptProps {
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  };
  total: number;
  onClose: () => void;
}

export const Receipt: React.FC<ReceiptProps> = ({ 
  customerDetails, 
  total, 
  onClose 
}) => {
  const receiptNumber = Math.floor(Math.random() * 1000000);
  const currentDate = new Date().toLocaleString();

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white p-6 rounded shadow-lg w-full max-w-md"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Payment Receipt</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Image src="/close-icon.svg" alt="Close" width={24} height={24} />
          </button>
        </div>
        <div className="space-y-2">
          <p><strong>Receipt #:</strong> {receiptNumber}</p>
          <p><strong>Date:</strong> {currentDate}</p>
          <div>
            <h3 className="font-medium">Customer Information</h3>
            <p><strong>Name:</strong> {customerDetails.name}</p>
            <p><strong>Email:</strong> {customerDetails.email}</p>
            <p><strong>Phone:</strong> {customerDetails.phone}</p>
          </div>
          <div>
            <h3 className="font-medium">Payment Summary</h3>
            <p><strong>Total Amount:</strong> ${total.toFixed(2)}</p>
            <p><strong>Payment Status:</strong> Completed</p>
            <p><strong>Payment Method:</strong> Card</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button 
            onClick={() => window.print()}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Print Receipt
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};*/