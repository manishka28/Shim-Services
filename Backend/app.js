import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; 
import bodyParser from 'body-parser';// Load environment variables
// import router from "./router.js"; 
import { createServer } from 'http'; // Import to create HTTP server
import { Server } from 'socket.io'; // Import socket.io


import { getAllServiceProviders, addServiceProvider,getServiceNamesByServiceProvider, getCityAndMobileByEmail } from './models/serviceProvider.js';
import { getAllCustomers, addCustomer, updateIsSP } from './models/customer.js'; // Added updateIsSP import
import { getAllBookings,getBookingsByServiceProvider, addBooking, acceptBooking,cancelBooking, deleteBooking,getAvailableBookingsForService } from './models/booking.js';
import { getAllServices, addService } from './models/service.js'; // Import service functions
import { getAllServicesForProvider, addNewServiceForProvider } from './models/sp_services.js';
import { getAllCities, addCity } from './models/city.js';
import { addBookingPost } from './models/bookingPost.js';
import { updateBookingStatus, updateBookingStatusAfterPayment, updateBookingStatusAfterCheckbox} from './models/updateBooking.js';
import { addBill,getAllBills,getBillById,updateRazorpayPaymentId, cashPayment } from './models/bill.js';
// Load environment variables
dotenv.config();
// console.log(process.env.R);


const app = express();
const httpServer = createServer(app); // Create HTTP server
const io = new Server(httpServer, { // Initialize Socket.io with HTTP server
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

// Middleware to parse JSON
app.use(express.json());


// Middleware to enable CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

// Socket.io connection event
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Example event: notify when a new service provider is added
  socket.on('newServiceProvider', (data) => {
    console.log('New service provider added:', data);
    io.emit('updateServiceProviders', data); // Broadcast the update
  });

  // Additional events can be added here as needed
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});     
// app.use('/api', router); //prefix the routes with '/api'
// Service Provider Routes
app.get('/serviceproviders', (req, res) => {
  getAllServiceProviders((err, results) => {
    if (err) {
      console.error('Error retrieving service providers:', err);
      return res.status(500).json({ error: 'Failed to retrieve service providers' });
    }
    res.json(results);
  });
});

app.post('/serviceproviders', (req, res) => {
  const newProvider = req.body;
  if (!newProvider.SP_Email || !newProvider.SP_PIN || !newProvider.GovernmentID || !newProvider.CityName) {
    return res.status(400).json({ error: 'Missing required fields: SP_Email, SP_PIN, GovernmentID, CityName' });
  }
  addServiceProvider(newProvider, (err, result) => {
    if (err) {
      console.error('Error adding service provider:', err);
      return res.status(500).json({ error: err.error || 'Failed to add service provider' });
    }
    res.status(201).json({ message: 'Service provider added successfully', result });
    io.emit('newServiceProvider', newProvider); // Notify clients about new provider
  });
});

// Customer Routes
app.get('/customers', (req, res) => {
  getAllCustomers((err, results) => {
    if (err) {
      console.error('Error retrieving customers:', err);
      return res.status(500).json({ error: 'Failed to retrieve customers' });
    }
    res.json(results);
  });
});

app.post('/customers', (req, res) => {
  const newCustomer = req.body;
  if (!newCustomer.U_Email) {
    return res.status(400).json({ error: 'Missing required field: email' });
  }
  addCustomer(newCustomer, (err, result) => {
    if (err) {
      console.error('Error adding customer:', err);
      return res.status(500).json({ error: err.error || 'Failed to add customer' });
    }
    res.status(201).json({ message: 'Customer added', result });
  });
});

// Additional routes and middleware continue as per your existing code...

// Start the server using httpServer with socket.io



// Update is_SP for Customer
app.put('/customers/:U_Email', (req, res) => {
  const { U_Email } = req.params;  // Changed userId to U_Email
  const { is_SP } = req.body;

  // Validate request data
  if (!U_Email || typeof is_SP === 'undefined') {
    return res.status(400).json({ error: 'Missing required fields: U_Email or is_SP value' });
  }

  updateIsSP(U_Email, is_SP, (err, result) => {
    if (err) {
      console.error('Error updating customer:', err);
      return res.status(500).json({ error: 'Failed to update customer' });
    }
    res.status(200).json({ message: 'Customer updated successfully', result });
  });
});


// Booking Routes
app.get('/bookings', (req, res) => {
  getAllBookings((err, results) => {
    if (err) {
      console.error('Error retrieving bookings:', err);
      return res.status(500).json({ error: 'Failed to retrieve bookings' });
    }
    res.json(results);
  });
});

app.post('/bookings', (req, res) => {
  const newBooking = req.body;

  // Validate request data
  if (!newBooking.Service_Name || !newBooking.Book_Date || !newBooking.Book_City) {
    return res.status(400).json({ error: 'Missing required fields: Service_Name, Book_Date, Book_City' });
  }

  addBooking(newBooking, (err, result) => {
    if (err) {
      console.error('Error adding booking:', err);
      return res.status(500).json({ error: 'Failed to add booking' });
    }
    res.status(201).json({ message: 'Booking added', result });
  });
});

app.delete('/bookings/:id', (req, res) => {
  const { id } = req.params;

  deleteBooking(id, (err, result) => {
    if (err) {
      console.error('Error deleting booking:', err);
      return res.status(500).json({ error: 'Failed to delete booking' });
    }
    res.status(200).json({ message: 'Booking deleted successfully', result });
  });
});

// Service Routes
app.get('/services', (req, res) => {
  getAllServices((err, results) => {
    if (err) {
      console.error('Error retrieving services:', err);
      return res.status(500).json({ error: 'Failed to retrieve services' });
    }
    res.json(results);
  });
});

app.post('/services', (req, res) => {
  const newService = req.body;

  // Validate request data
  if (!newService.Service_Name || !newService.Service_Category) {
    return res.status(400).json({ error: 'Missing required fields: Service_Name, Service_Category' });
  }

  addService(newService, (err, result) => {
    if (err) {
      console.error('Error adding service:', err);
      return res.status(500).json({ error: 'Failed to add service' });
    }
    res.status(201).json({ message: 'Service added', result });
  });
});

// Start the server
const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



// City Routes
app.get('/cities', (req, res) => {
  getAllCities((err, results) => {
    if (err) {
      console.error('Error retrieving cities:', err);
      return res.status(500).json({ error: 'Failed to retrieve cities' });
    }
    res.json(results);
  });
});

app.post('/cities', (req, res) => {
  const newCity = req.body;

  // Validate request data
  if (!newCity.City_PIN || !newCity.City_Name || !newCity.City_State || !newCity.City_Country) {
    return res.status(400).json({ error: 'Missing required fields: City_PIN, City_Name, City_State, City_Country' });
  }

  addCity(newCity, (err, result) => {
    if (err) {
      console.error('Error adding city:', err);
      return res.status(500).json({ error: 'Failed to add city' });
    }
    res.status(201).json({ message: 'City added successfully', result });
  });
});

//booking new shruti


app.get('/bookings/sp/:SPEmail', (req, res) => {
  const { SPEmail } = req.params;

  // console.log('Fetching bookings for service provider with email:', SPEmail); // Debugging print

  getBookingsByServiceProvider(SPEmail, (err, results) => {
      if (err) {
          console.error('Error retrieving bookings for service provider:', err);
          return res.status(500).json({ error: 'Failed to retrieve bookings for service provider' });
      }
      // console.log('Retrieved bookings:', results); // Debugging print
      res.json(results);
  });
});


app.get('/sp_services/:spEmail', (req, res) => {
  const { spEmail } = req.params;

  getAllServicesForProvider(spEmail, (err, results) => {
    if (err) {
      console.error('Error retrieving services for provider:', err);
      return res.status(500).json({ error: 'Failed to retrieve services for provider' });
    }
    res.json(results);
  });
});

app.post('/sp_services', (req, res) => {
  const newService = req.body;

  // Validate request data
  if (!newService.SP_Email || !newService.Service_Name || !newService.Service_Category || !newService.Service_Experience) {
    return res.status(400).json({ error: 'Missing required fields: SP_Email, Service_Name, Service_Category, Service_Experience' });
  }

  addNewServiceForProvider(newService, (err, result) => {
    if (err) {
      console.error('Error adding new service:', err);
      return res.status(500).json({ error: err.error || 'Failed to add new service' });
    }
    res.status(201).json({ message: 'Service added successfully', result });
  });
});

// API endpoint to get services of a specific service provider
//Manishka--
app.get('/services/:spEmail', (req, res) => {
  const { spEmail } = req.params;

  // Fetch services provided by the service provider using the email
  getServiceNamesByServiceProvider(spEmail, (err, services) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching services', error: err });
    }
    return res.status(200).json({ services });
  });
});
//Manishka end

app.post('/bookingPost', (req, res) => {
  const bookingData = req.body;

  // Ensure required fields are present
  const requiredFields = [ 'U_Email', 'Book_Status', 'Service_Name', 'Appointment_Date', 'Book_HouseNo', 'Book_Area', 'Book_City', 'Book_City_PIN', 'Book_State'];
  for (let field of requiredFields) {
    if (!bookingData[field]) {
      return res.status(400).json({ message: `Missing required field: ${field}` });
    }
  }

//---Shruti

app.post('/bookings/accept-order/:bookId', async (req, res) => {
  const bookId = req.params.bookId;
  const spEmail = req.body.spEmail; // Ensure spEmail is sent in the request body

  // if (isNaN(bookId)) {
  //   return res.status(400).json({ error: 'Invalid bookId' });
  // }

  // if (!spEmail || typeof spEmail !== 'string') {
  //   return res.status(400).json({ error: 'Invalid or missing spEmail' });
  // }

  try {
    const result = await acceptBooking(bookId, spEmail);
    res.json({ message: 'Booking accepted', result });
  } catch (error) {
    if (error.error === 'Booking not found') {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(500).json({ error: 'Error accepting booking', details: error.message });
  }
});


app.post('/bookings/cancel-order/:bookId', async (req, res) => {
  const bookId = req.params.bookId;

  // Call the cancelBooking function from the model
  cancelBooking(bookId, (err, result) => {
    if (err) {
      if (err.error === 'Booking not found') {
        return res.status(404).json({ error: 'Booking not found' });
      }
      return res.status(500).json({ error: 'Error canceling booking', message: err.message });
    }

    res.json({ message: 'Booking cancelled', result });
  });
});

//--Shruti end

  addBookingPost(bookingData, (err, result) => {
    if (err) {
      console.error('Error adding booking:', err);
      return res.status(500).json({ message: err.message });
    }

    res.status(201).json({ message: 'Booking created successfully', bookingId: bookingData.Book_ID });
  });
});

  
  // Add booking to the database
  


//fetching all the orders for sp where the sp_email is null and service_name =their service_name

app.get('/available-bookings/:serviceName', (req, res) => {
  const { serviceName } = req.params;

  // Fetch bookings for the service provider's service
  getAvailableBookingsForService(serviceName, (err, bookings) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching available bookings', error: err });
    }
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No available bookings found for this service' });
    }

    // Send the bookings as the response
    return res.status(200).json(bookings);
  });
});



//update booking status from pending to scheduled by Service Provider

app.put('/update-status/:bookingId', (req, res) => {
  const { bookingId } = req.params; // Get the booking ID from the route parameter
  const { newStatus } = req.body;
  const {SP_Email}=req.body;
  // console.log(newStatus);
   // Get the new status from the request body

  if (!newStatus) {
    return res.status(400).json({ error: 'New status is required' });
  }

  // Call the function to update the booking status
  updateBookingStatus(bookingId, newStatus,SP_Email, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Booking status updated successfully', result });
  });
});

app.put('/bookStatusAfterPayment/:bookId', (req, res) => {
  const { bookId } = req.params;
  const { newStatus } = req.body;
  // console.log("Book id",bookId);
  // console.log("Status",newStatus);
  
  
  // Ensure newStatus and bookingId are provided
  if (!newStatus || !bookId) {
    return res.status(400).json({ error: 'Booking ID and new status are required.' });
  }

  // Call the function to update the booking status
  updateBookingStatusAfterPayment(bookId, newStatus, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message, details: err });
    }
    res.status(200).json({ message: 'Booking status updated successfully', result });
  });
});



//route for bill 



// Route to get all bills
app.get('/bills', (req, res) => {
  getAllBills((err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching bills', error: err });
    }
    res.status(200).json(results);
  });
});


// Route to get a specific bill by Bill_ID
app.get('/bills/:Book_ID', (req, res) => {
  
  
  const { Book_ID } = req.params;  // Extract Bill_ID from the URL parameter
  // console.log(Book_ID);
  
  getBillById(Book_ID, (err, result) => {
    if (err) {
      return res.status(404).json({ message: 'Bill not found', error: err });
    }
    res.status(200).json(result);
  });
});

// Route to add a new bill
app.post('/bills', (req, res) => {
  const { Book_ID, Bill_Date, Bill_Mode, Labor_Entries } = req.body;
  // console.log("Book id",Book_ID);
  // console.log("Bill Date",Bill_Date);
  // console.log("Labor ",Labor_Entries);
  
  if (!Book_ID || !Bill_Date || !Labor_Entries) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Calculate the total cost
  const Total_Cost = Labor_Entries.reduce((total, labor) => {
    return total + labor.total;
  }, 0);


  const billData = {  Book_ID, Bill_Date, Bill_Mode, Labor_Entries, Total_Cost };
  // console.log(billData);
  

  addBill(billData, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding bill', error: err });
    }
    res.status(201).json({ message: 'Bill added successfully', data: result });
  });
});


app.get('/sp_city_mobile/:spEmail', (req, res) => {
  const { spEmail } = req.params; // Get the email from the URL parameter

  // Call the function to fetch city and mobile number
  getCityAndMobileByEmail(spEmail, (err, data) => {
    if (err) {
      console.error('Error retrieving city and mobile:', err);
      return res.status(500).json({ error: err.message || 'Failed to retrieve data' });
    }

    if (!data) {
      return res.status(404).json({ message: 'No data found for this service provider' });
    }

    // Return the fetched data as JSON response
    res.json(data);
  });
});


//--------- Payment Integration ----------//
import Razorpay from "razorpay";
import { addSalary, fetchAmountToPayForSPByMonth, fetchSalaryForSPByMonth, fetchTotalCostForSP, fetchTotalCostForSPByMonth, updateAmountToPayForSPByMonth } from './models/salary.js';

//RAZORPAYX_API_KEY="rzp_test_iDWZYaECE3rES2"
// RAZORPAYX_API_SECRET="5bx32uiT2GpnGJOurYwR2uSk"

const razorpay = new Razorpay({
  key_id: "rzp_test_iDWZYaECE3rES2",
  key_secret: "5bx32uiT2GpnGJOurYwR2uSk",
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/orders', async (req, res) => {
  const options = {
    amount: req.body.amount,
    currency: req.body.currency,
    receipt: "receipt",
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({ order_id: response.id, currency: response.currency, amount: response.amount });
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});

app.get('/payment/:paymentId', async (req, res) => {
  const { paymentId } = req.params;

  try {
    const payment = await razorpay.payments.fetch(paymentId);
    if (!payment) {
      return res.status(404).json("Payment not found");
    }
    res.json({
      status: payment.status,
      method: payment.method,
      amount: payment.amount,
      currency: payment.currency,
    });
  } catch (error) {
    res.status(500).json("Failed to fetch payment");
  }
});

//updating razorpay_id in db
app.put('/bills/:billId', (req, res) => {
  const { billId } = req.params;
  const { razorpay_payment_id } = req.body;


  updateRazorpayPaymentId(billId, razorpay_payment_id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.error, message: err.message });
    } else {
      res.status(200).json({ message: 'Bill updated with Razorpay payment ID successfully.' });
    }
  });
});



//checkbox
app.put('/booking/completion/:bookingId', (req, res) => {
  const bookingId = req.params.bookingId;

  // Call the database function to update the booking status
  updateBookingStatusAfterCheckbox(bookingId, (error, result) => {
    if (error) {
      return res.status(500).json({ error: 'Error updating booking status', details: error });
    }

    res.status(200).json({ message: 'Booking status updated to Completed', result });
  });
});

// apis for salary 
// API to fetch total cost for a service provider
// Ensure this is in your server file
app.get('/fetchTotalCostForSP', (req, res) => {
  const { SP_Email, Bill_Mode } = req.query; // Access query parameters, not body
  
  // Log the received query parameters for debugging
  // console.log('Received request to fetch total cost with:', { SP_Email, Bill_Mode });

  // Fetch the total cost from the database
  fetchTotalCostForSP({ SP_Email, Bill_Mode }, (err, result) => {
    if (err) {
      // Log the error if there is an issue fetching from the database
      console.error('Error fetching total cost:', err);
      return res.status(500).json({ error: err.message });
    }
    
    // Log the fetched result for debugging
    // console.log('Fetched total cost:', result);
    
    // Send the total cost in the response
    res.json({ TotalCost: result || 0 });
  });
});
// API to add salary for a service provider
app.post('/salary', (req, res) => {
  const { SP_Email, Salary = 0, month, year, amount_to_pay = 0 } = req.body;

  

  // Validate required fields
  if (!SP_Email  || !month || !year) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Prepare the details object
  const details = { SP_Email, Salary, month, year, amount_to_pay };

  // Call the addSalary function
  addSalary(details, (err, result) => {
    if (err) {
      console.error('Error adding/updating salary:', err);
      return res.status(500).json({ error: 'Database error occurred' });
    }
    
    res.status(200).json({ message: 'Salary added or updated successfully', result });
  });
});

app.get('/fetchTotalCostForSPMonthly', (req, res) => {
  const { SP_Email, Bill_Mode, Month, Year } = req.query;
  // console.log(req.query);
  
  // Validate query parameters
  if (!SP_Email || !Bill_Mode || !Month || !Year) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  // Call the function to fetch total cost
  
  fetchTotalCostForSPByMonth({ SP_Email, Bill_Mode, Month, Year }, (err, totalCost) => {
    if (err) {
      console.error('Error fetching monthly total cost:', err);
      return res.status(500).json({ error: 'An error occurred while fetching data' });
    }

    // Send the total cost in the response
    res.json({ TotalCost: totalCost });
  });
});

app.get('/fetchSalaryForSPMonthly', (req, res) => {
  const { SP_Email, month, year } = req.query;
  console.log("request sent",req.query);
  

  // Call the function to fetch salary
  fetchSalaryForSPByMonth({ SP_Email, month, year }, (error, result) => {
    if (error) {
      return res.status(400).json({ error: error.error || 'Something went wrong' });
    }

    // Send the result back to the client
    return res.status(200).json({ Salary: result || 0 });
  });
});
app.get('/fetchAmountToPayForSPMonthly', (req, res) => {
  const { SP_Email, month, year } = req.query;
  console.log("request sent",req.query);
  

  // Call the function to fetch salary
  
  fetchAmountToPayForSPByMonth({ SP_Email, month, year }, (error, result) => {
    if (error) {
      return res.status(400).json({ error: error.error || 'Something went wrong' });
    }

    // Send the result back to the client
    return res.status(200).json({ amount_to_pay: result || 0 });
  });
});

app.post('/updateAmountToPay', (req, res) => {
  const details = req.body; // Assuming the details are sent in the body of the request

  // Call the service function to update the amount
  
  updateAmountToPayForSPByMonth(details, (error, result) => {
    if (error) {
      return res.status(500).json(error); // Respond with error status and message
    }
    
    // If successful, respond with the updated amount to pay
    return res.status(200).json({
      success: true,
      message: 'Amount updated successfully.',
      data: result
    });
  });
});


// cash payment -- shruti
app.get('/api/payment-mode/:bookId', async (req, res) => {
  const { bookId } = req.params;  // Get Book_ID from the route parameter

  try {
    const paymentMode = await cashPayment(bookId);

    if (paymentMode) {
      // Send the payment mode in the response
      res.json({ paymentMode });
    } else {
      // Send a 404 if no record is found
      res.status(404).json({ message: 'Payment mode not found for the given booking ID.' });
    }
  } catch (error) {
    // Handle errors (e.g., database issues)
    console.error('Error fetching payment mode:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});
