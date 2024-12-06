import connection from '../db/connection.js';


// Get bookings for a specific city and service
export const getBookingsByServiceAndCity = (serviceName, city, callback) => {
    const query = 'SELECT * FROM bookings WHERE Service_Name = ? AND Book_City = ? AND Book_Status = "pending"';
    connection.query(query, [serviceName, city], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Accept booking and set status to 'confirmed'
export const acceptBooking = async (bookingId) => {
    try {
        const [result] = await connection.query(
            'UPDATE bookings SET Book_Status = ? WHERE Book_ID = ?', 
            ['confirmed', bookingId]
        );

        // Emit a socket event to notify all providers about this booking acceptance
        io.emit('bookingStatusChanged', { bookingId, status: 'confirmed' });

        return result;
    } catch (error) {
        console.error('Error accepting booking:', error);
        throw new Error('Failed to accept booking');
    }
};

// Cancel booking
export const cancelBooking = async (bookingId) => {
    try {
        const [result] = await connection.query(
            'UPDATE bookings SET Book_Status = ? WHERE Book_ID = ?', 
            ['canceled', bookingId]
        );

        // Emit a socket event to notify all providers about this booking cancellation
        io.emit('bookingStatusChanged', { bookingId, status: 'canceled' });

        return result;
    } catch (error) {
        console.error('Error canceling booking:', error);
        throw new Error('Failed to cancel booking');
    }
};





//shruti view table
export const getOrders=(U_Email, callback)=>{
   
        const query = `SELECT * FROM bookings WHERE U_Email = ?`; // Correct query to fetch all bookings for the service provider
        
        connection.query(query, [U_Email], (error, results) => {
          if (error) {
            return callback(error, null); // Handle error
          }
      
          // Check if results are empty and return an appropriate message
          if (results.length == 0) {
            return callback(null, { message: 'No services found for this service provider' });
          }
      
          // Return all results (multiple bookings)
          return callback(null, results);
        });
      };
