import React, { useState, useEffect } from 'react';   
import Order from '../Components/Order';
import { useAuth } from '../context/AuthContext';
import { FaTasks, FaCalendarCheck, FaCheckCircle, FaEllipsisV, FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [bills, setBills] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(null);  // Track the dropdown for a single order
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showRateForm, setShowRateForm] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [rating, setRating] = useState(0); // Store the rating as a float
  const [feedback, setFeedback] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [reportType, setReportType] = useState('');
  const { currentUser } = useAuth();
  // const [successMessage, setSuccessMessage] = useState(''); // Success message state
  const location = useLocation();
  const { selectedStatus } = location.state || {};

  const reportTypes = [
    'Service Delay',
    'Quality Issue',
    'Damage',
    'Other',
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) {
        console.error('No user is logged in.');
        return;
      }

      try {
        const response = await fetch('http://localhost:4002/bookings');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const filteredOrders = data.filter(order => order.U_Email === currentUser.U_Email);
        console.log("Filtered",data);
        

        const statusMap = {
          'Pending': 'Pending',
          'Confirmed': 'Scheduled',
          'Completed': 'Completed'
        };

        const mappedOrders = filteredOrders.map(order => ({
          ...order,
          status: statusMap[order.Book_Status] || order.Book_Status,
        }));

        setOrders(mappedOrders);
        await fetchBills(mappedOrders);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, [currentUser]);

  const fetchBills = async (orders) => {
    let billData = {};
    for (const order of orders) {
      if (order.status === 'Scheduled') {
        try {
          const billResponse = await fetch(`http://localhost:4002/bills/${order.Book_ID}`);
          if (billResponse.ok) {
            const bill = await billResponse.json();
            billData[order.Book_ID] = bill;
          } else if (billResponse.status === 404) {
            console.warn(`Bill not found for Book_ID: ${order.Book_ID}`);
          } else {
            console.error(`Failed to fetch bill for Book_ID ${order.Book_ID}: Status ${billResponse.status}`);
          }
        } catch (error) {
          console.error(`Error fetching bill for Book_ID ${order.Book_ID}:`, error);
        }
      }
    }
    setBills(billData);
  };

  const handleCancel = (id) => {
    setOrders(prevOrders => prevOrders.filter(order => order.Book_ID !== id));
    alert(`Order ${id} has been canceled.`);
  };

  const handleGetHelp = (id) => {
    alert(`Help has been requested for Order ${id}.`);
  };

  const handlePayNow = (orderId) => {
    const bill = bills[orderId];
    if (bill && bill.Bill_Mode === 'online') {
      alert(`Redirecting to payment gateway for order ${orderId}`);
    } else {
      alert(`No online payment available for order ${orderId}`);
    }
  };

  const toggleDropdown = (orderId) => setDropdownOpen(dropdownOpen === orderId ? null : orderId);  // Toggle dropdown for specific order

  const handleRateClick = (order) => {
    setSelectedOrder(order);
    setShowRateForm(true);
  };

  const handleReportClick = (order) => {
    setSelectedOrder(order);
    setShowReportForm(true);
  };

  const closeForm = () => {
    setShowRateForm(false);
    setShowReportForm(false);
    setSelectedOrder(null);
    setRating(0);
    setFeedback('');
    setReportDescription('');
    setReportType('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !feedback) {
      alert('Please provide a rating and feedback');
      return;
    }

    try {
      const response = await fetch('http://localhost:4002/api/insert-rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Book_Id: selectedOrder?.Book_ID,
          Rating: rating,
          Review: feedback,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Rating submitted:', result);

      // Close the form on success
      // setSuccessMessage('Rating submitted successfully'); // Set success message
      // setTimeout(() => setSuccessMessage(''), 3000); 
      closeForm();
      setDropdownOpen(false);
      
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('There was an error submitting your rating. Please try again.');
    }
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();

    if (!reportDescription || !reportType) {
      alert('Please provide report description and type');
      return;
    }

    try {
      const response = await fetch('http://localhost:4002/api/insert-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Book_Id: selectedOrder?.Book_ID,
          Report_Description: reportDescription,
          Report_Type: reportType,
          Report_Status: 'Pending', // All reports are pending by default
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Report submitted:', result);

      // Close the form after successful submission
      // setSuccessMessage('Report submitted successfully'); // Set success message
      // setTimeout(() => setSuccessMessage(''), 3000);
      closeForm();
      setDropdownOpen(false);
      
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('There was an error submitting your report. Please try again.');
    }
  };

  // Render stars based on the rating state
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          size={30}  // Increased size of the star
          color={i <= rating ? '#FFD700' : '#e4e5e9'}  // Gold for selected, grey for unselected
          onClick={() => setRating(i)}  // Set rating on click
          style={{ cursor: 'pointer', marginRight: 5 }}  // Add space between stars
        />
      );
    }
    return stars;
  };


  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl text-center font-bold mb-8">{selectedStatus} Orders</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.filter(order => order.status === selectedStatus).length > 0 ? (
          selectedStatus === 'Scheduled' ? (
            orders
              .filter(order => order.status === 'Scheduled')
              .sort((a, b) => {
                const hasOnlinePaymentA = bills[a.Book_ID]?.Bill_Mode === 'online' ? 0 : 1;
                const hasOnlinePaymentB = bills[b.Book_ID]?.Bill_Mode === 'online' ? 0 : 1;
                return hasOnlinePaymentA - hasOnlinePaymentB;
              })
              .map(order => (
                <Order
                  key={order.Book_ID}
                  order={order}
                  onCancel={handleCancel}
                  onHelp={handleGetHelp}
                  onPayNow={handlePayNow}
                  payNow={bills[order.Book_ID]?.Bill_Mode === 'online'}
                />
              ))
          ) : (
            orders
              .filter(order => order.status === selectedStatus)
              .map(order => (
                <div key={order.Book_ID} className="relative">
                  <Order
                    order={order}
                    onCancel={handleCancel}
                    onHelp={handleGetHelp}
                    onPayNow={handlePayNow}
                    payNow={bills[order.Book_ID]?.Bill_Mode === 'online'}
                  />
                  {order.status === 'Completed' && (
                    <div className="absolute top-2 right-2">
                      <FaEllipsisV onClick={() => toggleDropdown(order.Book_ID)} />
                      {dropdownOpen === order.Book_ID && (
                        <div className="absolute  right-0 mt-1 p-2 bg-white border border-gray-300 shadow-lg z-10 transform -translate-x-1">
                          <button
                            className="block text-left p-2 w-40"
                            onClick={() => handleRateClick(order)}
                          >
                            Rate
                          </button>
                          <button
                            className="block text-left p-2 w-40"
                            onClick={() => handleReportClick(order)}
                          >
                            Report
                          </button>
                        </div>
                        
                      )}
                    </div>
                  )}
                </div>
              ))
          )
        ) : (
          <p>No orders found for the selected status.</p>
        )}
      </div>

      {showRateForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-md shadow-md w-96"
          >
            <h2 className="text-2xl font-bold mb-4">Rate the Service</h2>
            <div className="mb-4">
              <div className="flex">{renderStars()}</div>
            </div>
            <div className="mb-4">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Leave your feedback"
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={closeForm}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      {showReportForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <form
            onSubmit={handleSubmitReport}
            className="bg-white p-6 rounded-md shadow-md w-96"
          >
            <h2 className="text-2xl font-bold mb-4">Report an Issue</h2>
            <div className="mb-4">
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Report Type</option>
                {reportTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <textarea
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                placeholder="Describe the issue"
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={closeForm}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-md">
                Submit
              </button>
            </div>
            {/* {successMessage && (
        <div className="text-center text-green-500 font-semibold mb-4">
          {successMessage}
        </div>
      )} */}
          </form>
        </div>
      )}
    </div>
  );
}

export default Orders;