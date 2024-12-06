import React, { useState, useEffect } from 'react';  
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuccessPopup from '../Components/SuccessPopup';


const BecomeServiceProviderForm = () => {
  const { currentUser,setCurrentUser } = useAuth();
  const [selectedDays, setSelectedDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
  const [cities, setCities] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  //const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    state: '',
    country:'',
    city: '',
    pincode:'',
    address: '',
    serviceCategory: '',
    subCategories: [], // Added to store selected subcategories
    experience: '',
    languages: [],
    governmentID: '',
    //account no., ifsc, bank name, branch
    accountNumber: '',
    ifscCode: '',
    bankName:'',
    branchName:'',
    termsAccepted: false,
  });

  const validateFields = () => {
    const {email, experience, accountNumber, ifscCode } = formData;
    let errors = {};

    // Email validation
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/@gmail\.com$/.test(email)) {
      errors.email = 'Email must be in the form @gmail.com';
    }

    //experience
    if (experience === undefined || experience === '') {
      errors.experience = 'Experience is required';
    } else if (isNaN(experience) || experience < 0 || experience > 50) {
      errors.experience = 'Experience must be a number between 0 and 50';
    }


    //accountNumber
    if(accountNumber === undefined || accountNumber === ''){
      errors.accountNumber = 'Account Number is required';
    }else if(isNaN(accountNumber) || accountNumber.length !==11){
      errors.accountNumber = 'Account Number must be of 11 digits';
    }

    //IFSC Code
    if (ifscCode === undefined || ifscCode === '') {
      errors.ifscCode = 'IFSC Code is required';
    } else if (!/^[A-Za-z]{4}[0-9]{7}$/.test(ifscCode)) {
      errors.ifscCode = 'IFSC Code must be in the format XXXX0000000';
    }


    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };
  

  useEffect(() => {
    if (currentUser) {
      setFormData({
        ...formData,
        fullName: currentUser.U_Name || '',
        email: currentUser.U_Email || '',
        phone: currentUser.U_Phone || '',
        
      });
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:4002/cities');
        // Sort the cities in ascending order by name
        const sortedCities = response.data.sort((a, b) => a.City_Name.localeCompare(b.City_Name));
        setCities(sortedCities);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
  
    fetchCities();
  }, []);
  

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleDaySelect = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)  // Unselect the day if it's already selected
        : [...prevDays, day]                // Otherwise, add it to the selection
    );
  };

  const onClose = () => {
    // Navigate to homepage when Cancel is clicked
    if(setCurrentUser && currentUser){
      setCurrentUser({ ...currentUser, is_SP: 0 });
    }
    navigate('/');
  };


  // const handleDaySelect = (e) => {
  //   const day = e.target.value;
  //   if (day && !selectedDays.includes(day)) {
  //     setSelectedDays((prevDays) => [...prevDays, day]);
  //   }
  // };

  const handleCityChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'city') {
      // Find the selected city from the cities list
      const selectedCity = cities.find((city) => city.City_Name === value);
  
      // Update formData with the selected city's details
      setFormData((prevData) => ({
        ...prevData,
        city: value,
        pincode: selectedCity ? selectedCity.City_PIN : '', 
        state: selectedCity ? selectedCity.City_State : '', 
        country: selectedCity ? selectedCity.City_Country : 'India', 
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // const removeDay = (day) => {
  //   setSelectedDays((prevDays) => prevDays.filter((d) => d !== day));
  // };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'serviceCategory') {
      // Reset subcategories based on selected category
      setFormData({
        ...formData,
        [name]: value,
        subCategories: categoryToSubCategories[value] || [], // Updated here
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  
  };

  const handleSelectChange = (selectedOptions) => {
    setFormData({
      ...formData,
      languages: selectedOptions.map(option => option.value),
    });
  };

  const handleSubCategoryChange = (e) => {
    const { value, checked } = e.target;
  
    setFormData((prevFormData) => {
      const updatedSubCategories = checked
        ? [...prevFormData.subCategories, value]  // Add subcategory if checked
        : prevFormData.subCategories.filter((item) => item !== value);  // Remove subcategory if unchecked
  
      return {
        ...prevFormData,
        subCategories: updatedSubCategories,  // Update subcategories array
      };
    });
  };
  



  const handleSubmit = async (e) => {  // Mark the function as async
    
    e.preventDefault();

    if(!validateFields())return;

    // console.log('Form data submitted:', formData);
    const formDataToSend = {
      SP_Email: formData.email,
      SP_PIN: formData.pincode,
      Monday: selectedDays.includes('Monday') ? 'Available' : 'Not Available',
      Tuesday: selectedDays.includes('Tuesday') ? 'Available' : 'Not Available',
      Wednesday: selectedDays.includes('Wednesday') ? 'Available' : 'Not Available',
      Thursday: selectedDays.includes('Thursday') ? 'Available' : 'Not Available',
      Friday: selectedDays.includes('Friday') ? 'Available' : 'Not Available',
      Saturday: selectedDays.includes('Saturday') ? 'Available' : 'Not Available',
      Sunday: selectedDays.includes('Sunday') ? 'Available' : 'Not Available',
      LanguageSpoken: formData.languages.join(', '),
      GovernmentID: formData.governmentID,
      CityName: formData.city,
      State: formData.state,
      Country: 'India' ,// or use formData.country if you add it to your state
      AccountNo: formData.accountNumber,
      IFSCcode: formData.ifscCode,
      Bank_Name: formData.bankName,
      Branch_Name: formData.branchName
    };

    const serviceDataToSend = {
      SP_Email: formData.email,
      Service_Category: formData.subCategories.length > 0 ? formData.subCategories.join(', ') : formData.serviceCategory,
      Service_Name: formData.serviceCategory,
      Service_Experience: formData.experience
    };
    // console.log("sp_date",serviceDataToSend);
    
    
    // Proceed with sending formDataToSend to your API
    
  
    try {
      const response = await fetch('http://localhost:4002/serviceproviders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

  
      const result = await response.json();
      if (!response.ok) {
        console.error('Error adding service provider:', result);
        return;
      }

      // console.log('Service provider added successfully:', result);


      // POST request to the second API (sp_services)
      const serviceResponse = await fetch('http://localhost:4002/sp_services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceDataToSend),
      });

      const serviceResult = await serviceResponse.json();
      if (!serviceResponse.ok) {
        console.error('Error adding service details:', serviceResult);
        return;
      }

      // console.log('Service details added successfully:', serviceResult);
       // Update is_SP field in customers table only after both API calls succeed
       if (setCurrentUser && currentUser) {
        setCurrentUser({ ...currentUser, is_SP: 1 });
        
      try {
        const updateResponse = await fetch(`http://localhost:4002/customers/${currentUser.U_Email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ is_SP: 1 }),
        });

          if (updateResponse.ok) {
              const updateResult = await updateResponse.json();
              // console.log('is_SP updated successfully:', updateResult);
              setIsPopupOpen(true);
          } else {
              console.error('Error updating is_SP:', await updateResponse.json());
          }
        } catch (updateError) {
          console.error('Error updating is_SP:', updateError);
        }
    }
      } catch (error) {
          console.error('Network error:', error);
      }
    
      
};

const onClosePopup = () => {
  setIsPopupOpen(false);
  // Use a timeout to ensure popup is closed before navigating
  setTimeout(() => {
    navigate('/');
  }, 500); // Add a small delay before navigating
};


  const [subCategories, setSubCategories] = useState([]); // State for subcategories

  const categoryToSubCategories = {
    'Appliance Repair': [
      'Appliance  Installation', 'Appliance  Servicing', 'Appliance  Gas Refill',
      'Appliance  Compressor Repair', 'Appliance  Filter Replacement', 'Duct Cleaning',
      'Thermostat Replacement', 'Evaporator Coil Cleaning',
    ],
    'Automobile Services': [
      'Brake Repair', 'Car Detailing', 'Engine Tune-Up', 'Oil Change', 'Tire Rotation'
    ],
    'Beauty Services': [
      'Body Waxing', 'Bridal Makeup', 'Eyebrow Threading', 'Eyelash Extensions', 'Facial Treatment',
      'Hair Styling', 'Manicure/Pedicure', 'Skin Care Treatment'
    ],
    'Carpentry': [
      'Cabinet Installation', 'Custom Furniture Building', 'Deck Construction', 'Door Repair',
      'Flooring Installation', 'Furniture Repair', 'Shelving Installation', 'Trim Installation'
    ],
    'Electrical Repair': [
      'Ceiling Fan Installation', 'Electrical Safety Check Inspection', 'Fuse Box Replacement',
      'Generator Installation', 'Light Fixture Installation', 'Outlet Replacement', 'Wiring Installation'
    ],
    'Gardening Services': [
      'Garden Design', 'Hedge Trimming', 'Lawn Mowing', 'Tree Pruning', 'Weed Control'
    ],
    'House Cleaning': [
      'Bathroom Cleaning', 'Carpet Cleaning', 'Deep Cleaning', 'Kitchen Cleaning', 
      'Post-Construction Cleaning', 'Regular Cleaning', 'Window Cleaning'
    ],
    'Network Services': [
      'Network Installation', 'Network Security Audit', 'Network Troubleshooting', 'Wireless Network Setup'
    ],
    'Painting Services': [
      'Cabinet Refinishing', 'Exterior Painting', 'Interior Painting', 'Wallpaper Installation'
    ],
    'Pest Control Services': [
      'Ant Control', 'Bed Bug Extermination', 'Insect Control', 'Mosquito Treatment', 
      'Rodent Control', 'Termite Treatment'
    ],
    'Plumbing Services': [
      'Faucet Repair', 'Leak Detection', 'Pipe Repair', 'Septic Tank Cleaning', 
      'Toilet Repair', 'Water Heater Installation'
    ]
  };

  // const cities = [
  //   'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad',
  //   'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur', 'Lucknow', 
  //   'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam','Faridabad','Ludhiana','Ghaziabad','Varanasi','Meerut','Agra','Rajkot','Vadodara','Vasai-Vihar','Pimrpi-Chinchwad','Nashik','Chhindwara','Patna','Ranchi'
  // ];

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Gujarati', label: 'Gujarati' },
    { value: 'Marathi', label: 'Marathi' },
    { value: 'Bengali', label: 'Bengali' },
  ];

  const customStyles = {
    multiValue: (base) => ({
      ...base,
      borderRadius: '20px',
      backgroundColor: '#f0f0f0',
      margin: '2px',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#333',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: '#e60000',
      ':hover': {
        backgroundColor: '#e60000',
        color: 'white',
      },
    }),
  };

  useEffect(() => {
    // Update subCategories when serviceCategory changes
    setSubCategories(categoryToSubCategories[formData.serviceCategory] || []);
  }, [formData.serviceCategory]);


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-serif font-bold mb-6 text-center">
        Become a Service Provider
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block font-medium">Full Name<span className="text-red-500 text-sm">*</span></label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
              disabled
            />
            {errorMessages.fullName && <p className="text-red-500">{errorMessages.fullName}</p>}
          </div>

          <div>
            <label className="block font-medium">Email<span className="text-red-500 text-sm">*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
              disabled
            />
            {errorMessages.email && <p className="text-red-500">{errorMessages.email}</p>}
          </div>

          <div>
            <label className="block font-medium">Phone Number<span className="text-red-500 text-sm">*</span></label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
              disabled
            />
            {errorMessages.phone && <p className="text-red-500">{errorMessages.phone}</p>}
          </div>

          <div className="flex items-center gap-4">
          <div className="flex-1">
    <label className="block font-medium">City<span className="text-red-500 text-sm">*</span></label>
    <select
      name="city"
      value={formData.city}
      onChange={handleCityChange}
      className="mt-1 block w-full p-2 border border-gray-300 rounded"
      required
      
    >
      <option value="">Select City</option>
      {cities.map((city) => (
        <option key={city.City_Name} value={city.City_Name}>
          {city.City_Name}
        </option>
      ))}
    </select>
  </div>

  {/* Pincode Field */}
  <div className="flex-1">
    <label className="block font-medium">Pincode<span className="text-red-500 text-sm">*</span></label>
    <input
      type="text"
      name="pincode"
      value={formData.pincode}
      onChange={handleChange}
      className="mt-1 block w-full p-2 border border-gray-300 rounded"
      required
    />
  </div>

</div>
  <div className="flex items-center gap-4">
  <div className="flex-1">
    <label className="block font-medium">State<span className="text-red-500 text-sm">*</span></label>
    <input
      type="text"
      name="state"
      value={formData.state}
      onChange={handleCityChange}
      className="mt-1 block w-full p-2 border border-gray-300 rounded"
      required
    />
  </div>
  <div className="flex-1">
    <label className="block font-medium">Country<span className="text-red-500 text-sm">*</span></label>
    <input
      type="text"
      name="country"
      value={formData.country}
      onChange={handleCityChange}
      className="mt-1 block w-full p-2 border border-gray-300 rounded"
      required
    />
  </div>
</div>


<div>
  <label className="block font-medium">Address<span className="text-red-500 text-sm">*</span></label>
  <input
    type="text"
    name="address"
    value={formData.address}
    onChange={handleChange}
    className="mt-1 block w-full p-2 border border-gray-300 rounded"
    required
  />
</div>


          <div>
            <label className="block font-medium">Select Service Category<span className="text-red-500 text-sm">*</span></label>
            <select
              name="serviceCategory"
              value={formData.serviceCategory}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Category</option>
              <option value="Appliance Repair">Appliance Repair</option>
              <option value="Automobile Services">Automobile Services</option>
              <option value="Beauty Services">Beauty Services</option>
              <option value="Carpentry">Carpentry</option>
              <option value="Electrical Repair">Electrical Repair</option>
              <option value="Gardening Services">Gardening Services</option>
              <option value="House Cleaning">House Cleaning</option>
              <option value="Network Services">Network Services</option>
              <option value="Painting Services">Painting Services</option>
              <option value="Pest Control Services">Pest Control Services</option>
              <option value="Plumbing Services">Plumbing Services</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Select Subcategories<span className="text-red-500 text-sm">*</span></label>
            {subCategories.length > 0 ? (
              <div>
                {subCategories.map((subCategory) => (
                  <div key={subCategory}>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        value={subCategory}
                        checked={formData.subCategories.includes(subCategory)}
                        onChange={handleSubCategoryChange}
                        className="form-checkbox"
                        
                      
                      />
                      <span className="ml-2">{subCategory}</span>
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No subcategories available for this category</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Experience(in years)<span className="text-red-500 text-sm">*</span></label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              rows="3"
              required
            />
            {errorMessages.experience && <p className="text-red-500">{errorMessages.experience}</p>}
          </div>


          <div>
            <label className="block font-medium">Languages<span className="text-red-500 text-sm">*</span></label>
            <Select
              isMulti
              options={languageOptions}
              value={languageOptions.filter(option => formData.languages.includes(option.value))}
              onChange={handleSelectChange}
              className="mt-1"
              styles={customStyles}
              required
            />
          </div>

          {/* added availability */}
          <div>
            <label className="block font-medium mb-2">Availability<span className="text-red-500 text-sm">*</span></label>
            <div className="grid grid-cols-2 gap-2">
              {days.map((day) => (
                <div key={day} className="flex items-center">
                  <input
                    type="checkbox"
                    value={day}
                    checked={selectedDays.includes(day)}
                    onChange={() => handleDaySelect(day)}
                    className="mr-2"
                    
                  />
                  <label>{day}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium">Government ID<span className="text-red-500 text-sm">*</span></label>
            <input
              type="text"
              name="governmentID"
              value={formData.governmentID}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* additiion of bank details */}
          <div>
            <label className="block font-medium">Account Number: <span className="text-red-500 text-sm">*</span></label>
            <input
              type="number"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
            {errorMessages.accountNumber && <p className="text-red-500">{errorMessages.accountNumber}</p>}
          </div>

          <div>
            <label className="block font-medium">IFSC Code:<span className="text-red-500 text-sm">*</span></label>
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
            {errorMessages.ifscCode && <p className="text-red-500">{errorMessages.ifscCode}</p>}
          </div>

          <div>
            <label className="block font-medium">Bank Name:<span className="text-red-500 text-sm">*</span></label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Branch Name:<span className="text-red-500 text-sm">*</span></label>
            <input
              type="text"
              name="branchName"
              value={formData.branchName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"  // Ensures it's a checkbox
                className="form-checkbox h-5 w-5 text-blue-600"
                required  // Makes it required
              />
              <span className="ml-2 text-gray-700">I accept the terms and conditions<span className="text-red-500 text-sm">*</span></span>
            </label>
          </div>

          <div className="text-center flex justify-around">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit
            </button>
            <button
            onClick={onClose}
            className="bg-red-600  text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
            Cancel
            </button>
          </div>
        </div>
      </form>
      {/* Success Popup */}
      {isPopupOpen && (
      <SuccessPopup isOpen={isPopupOpen} onClose={onClosePopup} />
    )}

    </div>
  );
};

export default BecomeServiceProviderForm;