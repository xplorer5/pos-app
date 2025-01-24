"use client";
import { useState } from "react";
import Image from "next/image";

const CheckoutForm = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardType, setCardType] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [activeField, setActiveField] = useState<string>("");

  const detectCardType = (cardNumber: string) => {
    const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const mastercardRegex = /^5[1-5][0-9]{14}$/;
    const amexRegex = /^3[47][0-9]{13}$/;
    
    if (visaRegex.test(cardNumber)) {
      setCardType("Visa");
    } else if (mastercardRegex.test(cardNumber)) {
      setCardType("MasterCard");
    } else if (amexRegex.test(cardNumber)) {
      setCardType("American Express");
    } else {
      setCardType("Unknown");
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!/^[A-Za-z\s]+$/.test(cardHolderName)) {
      newErrors.cardHolderName = "Cardholder name should contain only letters and spaces";
    }

    if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (cardType === "Unknown" || !cardNumber.match(/^\d+$/)) {
      newErrors.cardNumber = "Please enter a valid card number";
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!name || !email || !phone || !cardHolderName || !cardNumber || !cvv) {
      alert("Please fill out all fields.");
      return;
    }

    setIsProcessing(true);
    
    // Add loading animation
    const processingSteps = ["Processing", "Validating", "Confirming"];
    let step = 0;
    
    const interval = setInterval(() => {
      if (step < processingSteps.length) {
        setIsProcessing(true);
        step++;
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        setIsSuccess(true);
        localStorage.removeItem("cart");
      }
    }, 800);
  };

  const handleDownloadReceipt = () => {
    const receiptContent = `
      Receipt:
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Card Type: ${cardType}
      Order Status: Success
      Date: ${new Date().toLocaleString()}
    `;
    const blob = new Blob([receiptContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `receipt-${Date.now()}.txt`;
    link.click();
    localStorage.removeItem("cart");
    handleClose();
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCardHolderName("");
    setCardNumber("");
    setCvv("");
    setIsProcessing(false);
    setCardType("");
    setIsSuccess(false);
    setErrors({});
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-start bg-black bg-opacity-50 z-50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-500 scale-100 hover:scale-[1.02] my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Checkout</h2>
          <button 
            onClick={handleClose}
            className="hover:rotate-90 transition-transform duration-300"
          >
            <Image src="/close-icon.svg" alt="Close" width={24} height={24} />
          </button>
        </div>
        {isSuccess ? (
          <div className="animate-fadeIn">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-green-600 font-bold text-xl mb-4">Order Successful!</h3>
            </div>
            <button
              onClick={handleDownloadReceipt}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium
                       transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Download Receipt
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <div className="relative">
                <Image src="/name.svg" alt="User" width={20} height={20} 
                       className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 
                                 ${activeField === 'name' ? 'opacity-100' : 'opacity-50'}`} />
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setActiveField('name')}
                  onBlur={() => setActiveField('')}
                  className="w-full border pl-10 px-4 py-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Image src="/email.svg" alt="Email" width={20} height={20} 
                       className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300
                                 ${activeField === 'email' ? 'opacity-100' : 'opacity-50'}`} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setActiveField('email')}
                  onBlur={() => setActiveField('')}
                  className="w-full border pl-10 px-4 py-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <div className="relative">
                <Image src="/call.svg" alt="Phone" width={20} height={20} 
                       className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300
                                 ${activeField === 'phone' ? 'opacity-100' : 'opacity-50'}`} />
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  onFocus={() => setActiveField('phone')}
                  onBlur={() => setActiveField('')}
                  className="w-full border pl-10 px-4 py-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent transition-all duration-300"
                  required
                  pattern="\d{10}"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1 animate-shake">{errors.phone}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-700">Cardholder Name</label>
              <div className="relative">
                <Image src="/cardname.svg" alt="Cardholder" width={20} height={20} 
                       className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300
                                 ${activeField === 'cardHolderName' ? 'opacity-100' : 'opacity-50'}`} />
                <input
                  type="text"
                  id="cardHolderName"
                  value={cardHolderName}
                  onChange={(e) => setCardHolderName(e.target.value.replace(/[^A-Za-z\s]/g, ''))}
                  onFocus={() => setActiveField('cardHolderName')}
                  onBlur={() => setActiveField('')}
                  className="w-full border pl-10 px-4 py-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              {errors.cardHolderName && <p className="text-red-500 text-sm mt-1 animate-shake">{errors.cardHolderName}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
              <div className="relative">
                <Image 
                  src={cardType === "Visa" ? "/visa.svg" : 
                       cardType === "MasterCard" ? "/mastercard.svg" :
                       cardType === "American Express" ? "/amex.svg" :
                       "/card.svg"}
                  alt="Card" 
                  width={20} 
                  height={20} 
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-opacity duration-300
                             ${activeField === 'cardNumber' ? 'opacity-100' : 'opacity-50'}`}
                />
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                    setCardNumber(value);
                    detectCardType(value);
                  }}
                  onFocus={() => setActiveField('cardNumber')}
                  onBlur={() => setActiveField('')}
                  className="w-full border pl-10 px-4 py-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent transition-all duration-300"
                  required
                  maxLength={16}
                />
                {cardType && cardType !== "Unknown" && (
                  <Image 
                    src={cardType === "Visa" ? "/visa.svg" : 
                         cardType === "MasterCard" ? "/mastercard.svg" :
                         "/amex.svg"}
                    alt={cardType}
                    width={32}
                    height={20}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-opacity duration-300"
                  />
                )}
              </div>
              {errors.cardNumber && <p className="text-red-500 text-sm mt-1 animate-shake">{errors.cardNumber}</p>}
              {cardType && <p className="mt-2 text-sm text-gray-500 animate-fadeIn">Card Type: {cardType}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
              <div className="relative">
                <Image src="/cvv.svg" alt="CVV" width={20} height={20} 
                       className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300
                                 ${activeField === 'cvv' ? 'opacity-100' : 'opacity-50'}`} />
                <input
                  type="password"
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  onFocus={() => setActiveField('cvv')}
                  onBlur={() => setActiveField('')}
                  className="w-full border pl-10 px-4 py-3 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent transition-all duration-300"
                  required
                  maxLength={4}
                />
              </div>
              {errors.cvv && <p className="text-red-500 text-sm mt-1 animate-shake">{errors.cvv}</p>}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium
                          transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95
                          ${isProcessing ? "opacity-75 cursor-wait" : ""}`}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  "Complete Purchase"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
