import React, { useState, useEffect } from "react";
import axios from 'axios';
import BillModal from "./BillModal";

import { io } from "socket.io-client";

// Initialize Socket.IO connection
const socket = io("http://localhost:4002"); // Use your backend server URL


const ServiceProviderOrders = ({ SPEmail,SPCity }) => {
  const [incomingOrders, setIncomingOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [completedOrders,setCompletedOrders]=useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isCannotGenerateBillModalOpen, setIsCannotGenerateBillModalOpen] = useState(false);
  console.log("SP City",SPCity);
  

  const fetchPaymentMode = async (bookId) => {
    try {
      const response = await axios.get(`http://localhost:4002/api/payment-mode/${bookId}`);
      // console.log("Response from API:", response);  // Log response to check the structure
      if (response && response.data && response.data.paymentMode) {
        return response.data.paymentMode;  // Adjust this based on actual response structure
      } else {
        console.error("Payment mode not found in the response.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching payment mode:", error);
      return "Default";
    }
  };
  
  const handleCompletionStatusChangeonCheckbox = async (orderId) => {
    setAcceptedOrders((prevState) =>
      prevState.map(order =>
        order.Book_ID === orderId ? { ...order, isCompleted: !order.isCompleted } : order
      )
    );

  try {
    // Send the updated completion status to the backend
    const updatedOrder = acceptedOrders.find(order => order.Book_ID === orderId);
    await axios.put(`http://localhost:4002/booking/completion/${orderId}`, {
      isCompleted: !updatedOrder.isCompleted,
    });

    // Fetch the bill for the completed order
    fetchBillForOrder(orderId);

  } catch (error) {
    console.error("Error updating completion status:", error);
  }
};

const fetchBillForOrder = async (orderId) => {
  try {
    const response = await axios.get(`http://localhost:4002/bills/${orderId}`);
    if (response.status === 200) {
      // console.log("Bill details fetched successfully", response.data);
      // console.log("Data:",response.data.Bill_Date);
      // console.log("Email",response.data.SP_Email);
      // console.log("amount ",response.data.Total_Cost);
      
      
      // You can further process the bill details if necessary
    }
    // Call the /salary API with SP_Email, Total_Cost, Month, and Year
        try {
          const billDate = new Date(response.data.Bill_Date);
          const month = billDate.getMonth()+1;

          const year = billDate.getFullYear();
          const amount_to_pay=(response.data.Total_Cost*10)/100;

          const salaryData = {
            SP_Email: response.data.SP_Email,
            month: month,
            year: year,
            amount_to_pay:amount_to_pay
            
          };

          const salaryResponse = await axios.post(
            "http://localhost:4002/salary",  // Your API URL
            salaryData
          );
          // console.log("Salary API response:", salaryResponse.data);
        } catch (error) {
          console.error("Error calling /salary API:", error);
        }
  } catch (error) {
    console.error("Error fetching bill details:", error);
  }
};


 
  
useEffect(() => {
  const fetchOrders = async () => {
    try {
      const responseServiceName = await axios.get(`http://localhost:4002/services/${SPEmail}`);
      const serviceName = responseServiceName.data.services.map(service => service.Service_Name);

      // Attempt to fetch incoming orders
      try {
        const response = await axios.get(`http://localhost:4002/available-bookings/${serviceName}`);
        console.log(response);
        
        const incoming = response.data.filter(order => order.Book_Status === 'Pending' && order.Book_City===SPCity && order.U_Email!==SPEmail );
        console.log();
        
        setIncomingOrders(incoming);
      } catch (incomingError) {
        if (incomingError.response && incomingError.response.status === 404) {
          console.log("No incoming orders.");
          setIncomingOrders([]);
        } else {
          console.error("Error fetching incoming orders:", incomingError);
        }
      }

      // Fetch accepted orders and add payment mode
      // Fetch accepted orders and add payment mode
      const acceptedResponse = await axios.get(`http://localhost:4002/bookings/sp/${SPEmail}`);
      const accepted = acceptedResponse.data.filter(order => order.Book_Status === 'Scheduled');
      const updatedAcceptedOrders = await fetchBillsForOrders(accepted);


      const ordersWithPaymentMode = await Promise.all(
        updatedAcceptedOrders.map(async (order) => {
          const paymentMode = await fetchPaymentMode(order.Book_ID);
          return { ...order, paymentMode }; // Add paymentMode to each order
          // return { ...order, paymentMode }; // Add paymentMode to each order
        })
      );

      setAcceptedOrders(ordersWithPaymentMode); // Use ordersWithPaymentMode here

      const completedResponse = await axios.get(`http://localhost:4002/bookings/sp/${SPEmail}`);
      const completed = completedResponse.data.filter(order => order.Book_Status === 'Completed');
      setCompletedOrders(completed);

      // setAcceptedOrders(ordersWithPaymentMode); // Use ordersWithPaymentMode here
    } catch (error) {
      console.error("Error fetching services or accepted orders:", error);
    }
  };

  fetchOrders();





  
}, [SPEmail,SPCity]);



  //       const acceptedResponse = await axios.get(`http://localhost:4002/bookings/sp/${SPEmail}`);
  //       const accepted = acceptedResponse.data.filter(order => order.Book_Status === 'Scheduled');
  //       const updatedAcceptedOrders = await fetchBillsForOrders(accepted);
        
      
        
  //       setAcceptedOrders(ordersWithPaymentMode);
  //     } catch (error) {
  //       console.error("Error fetching services or orders:", error);
  //     }
  //   };
    
  //   fetchOrders();
  // }, [SPEmail]);

  const handleAccept = async (orderId) => {
    try {
      const orderToAccept = incomingOrders.find(order => order.Book_ID === orderId);
      
      // Check if the order already has an SP_Email
      if (orderToAccept.SP_Email) {
        alert("This order has already been accepted by another service provider.");
        return;
      }
  
      const response = await axios.put(`http://localhost:4002/update-status/${orderId}`, {
        newStatus: 'Scheduled',
        SP_Email: SPEmail
      });
  
      if (response.status === 200) {
        const updatedOrder = { ...orderToAccept, Book_Status: 'Scheduled', billGenerated: false, isCompleted: false };
        setAcceptedOrders(prevState => {
          if (prevState.some(order => order.Book_ID === orderId)) return prevState;
          return [...prevState, updatedOrder];
        });
        setIncomingOrders(prevState => prevState.filter(order => order.Book_ID !== orderId));
      } else {
        throw new Error('Failed to update the order status');
      }
    } catch (error) {
      console.error("Error accepting order:", error);
      alert("An error occurred while accepting the order. Please try again.");
    }
  };
  
  

  const handleDecline = (orderId) => {
    setIncomingOrders((prevState) => prevState.filter(order => order.Book_ID !== orderId));
  };

  const handleGenerateBill = (order) => {
    const bookingDate = new Date(order.Appointment_Date);
    const currentDate = new Date();
  
    if (currentDate < bookingDate) {
      setIsCannotGenerateBillModalOpen(true);
      return;
    }
  
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleBillGenerated = (orderId) => {
    setAcceptedOrders((prevState) =>
      prevState.map(order =>
        order.Book_ID === orderId ? { ...order, billGenerated: true } : order
      )
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const closeCannotGenerateBillModal = () => {
    setIsCannotGenerateBillModalOpen(false);
  };

  const checkBillExistence = async (bookId) => {
    try {
      const response = await axios.get(`http://localhost:4002/bills/${bookId}`);
      return response.data ? true : false;
    } catch (error) {
      return false;
    }
  };

  const fetchBillsForOrders = async (orders) => {
    const updatedOrders = await Promise.all(
      orders.map(async (order) => {
        const billExists = await checkBillExistence(order.Book_ID);
        return { ...order, billGenerated: billExists, isCompleted: false };
      })
    );
    return updatedOrders;
  };

  return (
    <div className="w-full flex flex-col justify-center items-start p-6 bg-white rounded-lg shadow-md">
  {/* Top Section - Incoming and Accepted Orders */}
  <div className="flex w-full space-x-8">
    {/* Incoming Orders */}
    <div className="w-1/2">
      <h2 className="text-2xl font-bold mb-4">Incoming Orders</h2>
      <ul className="space-y-4 overflow-y-auto max-h-96"> {/* Add scroll if list is long */}
        {incomingOrders.length > 0 ? (
          incomingOrders.map((order) => (
            <li key={order.Book_ID} className="p-4 bg-gray-100 rounded-md shadow-md">
              <h3 className="text-lg font-bold">Booking ID: {order.Book_ID}</h3>
              <p>Customer: {order.U_Email}</p>
              <p>Service: {order.Service_Name}</p>
              <p>Service Category: {order.Service_Category}</p>
              <p>Location: {order.Book_Area}, {order.Book_City}</p>
              <p>Appointment Date: {new Date(order.Appointment_Date).toLocaleString()}</p>
              <p>Status: {order.Book_Status}</p>
              {order.Book_Status === "Pending" && (
                <div className="mt-2 flex space-x-4">
                  <button className="bg-green-500 text-white py-1 px-4 rounded-md" onClick={() => handleAccept(order.Book_ID)}>Accept</button>
                  <button className="bg-red-500 text-white py-1 px-4 rounded-md" onClick={() => handleDecline(order.Book_ID)}>Decline</button>
                </div>
              )}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No incoming orders.</p>
        )}
      </ul>
    </div>

    {/* Accepted Orders */}
    <div className="w-1/2">
      <h2 className="text-2xl font-bold mb-4">Accepted Orders</h2>
      <ul className="space-y-4 overflow-y-auto max-h-96"> {/* Add scroll if list is long */}
        {acceptedOrders.length > 0 ? (
          acceptedOrders.map((order) => (
            <li key={order.Book_ID} className="p-4 bg-gray-100 rounded-md shadow-md">
              <h3 className="text-lg font-bold">Booking ID: {order.Book_ID}</h3>
              <p>Customer: {order.U_Email}</p>
              <p>Service: {order.Service_Name}</p>
              <p>Service Category: {order.Service_Category}</p>
              <p>Location: {order.Book_Area}, {order.Book_City}</p>
              <p>Appointment Date: {new Date(order.Appointment_Date).toLocaleString()}</p>
              <p>Status: {order.Book_Status}</p>
              <div>
                {order.billGenerated ? (
                  <div>
                    <p className="text-gray-700">Payment Mode: {order.paymentMode}</p>
                    <p className="text-green-500">Bill has been generated.</p>

                    {order.paymentMode === "cash" && (
                      <label className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          checked={order.isCompleted}
                          onChange={() => handleCompletionStatusChangeonCheckbox(order.Book_ID)}
                        />
                        <span className="ml-2 text-gray-700">Mark as Completed</span>
                      </label>
                    )}
                  </div>
                ) : (
                  <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 mt-2 rounded-md" onClick={() => handleGenerateBill(order)}>Generate Bill</button>
                )}
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No accepted orders.</p>
        )}
      </ul>
    </div>
  </div>

  {/* Bottom Section - Completed Orders */}
  <div className="w-full mt-8">
    <h2 className="text-2xl font-bold mb-4">Completed Orders</h2>
    <ul className="space-y-4 overflow-y-auto max-h-96"> {/* Add scroll if list is long */}
      {completedOrders.length > 0 ? (
        completedOrders.map((order) => (
          <li key={order.Book_ID} className="p-4 bg-gray-100 rounded-md shadow-md">
            <h3 className="text-lg font-bold">Booking ID: {order.Book_ID}</h3>
            <p>Customer: {order.U_Email}</p>
            <p>Service: {order.Service_Name}</p>
            <p>Service Category: {order.Service_Category}</p>
            <p>Location: {order.Book_Area}, {order.Book_City}</p>
            <p>Appointment Date: {new Date(order.Appointment_Date).toLocaleString()}</p>
            <p>Status: {order.Book_Status}</p>
          </li>
        ))
      ) : (
        <p className="text-gray-500">No completed orders.</p>
      )}
    </ul>
  </div>

  {isCannotGenerateBillModalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
        <div className="flex justify-center mb-4">
          <svg
            className="w-12 h-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-800">Cannot Generate Bill</h2>
        <p className="text-gray-600 my-4">You cannot generate a bill before the booking date.</p>
        <button onClick={closeCannotGenerateBillModal} className="mt-4 px-4 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700">OK</button>
      </div>
    </div>
  )}

  {isModalOpen && <BillModal order={selectedOrder} onClose={closeModal} onBillGenerated={handleBillGenerated} />}
</div>

  );
};

export default ServiceProviderOrders;
