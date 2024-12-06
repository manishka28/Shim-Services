import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import axios from 'axios';

function Payment() {
  const location = useLocation(); // Access the location object
  const { bookId } = location.state || {};  // Get bookId from state
  const navigate = useNavigate();  // Use useNavigate hook for navigation
  // console.log("Book Id passed", bookId);
  
  const [responseId, setResponseId] = useState("");
  const [billDetails, setBillDetails] = useState({
    Bill_ID: '',
    Book_ID: '',
    Bill_Date: '',
    Bill_Mode: '',
    Labor_Entries: [],  // Empty array if no entries initially
    Total_Cost: 0,       // Default value of 0
  });
  
  const [paymentSuccessful, setPaymentSuccessful] = useState(false); // State to track payment success
  useEffect(() => {
    fetchBillDetails();  // Fetch bill details for the bookId
  }, [bookId]);

  // Log billDetails after it changes
  useEffect(() => {
    if (billDetails && billDetails.Book_ID) {
      // console.log("Updated Bill Details:", billDetails);
    }
  }, [billDetails]);

  // Function to load the Razorpay script
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Fetch the bill details based on the bookId
  const fetchBillDetails = async () => {
    if (bookId) {  // Fetch only when bookId exists
      try {
        const response = await axios.get(`http://localhost:4002/bills/${bookId}`);  // Endpoint to get the bill details
        // console.log("Response received:", response);
        
        setBillDetails(response.data);  // Set the fetched bill details in state
      } catch (error) {
        console.error("Error fetching bill details:", error);
      }
    }
  };

  // Function to create a Razorpay order
  // Function to create a Razorpay order or update book status directly if cost is zero
const createRazorpayOrder = async () => {
  if (billDetails.Total_Cost === 0) {
    try {
      // Directly update book status to 'Completed'
      // console.log("Total cost is zero. Skipping payment process.");
      
      const updateBookStatusResponse = await axios.put(
        `http://localhost:4002/bookStatusAfterPayment/${billDetails.Book_ID}`,  // Update status endpoint
        { newStatus: 'Completed' }
      );
      
      // console.log("Book status updated to completed (Total Cost = 0):", updateBookStatusResponse.data);

      // Navigate to a confirmation or success page if needed
      navigate('/orders');
    } catch (error) {
      console.error("Error updating book status for zero cost:", error);
    }
  } else {
    // Proceed with Razorpay order creation if cost is non-zero
    const data = JSON.stringify({ amount: billDetails.Total_Cost * 100, currency: "INR" });
    const config = {
      method: "post",
      url: "http://localhost:4002/orders", // Your backend URL to handle the order
      headers: { 'Content-type': 'application/json' },
      data: data,
    };

    try {
      const response = await axios.request(config);
      handleRazorPayScreen(response.data.amount);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  }
};


  // Function to handle Razorpay screen for payment
  // Function to handle Razorpay screen for payment
const handleRazorPayScreen = async (amount) => {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert('Failed to load Razorpay SDK');
    return;
  }

  const options = {
    key: "rzp_test_iDWZYaECE3rES2",  // Replace with your Razorpay key
    amount: amount,
    currency: "INR",
    name: "ShimServices",
    description: "Payment for Order",
    handler: async function (response) {
      setResponseId(response.razorpay_payment_id);
      // console.log("Payment Successful, Response:", response);
      setPaymentSuccessful(true);  // Mark payment as successful

      try {
        // Step 1: Update the bill with razorpay_payment_id
        const updateBillResponse = await axios.put(
          `http://localhost:4002/bills/${billDetails.Bill_ID}`,  // Update bill with razorpay_payment_id
          { razorpay_payment_id: response.razorpay_payment_id }
        );
        // console.log("Bill updated with Razorpay payment ID:", updateBillResponse.data);

        // Update billDetails with razorpay_payment_id for display
        setBillDetails((prevDetails) => ({
          ...prevDetails,
          razorpay_payment_id: response.razorpay_payment_id,
        }));
        // console.log("Updated Bill Details:", billDetails);

        // Step 2: Only update the book status if the bill update is successful
        try {
          // console.log("Book ID inside try", billDetails.Book_ID);
          const updateBookStatusResponse = await axios.put(
            `http://localhost:4002/bookStatusAfterPayment/${billDetails.Book_ID}`,  // Use Book_ID from the response
            { newStatus: 'Completed' }  // Update status to 'completed'
          );
          // console.log("Book status updated to completed:", updateBookStatusResponse.data);
        } catch (error) {
          console.error("Error updating book status:", error);
        }

// Step 3: Call the /salary API with SP_Email, Total_Cost, Month, and Year
        try {
          const billDate = new Date(billDetails.Bill_Date);
          const month = billDate.getMonth()+1;

          const year = billDate.getFullYear();
          const Salary=(billDetails.Total_Cost*90)/100;
          const salaryData = {
            SP_Email: billDetails.SP_Email,
            Salary:Salary ,
            month: month,
            year: year
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
        console.error("Error updating bill:", error);
      }
    },
    theme: {
      color: "#F4C430"
    }        
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};

  
  
  // Fetch bill details when the component mounts or bookId changes
  

  // Function to print the bill
  const printBill = () => {
    window.print(); // This will open the browser's print dialog
  };

  // Function to navigate back to the home page
  const navigateToHome = () => {
    navigate('/'); // Navigate to the home page using useNavigate
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Payment Page</h1>
      <h2 className="text-xl font-semibold mb-6 text-center text-gray-700">Payment for Booking ID: {bookId}</h2>
      
      {/* Display the bill details if available */}
      {billDetails ? (
        <div className="mb-6 p-6 bg-white rounded-lg shadow-lg space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">Bill ID:</p>
            <p className="text-gray-700">{billDetails.Bill_ID}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">Booking ID:</p>
            <p className="text-gray-700">{billDetails.Book_ID}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">Bill Date:</p>
            <p className="text-gray-700">{new Date(billDetails.Bill_Date).toLocaleString()}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">Appointment Date:</p>
            <p className="text-gray-700">{new Date(billDetails.Book_Date).toLocaleString()}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">Customer Name:</p>
            <p className="text-gray-700">{billDetails.Customer_Name}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">Customer Phone Number:</p>
            <p className="text-gray-700">{billDetails.Customer_Phone}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">SP_Email:</p>
            <p className="text-gray-700">{billDetails.SP_Email}</p>
          </div>



          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">Bill Mode:</p>
            <p className="text-gray-700">{billDetails.Bill_Mode}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">Address:</p>
            <p className="text-gray-700">{billDetails.Book_HouseNo},{billDetails.Book_Area},{billDetails.Book_City},{billDetails.Book_City_PIN},{billDetails.Book_State}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">Service Name:</p>
            <p className="text-gray-700">{billDetails.Service_Name}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">Service Category:</p>
            <p className="text-gray-700">{billDetails.Service_Category}</p>
          </div>


          {/* Labor Entries */}
          <div className="mt-4">
            <h3 className="text-xl font-medium mb-2">Labor Entries:</h3>
            <ul className="space-y-4">
              {billDetails.Labor_Entries.map((entry, index) => (
                <li key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  <div className="flex justify-between">
                    <p className="text-gray-700 font-medium">Description:</p>
                    <p className="text-gray-700">{entry.description}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-700 font-medium">Hours:</p>
                    <p className="text-gray-700">{entry.hours}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-700 font-medium">Rate:</p>
                    <p className="text-gray-700">₹{entry.rate}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-700 font-medium">Total:</p>
                    <p className="text-gray-700">₹{entry.total}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Total Cost */}
          <div className="flex justify-between items-center mt-4 font-semibold">
            <p className="text-lg">Total Cost:</p>
            <p className="text-gray-700 text-xl">₹{billDetails.Total_Cost}</p>
          </div>

          {/* Razorpay Payment ID */}
          {paymentSuccessful && billDetails.razorpay_payment_id && (
            <div className="mt-4">
              <p className="text-lg font-medium">Razorpay Payment ID:</p>
              <p className="text-gray-700">{billDetails.razorpay_payment_id}</p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-700">Loading bill details...</p>
      )}

      {/* Display Pay Now button if payment hasn't been successful */}
      {!paymentSuccessful && (
        <button
          onClick={createRazorpayOrder}
          className="bg-blue-500 text-white p-3 rounded-lg mt-6 w-full text-xl hover:bg-blue-600 transition-all"
        >
          Pay Now
        </button>
      )}

      {/* Print Bill button will only show after payment is successful */}
      {paymentSuccessful && (
        <button
          onClick={printBill}
          className="bg-green-500 text-white p-3 rounded-lg mt-6 w-full text-xl hover:bg-green-600 transition-all"
        >
          Print Bill
        </button>
      )}

      {/* Back to Home button */}
      <button
        onClick={navigateToHome}
        className="bg-gray-500 text-white p-3 rounded-lg mt-6 w-full text-xl hover:bg-gray-600 transition-all"
      >
        Back to Home
      </button>
    </div>
  );
}

export default Payment;
