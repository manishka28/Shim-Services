import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentBySP from './PaymentBySP'; // Import your PaymentBySP component

const SalaryOfSP = ({ SP_Email }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const [selectedYear, setSelectedYear] = useState(null);
  const [amountToPayMonthly, setAmountToPayMonthly] = useState([]);
  const [salaryMonthly, setSalaryMonthly] = useState([]);
  const [currentMonthSalary, setCurrentMonthSalary] = useState(0);
  const [currentMonthAmountToPay, setCurrentMonthAmountToPay] = useState(0);
  const [error, setError] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [amountToPay, setAmountToPay] = useState(0);

  // Fetch current month and year salary information
  const fetchCurrentMonthData = async () => {
    try {
      const month = (currentMonth + 1).toString().padStart(2, '0');

      const salaryResponse = await axios.get('http://localhost:4002/fetchSalaryForSPMonthly', {
        params: {
          SP_Email,
          month,
          year: currentYear,
        },
      });
      console.log("curr salary resp",salaryResponse.data);
      
      setCurrentMonthSalary(salaryResponse.data.Salary || 0);

      const amountResponse = await axios.get('http://localhost:4002/fetchAmountToPayForSPMonthly', {
        params: {
          SP_Email,
          month,
          year: currentYear,
        },
      });
      console.log("curr amt res",amountResponse.data.amount_to_pay);
      setCurrentMonthAmountToPay(amountResponse.data.amount_to_pay || 0);
      console.log("Current Amount to Pay",currentMonthAmountToPay);
      
    } catch (error) {
      console.error('Error fetching current month data:', error);
      setError('Error fetching current month data');
    }
  };
  
  

  const fetchSalaryForSP = async () => {
    if (!selectedYear) return;
    try {
      const onlineTotals = [];

      for (let month = 1; month <= 12; month++) {
        // const formattedMonth = month.toString().padStart(2, '0');

        const response = await axios.get('http://localhost:4002/fetchSalaryForSPMonthly', {
          params: {
            SP_Email,
            month: month,
            year: selectedYear,
          },
        });
        console.log(`salary for ${month} ${response.data.Salary}`);
        // console.log("salary monthly");
        
        

        const salary = isNaN(response.data.Salary) ? 0 : response.data.Salary;
        onlineTotals.push(salary);
      }

      setSalaryMonthly(onlineTotals);
    } catch (error) {
      console.error('Error fetching salary monthly totals:', error);
      setError('Error fetching salary monthly totals');
    }
  };

  const fetchAmountToPayForSP = async () => {
    if (!selectedYear) return;
    try {
      const cashTotals = [];

      for (let month = 1; month <= 12; month++) {
        // const formattedMonth = month.toString().padStart(2, '0');

        const response = await axios.get('http://localhost:4002/fetchAmountToPayForSPMonthly', {
          params: {
            SP_Email,
            month: month,
            year: selectedYear,
          },
        });

        const totalAmountToPay = isNaN(response.data.amount_to_pay) ? 0 : response.data.amount_to_pay;
        cashTotals.push(totalAmountToPay);
      }
      console.log(`amount to pay for ${month} is ${response.data}`);
      

      setAmountToPayMonthly(cashTotals);
    } catch (error) {
      console.error('Error fetching cash total monthly totals:', error);
      setError('Error fetching cash total monthly totals');
    }
  };

  useEffect(() => {
    fetchCurrentMonthData();
  }, [SP_Email]);

  useEffect(() => {
    if (selectedYear) {
      fetchSalaryForSP();
      fetchAmountToPayForSP();
    }
  }, [SP_Email, selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value ? Number(event.target.value) : null);
  };

  const handlePayNowClick = (amount) => {
    if (amount > 0) {
      setAmountToPay(amount);
      setShowPaymentModal(true);
    }
  };
  const handlePaymentSuccess = (paymentId) => {
    console.log("Payment successful with ID:", paymentId);
  
    // Prepare the details to send to the API (including SP email, month, year, and updated amount)
    const details = {
      SP_Email: SP_Email,  // You need to dynamically pass this value
      month: currentMonth+1,                        // Dynamically set the month
      year: currentYear,                              // Dynamically set the year
      amountToPay: 0                        // This should be the amount to update
    };
  
    // Call the /updateAmountToPay API
    axios.post('http://localhost:4002/updateAmountToPay', details)
      .then((response) => {
        console.log('Amount updated successfully:', response.data);
        // Additional actions can be added here after updating the amount
        // For example, resetting the amount or updating the UI
        // setAmount(0); // Reset amount if needed
      })
      .catch((error) => {
        console.error('Error updating amount:', error.response ? error.response.data : error.message);
        // Handle error appropriately
      });
  };

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-md">
      {/* Fixed section: Current Month and Year Information */}
      <h3 className="text-lg font-semibold flex items-center space-x-2">
        <i className="fas fa-money-bill text-green-500"></i>
        <span>Salary Information for {new Date(currentYear, currentMonth).toLocaleString('en', { month: 'long' })} {currentYear}</span>
      </h3>
      <div className="mt-4">
        <span className="font-medium">Amount to Pay (Current Month):</span> ₹{currentMonthAmountToPay || 0}
      </div>
      <div className="mt-2">
        <span className="font-medium">Salary (Online Total for Current Month):</span> ₹{currentMonthSalary || 0}
      </div>

      {/* Show Pay Now button only if amount to pay for current month is greater than zero */}
      {currentMonthAmountToPay > 0 && (
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => handlePayNowClick(currentMonthAmountToPay)}
        >
          Pay Now
        </button>
      )}

      {/* Year Selection Dropdown */}
      
<div className="mt-6">
  <label className="mr-2 text-lg">Select Year:</label>
  <select
    value={selectedYear || ''}
    onChange={handleYearChange}
    className="p-2 border rounded-md"
  >
    <option value="">--Select Year--</option>
    {/* Dynamically generate years from 2023 to current year */}
    {Array.from({ length: currentYear - 2022 }, (_, index) => 2023 + index).map(year => (
      <option key={year} value={year}>
        {year}
      </option>
    ))}
  </select>
</div>


      {selectedYear && (
        <>
          <h3 className="mt-6 text-lg font-semibold flex items-center space-x-2">
            <i className="fas fa-calendar-day text-blue-500"></i>
            <span>Salary Information for {selectedYear}</span>
          </h3>
          <div className="mt-4">
            <table className="w-full border">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Month</th>
                  <th className="border px-4 py-2">Amount to Pay (Cash Total)</th>
                  <th className="border px-4 py-2">Salary (Online Total)</th>
                  {/* <th className="border px-4 py-2">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 12 }).map((_, monthIndex) => (
                  <tr key={monthIndex}>
                    <td className="border px-4 py-2">
                      {new Date(0, monthIndex).toLocaleString('en', { month: 'long' })}
                    </td>
                    <td className="border px-4 py-2">
                      ₹{amountToPayMonthly[monthIndex] || 0}
                    </td>
                    <td className="border px-4 py-2">
                      ₹{salaryMonthly[monthIndex] || 0}
                    </td>
                    <td className="border px-4 py-2">
                      {amountToPayMonthly[monthIndex] > 0 && (
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                          onClick={() => handlePayNowClick(amountToPayMonthly[monthIndex])}
                        >
                          Pay Now
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showPaymentModal && (
        <PaymentBySP
          amount={amountToPay}
          onClose={() => setShowPaymentModal(false)} 
          onPaymentSuccess={handlePaymentSuccess}
          // Pass the closeModal function to the modal component
        />
      )}
    </div>
  );
};

export default SalaryOfSP;
