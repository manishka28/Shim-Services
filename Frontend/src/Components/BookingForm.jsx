import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingForm = ({ isOpen, onClose, serviceName, service }) => {
  const [cities, setCities] = useState([]);
  const [bookingDate, setBookingDate] = useState('');
  const [errorMessages, setErrorMessages] = useState({});
 
  const [formData, setFormData] = useState({
    bookStatus: 'Pending',
    serviceName: serviceName,
    serviceCategory: service ? service.title : '',
    bookHouseNo: '',
    bookArea: '',
    bookCity: '',
    bookCityPin: '',
    bookState: '',
    customerName: '',
    customerPhone: '',
    
  });
  const [confirmationDialog, setConfirmationDialog] = useState(false);

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:4002/cities');
        const sortedCities = response.data.sort((a, b) => a.City_Name.localeCompare(b.City_Name));
        setCities(sortedCities);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, []);

  const validateFields = () => {
    const { customerPhone } = formData;
    let errors = {};
    //Phone number
    if (!customerPhone) {
      errors.customerPhone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(customerPhone)) {
      errors.customerPhone = 'Phone number must be 10 digits';
    }

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

   

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'bookCity') {
      const selectedCity = cities.find(city => city.City_Name === value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        bookCityPin: selectedCity ? selectedCity.City_PIN : '', // Set city PIN based on selected city
        bookState: selectedCity ? selectedCity.City_State : '',
       
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Function to format date in dd/mm/yyyy format 
  //changes for time - shruti
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = '00'; // Set minutes as 00 by default
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

 
  


  const handleDateChange = (event) => {
    const dateValue = event.target.value;
    setBookingDate(dateValue); // Save in yyyy-mm-dd format for input
  };

  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validateFields()){
      return;
    }
    
    const formDataToSend = {
      U_Email: currentUser?.U_Email || '',
      Book_Status: formData.bookStatus,
      Service_Name: serviceName,
      Service_Category: formData.serviceCategory,
      Book_HouseNo: formData.bookHouseNo,
      Book_Area: formData.bookArea,
      Book_City: formData.bookCity,
      Book_City_PIN: formData.bookCityPin,
      Book_State: formData.bookState,
      Appointment_Date: bookingDate, // Store as yyyy-mm-dd format
      Customer_Name: formData.customerName,
      Customer_Phone: formData.customerPhone,
     
    };

    try {
      // console.log("sending",formDataToSend);
      const response = await axios.post('http://localhost:4002/bookingPost', formDataToSend);
      // console.log('Booking successfully created:', response.data);
      setConfirmationDialog(true);
    } catch (error) {
      console.error('Error creating booking:', error.response?.data || error.message);
    }
  };

  const handleDialogClose = () => {
    setConfirmationDialog(false);
    navigate('/');
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg bg-white rounded-xl p-6 max-h-[90vh] overflow-y-auto">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <button
            onClick={onClose}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>

          <h3 className="font-bold text-lg text-gray-800">Booking Form</h3>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-bold text-green-600">{service.title}</h4>
            <ul className="list-disc list-inside">
              {service.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>

          {/* Booking Date Input */}
          {/* added time selection shruti */}
          <div>
    <label className="block text-sm font-bold mb-1 text-gray-700">
      Booking Date & Time <span className="text-red-500">*</span>
    </label>
    <input
      type="datetime-local"
      name="bookingDate"
      value={bookingDate} // Use the yyyy-mm-ddTHH:mm format for input value
      onChange={handleDateChange}
      min={new Date().toISOString().split('T')[0] + 'T' + new Date().toISOString().split('T')[1].slice(0, 5)} // Ensure no past dates and time
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      required
    />
    <p className="mt-2 text-gray-500">
      {bookingDate && `Selected date and time: ${formatDate(bookingDate)}`}
    </p>
  </div>





          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">Customer Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">Phone Number <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            {errorMessages.customerPhone && <p className="text-red-500">{errorMessages.customerPhone}</p>}
            
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">House Number <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="bookHouseNo"
              value={formData.bookHouseNo}
              onChange={handleChange}
              placeholder="Enter your house number"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">Area <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="bookArea"
              value={formData.bookArea}
              onChange={handleChange}
              placeholder="Enter your area"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">City <span className="text-red-500">*</span></label>
            <select
              name="bookCity"
              value={formData.bookCity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select City</option>
              {cities.length > 0 ? (
                cities.map((city) => (
                  <option key={city.City_PIN} value={city.City_Name}>{city.City_Name}</option>
                ))
              ) : (
                <option disabled>Loading cities...</option>
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">City PIN <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="bookCityPin"
              value={formData.bookCityPin}
              onChange={handleChange}
              placeholder="City PIN"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-gray-700">State <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="bookState"
              value={formData.bookState}
              onChange={handleChange}
              placeholder="Enter your state"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled
              required
            />
          </div>

          <div className="flex justify-between mt-4">
            {/* <button
              type="button"
              onClick={onClose}
              className="w-full bg-gray-300 text-white p-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button> */}
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
            >
              Submit Booking
            </button>
          </div>
        </form>

        {confirmationDialog && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h4 className="text-lg font-bold text-center text-green-600">Booking Confirmed</h4>
              <p className="text-center mt-2">Your booking has been successfully created.</p>
              <div className="mt-4 text-center">
                <button
                  onClick={handleDialogClose}
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

    
  );
};

export default BookingForm;