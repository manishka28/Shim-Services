import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import ServiceProviderOrders from "../Components/ServiceProviderOrders";
import SalaryOfSP from "../Components/SalaryOfSP";

const Profile = () => {
  const { currentUser } = useAuth();
  const isServiceProvider = currentUser?.is_SP === 1;
  const [services, setServices] = useState([]);
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");

  const fullName = currentUser?.U_Name || "User";
  const email = currentUser?.U_Email || "user@example.com";

  // Fetch services for the service provider
  useEffect(() => {
    if (isServiceProvider) {
      const fetchServices = async () => {
        try {
          const response = await axios.get(`http://localhost:4002/sp_services/${email}`);
          setServices(response.data);
        } catch (error) {
          console.error("Error fetching services:", error);
        }
      };
      fetchServices();

      // Fetch city and mobile for the service provider
      const fetchCityAndMobile = async () => {
        try {
          const response = await axios.get(`http://localhost:4002/sp_city_mobile/${email}`);
          if (response.data) {
            setCity(response.data.CityName || "Not Available");
            setMobile(response.data.SP_Phone || "Not Available");
          }
        } catch (error) {
          console.error("Error fetching city and mobile:", error);
        }
      };
      fetchCityAndMobile();
    }
  }, [isServiceProvider, email]);

  return (
    <div className="flex justify-between p-6 bg-gray-100 min-h-screen">
      <div className="w-1/3 bg-white p-6 rounded-lg shadow-md">
        <div className="text-center">
          <div className="rounded-full w-32 h-32 bg-blue-500 flex items-center justify-center mx-auto text-white text-4xl">
            {fullName.split(" ").map((word) => word[0]).join("") || "U"}
          </div>
          <h2 className="text-2xl font-bold mt-4">{fullName}</h2>
          <p className="text-gray-500">{email}</p>
        </div>
        <div className="mt-6 space-y-4">
          <div className="flex items-center">
            <i className="fas fa-map-marker-alt text-gray-600"></i>
            <p className="ml-2">{city}</p>
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-phone-alt text-gray-600"></i>
            <p className="ml-2">{mobile}</p>
          </div>
          <button className="bg-gray-200 text-black py-2 px-4 rounded-md mt-4 hover:bg-gray-300">
            <i className="fas fa-pencil-alt mr-2"></i>Edit
          </button>
        </div>

        {/* Service Display for Service Provider */}
        {isServiceProvider && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <i className="fas fa-cogs text-blue-500"></i>
            <span>Services Offered</span>
          </h3>
          <div className="space-y-2">
            {services.length > 0 ? (
              services.map((service) => (
                <div key={service.Service_ID} className="flex items-center space-x-2 p-4 bg-gray-100 rounded-md shadow-md">
                  <i className="fas fa-check-circle text-green-500"></i>
                  <span className="font-semibold">{service.Service_Name}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No services available.</p>
            )}
          </div>

          {/* Salary Component */}
          <SalaryOfSP SP_Email={email} />
        </div>
      )}
      </div>

      {isServiceProvider ? (
        <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
          <ServiceProviderOrders SPEmail={email} />
        </div>
      ) : (
        <div className="w-2/3 flex items-center justify-center bg-white p-6 rounded-lg shadow-md">
          <img
            src="https://www.svgrepo.com/show/259579/search.svg"
            alt="Profile"
            className="m-4 p-4 h-full w-96 mx-auto"
          />
          <button className="bg-green-600 text-white py-2 px-6 rounded-lg">
            Explore Services
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
