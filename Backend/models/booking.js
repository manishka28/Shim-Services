// models/booking.js
import connection from '../db/connection.js';







// Get all bookings for a specific service provider
// models/booking.js
// export const getBookingsByServiceProvider = (SPEmail, callback) => {
//   const query = 'SELECT * FROM booking WHERE SP_Email = ?';
//   console.log("email",SPEmail);
  
//   console.log('Executing query:', query, 'with email:', SPEmail); // Debugging print

//   connection.query(query, [SPEmail], (err, results) => {
//       if (err) {
//           console.error('Error executing query:', err);
//           return callback(err, null);
//       }
//       console.log('Query results:', results); // Debugging print
//       callback(null, results);
//   });
// };

export const getBookingsByServiceProvider = (email, callback) => {
  const query = `
  SELECT DISTINCT b.* 
  FROM booking b
  JOIN sp_services s ON  b.Service_Name = s.Service_Name
  WHERE b.SP_Email = ? OR b.Book_Status = "Pending" OR b.Book_Status="Accepted"
`;

  // console.log('Executing query:', query, 'with email:', email); // Debugging print

  connection.query(query, [email], (err, results) => {
      if (err) {
          console.error('Error executing query:', err);
          return callback(err, null);
      }
      // console.log('Query results:', results); // Debugging print
      callback(null, results);
  });
};
export const cancelBooking = (bookId, callback) => {
  const query = 'UPDATE booking SET Book_Status = ? WHERE Book_ID = ?';

  connection.query(query, ['Pending', bookId], (err, result) => {
    if (err) {
      console.error('Error canceling booking:', err);
      return callback({ error: err.code, message: err.message }, null);
    }

    if (result.affectedRows === 0) {
      // No booking found with that Book_ID
      return callback({ error: 'Booking not found' }, null);
    }

    callback(null, result);
  });
};

// models/booking.js


export const acceptBooking = (bookId, spEmail) => {
  return new Promise((resolve, reject) => {
    // Parameter validation
    // if (!bookId || typeof bookId !== 'string') {  // Treating bookId as a string
    //   return reject({ error: 'Invalid or missing bookId', details: bookId: ${bookId} });
    // }
    // if (!spEmail || typeof spEmail !== 'string') {
    //   return reject({ error: 'Invalid or missing spEmail', details: spEmail: ${spEmail} });
    // }

    // Query to update Book_Status and SP_Email
    const updateBookingQuery = `
      UPDATE booking 
      SET Book_Status = ?, SP_Email = ? 
      WHERE Book_ID = ?
    `;

    // Execute the query
    
    connection.query(updateBookingQuery, ['Accepted', spEmail, bookId], (err, result) => {
      if (err) {
        console.error('Database query error:', err);
        return reject({ error: 'Database query error', details: err.message });
      }

      if (result.affectedRows === 0) {
        // No booking was updated, likely because the Book_ID doesn't match any record
        console.warn('No booking found with the given Book_ID:', bookId);
        return reject({ error: 'Booking not found', details: `Book_ID: ${bookId}` });
      }

      // Success response
      // console.log(`Booking ${bookId} accepted by ${spEmail}.`);
      resolve({ message: 'Booking accepted and SP_Email updated successfully' });
    });
  });
};

// Get all bookings
export const getAllBookings = (callback) => {
  connection.query('SELECT * FROM booking', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Add a new booking
export const addBooking = (bookingData, callback) => {
  const { SP_Email, C_Email, Book_Status, Service_Name, Service_Category, Book_HouseNo, Book_Area, Book_City, Book_State, Book_Date } = bookingData;

  // Generate current date and time
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format: YYYY-MM-DD HH:MM:SS
  const currentDate2 = new Date().toISOString().slice(0, 10);
  // Insert query for adding a new booking
  const query = `
    INSERT INTO booking (SP_Email, C_Email, Book_Status, Service_Name, Service_Category, Appointment_Date, Book_HouseNo, Book_Area, Book_City, Book_State, Book_Date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [SP_Username, C_username, Book_Status, Service_Name, Service_Category, currentDate, Book_HouseNo, Book_Area, Book_City, Book_State, currentDate2],
    (err, result) => {
      if (err) {
        console.error('Error inserting booking:', err);
        return callback({ error: err.code, message: err.message }, null);
      }
      callback(null, result);
    }
  );
};
export const deleteBooking = (bookingId, callback) => {
  const query = 'DELETE FROM booking WHERE Book_ID = ?';

  connection.query(query, [bookingId], (err, result) => {
    if (err) {
      console.error('Error deleting booking:', err);
      return callback({ error: err.code, message: err.message }, null);
    }
    callback(null, result);
  });
};


//MANISHKA

// Get all bookings where SP_Email is NULL and Service_Name matches the service provided by SP
export const getAvailableBookingsForService = (serviceName, callback) => {
  const query = `
    SELECT * FROM booking 
    WHERE SP_Email IS NULL 
    AND Service_Name = ?
  `;

  // console.log('Executing query:', query, 'with service name:', serviceName); // Debugging print

  connection.query(query, [serviceName], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return callback(err, null);
    }
    // console.log('Query results:', results); // Debugging print
    callback(null, results);
  });
};
