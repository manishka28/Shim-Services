import connection from '../db/connection.js';

// Add a new booking
export const addBookingPost = (bookingData, callback) => {
  const {
    
    U_Email,
    Book_Status,
    Service_Name,
    Service_Category,
    Appointment_Date,
    Book_HouseNo,
    Book_Area,
    Book_City,
    Book_City_PIN,
    Book_State,
    Customer_Name,
    Customer_Phone,
    Book_Date
  } = bookingData;
// console.log("booking data bookingPost",bookingData);
  // Insert query for adding new booking

  const currentDate2 = new Date().toISOString().slice(0, 10);
  const query = `
  INSERT INTO bookings (U_Email, Book_Status, Service_Name, Service_Category, Appointment_Date, Book_HouseNo, Book_Area, Book_City, Book_City_PIN, Book_State, Customer_Name, Customer_Phone, Book_Date)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;


  // Insert the booking data
  connection.query(query, [
    U_Email, Book_Status, Service_Name, Service_Category || null,
    Appointment_Date, Book_HouseNo, Book_Area, Book_City, Book_City_PIN,
    Book_State, Customer_Name || null, Customer_Phone || null, currentDate2
  ], (err, result) => {
    if (err) {
      console.error('Error inserting booking:', err);
      return callback({ error: err.code, message: err.message }, null);
    }
    callback(null, result);
  });
};
