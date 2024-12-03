import axios from 'axios';
import React, { useState } from 'react';

function PaymentBySP({ amount, onClose, onPaymentSuccess }) {
  const [responseId, setResponseId] = useState("");
  const [responseState, setResponseState] = useState([]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createRazorpayOrder = (amount) => {
    const data = JSON.stringify({ amount: amount * 100, currency: "INR" });
    const config = {
      method: "post",
      url: "http://localhost:4002/orders",
      headers: { 'Content-type': 'application/json' },
      data: data
    };

    axios.request(config)
      .then((response) => {
        // console.log("Order created:", response.data);
        handleRazorPayScreen(response.data.amount);
      })
      .catch((error) => {
        console.error("Error at create order:", error);
      });
  };

  const handleRazorPayScreen = async (amount) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert('Failed to load Razorpay SDK');
      return;
    }

    const options = {
      key: "rzp_test_iDWZYaECE3rES2",
      amount: amount,
      currency: "INR",
      name: "ShimServices",
      description: "Payment to ShimServices",
      handler: function(response) {
        setResponseId(response.razorpay_payment_id);
        onClose(); // Close the modal on successful payment
        onPaymentSuccess(response.razorpay_payment_id); // Call parent callback with payment ID
      },
      prefill: {
        name: "Shim Services",
        email: "shimservices5@gmail.com"
      },
      theme: {
        color: "#F4C430"
      },
      method: {
        netbanking: true,
        card: true,
        upi: true,
        wallet: true,
        paylater: true
      },
      image: "/img"
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 " onClick={onClose}>
  <div className="bg-white p-6 rounded-lg shadow-lg w-6xl  text-center"> {/* Increased width here */}
    <div className="flex justify-center mb-4 w-7xl">
  
      <div
        className=" p-8 rounded-lg shadow-lg w-96 relative" // Increased size of the modal
        onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition duration-200 text-xl"
          onClick={onClose}
        >
          <i className="fas fa-times"></i>
        </button>
    
        {/* Modal Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <i className="fas fa-credit-card text-blue-600 mr-2"></i>
          Payment Details
        </h1>
    
        {/* Payment Button */}
        <button
          className="bg-green-600 text-white py-3 px-6 rounded-md w-full flex items-center justify-center space-x-2 hover:bg-green-700 transition duration-200"
          onClick={() => createRazorpayOrder(amount)}
        >
          <i className="fas fa-money-check-alt"></i>
          <span>Pay {amount} INR</span>
        </button>
    
        {/* Optional Payment Details */}
        {responseId && (
          <p className="mt-4 text-gray-600">
            <i className="fas fa-receipt mr-2 text-blue-600"></i>
            <strong>Payment ID:</strong> {responseId}
          </p>
        )}
      </div>
    </div>
  </div>
</div>


  );
}

export default PaymentBySP;
