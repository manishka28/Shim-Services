import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewSp = () => {
  const [showOrders, setShowOrders] = useState(true); // State to toggle between Order and Service tables
  const [serviceProviderData, setServiceProviderData] = useState(null); // State to store Service Provider data
  const [orders, setOrders] = useState([]); // State to store Orders data
  const { email } = useParams(); // Extract 'email' from the URL
  const [service, setServices]=useState([]);

  // Fetch Service Provider Data
  useEffect(() => {
    const fetchServiceProviderData = async () => {
      try {
        const response = await fetch(`http://localhost:4002/serviceProviders/${email}`);
        const data = await response.json();
        setServiceProviderData(data); // Store Service Provider Data
      } catch (error) {
        console.error("Error fetching service provider data:", error);
      }
    };

    fetchServiceProviderData();
  }, [email]);

  // Fetch Orders and Services Data
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersResponse = await fetch(`http://localhost:4002/allOrders/${email}`);
        const ordersData = await ordersResponse.json();
        // console.log("Orders Data:", ordersData); // Debug log
        setOrders(ordersData); // Store Orders Data
      } catch (error) {
        console.error("Error fetching orders/services data:", error);
      }
    };

    fetchOrders();
  }, [email]);


  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Fetch Orders
        const serviceResponse = await fetch(`http://localhost:4002/SPServices/${email}`);
        const serviceData = await serviceResponse.json();
        setServices(serviceData); 
      } catch (error) {
        console.error("Error fetching orders/services data:", error);
      }
    };

    fetchServices();
  }, [email]);


  if (!serviceProviderData) {
    return <div>Loading...</div>; // Show loading while data is being fetched
  }

  // Function to get initials
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Profile Section */}
      <aside className="w-1/3 bg-white p-6 shadow-lg">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-yellow-500 text-white flex items-center justify-center text-2xl font-semibold">
            {getInitials(serviceProviderData.SP_Name || "SP")}
          </div>
          <h2 className="mt-4 text-2xl font-semibold">{serviceProviderData.SP_Email}</h2>
          <span className="text-m text-gray-500">Service Provider</span>
          <div>{serviceProviderData.Service_Name || "No data available"}</div>

        </div>
        <div className="mt-8 space-y-2">
          <div className="flex items-center justify-between">
           <p>Language Spoken</p> <i className="fas fa-language text-xl  text-gray-500"></i>

            <span className="font-semibold">{serviceProviderData.LanguageSpoken}</span>
           
          </div>
          <div>experience: {serviceProviderData.Service_Experience}</div>
        </div>
        <div className="mt-8">
          <h3 className="font-semibold mb-4">Details</h3>
          <hr></hr>
          <ul className="space-y-2 text-sm">
            <li className="py-1" >
              <i className="fas fa-envelope text-2xl  text-gray-500 mr-2"></i>
              <strong  >Email:</strong> {serviceProviderData.SP_Email}
            </li>
            <li className="py-1">
              <i className="fas fa-map-pin text-2xl text-gray-500 mr-2"></i>
              <strong>PIN:</strong> {serviceProviderData.SP_PIN}
            </li>
            <li className="py-1">
              <i className="fas fa-city text-2xl text-gray-500 mr-2"></i>
              <strong>City:</strong> {serviceProviderData.CityName}
            </li>
            <li className="py-1">
              <i className="fas fa-flag text-2xl text-gray-500 mr-2"></i>
              <strong>Country:</strong> {serviceProviderData.Country}
            </li>
            {/* Add more details as needed */}
          </ul>
        </div>
      </aside>

      {/* Right Content Section */}
      <main className="flex-1 p-6">
      <header className="flex justify-between items-center mb-6">
  <h2 className="text-xl font-semibold">Service Provider Activity</h2>
  <div className="flex items-center space-x-2">
    <span className={`text-sm font-medium ${showOrders ? "text-green-500" : "text-gray-500"}`}>
      Order Placed
    </span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={!showOrders}
        onChange={() => setShowOrders((prev) => !prev)}
        className="sr-only peer"
      />
      <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors duration-300">
        <div className="w-4 h-4 bg-white rounded-full transform transition-transform duration-300 peer-checked:translate-x-5"></div>
      </div>
    </label>
    <span className={`text-sm font-medium ${!showOrders ? "text-green-500" : "text-gray-500"}`}>
      Service Provided
    </span>
  </div>
</header>


        {/* Orders Table */}
        {showOrders ? (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Orders Placed</h3>
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="pb-2">Book ID</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Booked On</th>
                  <th className="pb-2">Service Name</th>
                  <th className="pb-2">Service Category</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    
                    <tr
                      key={order.Book_ID}
                      className={`${index % 2 === 0 ? "bg-slate-200" : "bg-white"} border-t`}
                    >
                      <td className="py-2 px-2">{order.Book_ID}</td>
                      <td className="px-2">{order.Book_Status}</td>
                      <td className="px-2">{new Date(order.Book_Date).toLocaleDateString()}</td>
                      <td className="px-2">{order.Service_Name}</td>
                      <td className="px-2">{order.Service_Category}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No orders available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          // Service Provided Table
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Service Provided</h3>
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                <th className="pb-2">Book ID</th>
                  {/* <th className="pb-2">Service Name</th> */}
                  <th className="pb-2">Category</th>
                  <th className="pb-2">Customer Name</th>
                  <th className="pb-2">Appointment Date</th>
                  <th className="pb-2">Service Status</th>
                  <th className="pb-2">Customer Phone</th>
                </tr>
              </thead>
              <tbody>
                {service.length>0?( 
                service.map((service, index) => (
                  <tr
                    key={service.Book_ID}
                    className={`${index % 2 === 0 ? "bg-slate-200" : "bg-white"} border-t`}
                  >
                    <td className="py-2 px-2">{service.Book_ID}</td>
                      {/* <td className="px-2">{service.Service_Name}</td> */}
                      <td className="px-2">{service.Service_Category}</td>
                      <td className="px-2">{service.Customer_Name}</td>
                      <td className="px-2">{new Date(service.Appointment_Date).toLocaleDateString()}</td>
                      <td className="px-2">{service.Book_Status}</td>
                      <td className="px-2">{service.Customer_Phone}</td>
                  </tr>
                ))
              ):(  
                <tr>
                <td colSpan="5" className="text-center py-4">
                  No Services provided available
                </td>
              </tr> 
              )
                }
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewSp;



















