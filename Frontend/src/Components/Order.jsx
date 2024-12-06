import React, { useState } from 'react';  
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRupeeSign } from 'react-icons/fa'; // Import rupee sign icon
import CancelModal from './CancelModal';

function Order({ order, onHelp, onCancel, payNow }) {
  const navigate = useNavigate();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  // const [successMessage, setSuccessMessage] = useState(""); // Success message for this specific order
  // console.log("order",order);
  

  const { 
    Book_ID, SP_Email, U_Email, Book_Status, Service_Name, 
    Service_Category, Appointment_Date, Book_HouseNo, Book_Area, Book_City, 
    Book_State ,User_Name,SP_Name
  } = order;
  // console.log("user",User_Name);
  

  let statusColorClass = 'text-gray-500';
  if (Book_Status === 'Completed') {
    statusColorClass = 'text-black';
  } else if (Book_Status === 'Scheduled') {
    statusColorClass = 'text-green-500';
  } else if (Book_Status === 'Pending') {
    statusColorClass = 'text-orange-500';
  }

  const formattedDate = new Date(Appointment_Date).toLocaleDateString();

  const handleCancel = (orderId) => {
    setOrderToCancel(orderId);
    setIsCancelModalOpen(true);
  };

  const confirmCancel = async () => {
    try {
      await axios.delete(`http://localhost:4002/bookings/${orderToCancel}`);
      setIsCancelModalOpen(false);
      onCancel(orderToCancel);
      setSuccessMessage("Order canceled successfully!"); // Set success message for this order
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  const handlePayNow = () => {
    navigate('/payment', { state: { bookId: Book_ID } });
  };

  return (
    <>
      <div className="relative bg-gray-100 shadow-md rounded-lg p-6 mb-4 transform transition-all duration-500 hover:scale-105 hover:shadow-xl">
        {payNow && (
          <div className="absolute top-2 right-2 p-2 bg-green-500 rounded-full animate-pulse">
            <FaRupeeSign
              className="text-white"
              title="Pay Now"
              style={{ fontSize: '2rem' }}
            />
          </div>
        )}

        <h3 className="text-lg font-semibold mb-2">Order ID: {Book_ID}</h3>
        <p className="text-gray-700"><strong>Customer:</strong> {User_Name}</p>
        <p className="text-gray-700"><strong>Service:</strong> {Service_Name}</p>
        <p className="text-gray-700"><strong>Category:</strong> {Service_Category}</p>
        <p className="text-gray-700"><strong>Address:</strong> {Book_HouseNo}, {Book_Area}, {Book_City}, {Book_State}</p>
        <p className="text-gray-700"><strong>Appointment Date:</strong> {formattedDate}</p>
        {SP_Email && (
          <p className="text-gray-700"><strong>Service Provider:</strong> {SP_Name}</p>
        )}
        <p className={`font-bold ${statusColorClass}`}>
          Status: {Book_Status}
        </p>

        {/* {successMessage && (
          <div className="text-center text-green-500 font-semibold mb-4">
            {successMessage}
          </div>
        )} */}

        {(Book_Status === 'Pending' || (Book_Status === 'Scheduled' && !payNow)) && (
          <button
            onClick={() => handleCancel(Book_ID)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-4"
          >
            Cancel Order
          </button>
        )}

        {payNow && (
          <button
            className="bg-blue-500 text-white m-4 p-2 rounded mt-4"
            onClick={handlePayNow}
          >
            Pay Now
          </button>
        )}
      </div>

      <CancelModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={confirmCancel}
        message="Are you sure you want to cancel this order?"
      />
    </>
  );
}

export default Order;
