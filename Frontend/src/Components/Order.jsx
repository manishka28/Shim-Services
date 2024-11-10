import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import CancelModal from './CancelModal';

function Order({ order, onHelp, onCancel, payNow }) {
  console.log("order", order);
  console.log("paynow", payNow);

  const navigate = useNavigate(); // Initialize navigate hook for routing

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false); // State for Cancel Modal
  const [orderToCancel, setOrderToCancel] = useState(null);

  const { 
    Book_ID, SP_Email, U_Email, Book_Status, Service_Name, 
    Service_Category, Appointment_Date, Book_HouseNo, Book_Area, Book_City, 
    Book_State 
  } = order;

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
    setIsCancelModalOpen(true); // Open cancel modal
  };

  const confirmCancel = async () => {
    try {
      await axios.delete(`http://localhost:4002/bookings/${orderToCancel}`);
      setIsCancelModalOpen(false); // Close cancel modal after confirming
      onCancel(orderToCancel);
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  const handlePayNow = (orderId) => {
    navigate('/payment', { state: { bookId: Book_ID } });  // Pass bookId in state
  };

  return (
    <>
      <div className="bg-gray-100 shadow-md rounded-lg p-6 mb-4">
        <h3 className="text-lg font-semibold mb-2">Order ID: {Book_ID}</h3>
        <p className="text-gray-700"><strong>Customer:</strong> {U_Email}</p>
        <p className="text-gray-700"><strong>Service:</strong> {Service_Name}</p>
        <p className="text-gray-700"><strong>Category:</strong> {Service_Category}</p>
        <p className="text-gray-700"><strong>Address:</strong> {Book_HouseNo}, {Book_Area}, {Book_City}, {Book_State}</p>
        <p className="text-gray-700"><strong>Appointment Date:</strong> {formattedDate}</p>
        {SP_Email && (
          <p className="text-gray-700"><strong>Service Provider:</strong> {SP_Email}</p>
        )}
        <p className={`font-bold ${statusColorClass}`}>
          Status: {Book_Status}
        </p>

        {(Book_Status === 'Pending' || Book_Status === 'Scheduled' && !payNow) && (
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
            onClick={() => handlePayNow(Book_ID)}  // Navigate to the payment page with bookId in state
          >
            Pay Now
          </button>
        )}
      </div>

      {/* Cancel Modal */}
      <CancelModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}  // Close cancel modal
        onConfirm={confirmCancel}
        message="Are you sure you want to cancel this order?"
      />
    </>
  );
}

export default Order;
