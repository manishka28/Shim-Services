import connection from '../db/connection.js';

// Update the status of a booking
export const updateBookingStatus = (bookingId, newStatus,SP_Email, callback) => {
  const query = 'UPDATE booking SET Book_Status = ?,SP_Email=? WHERE Book_ID = ?';

  connection.query(query, [newStatus,SP_Email, bookingId], (err, result) => {
    if (err) {
      console.error('Error updating booking status:', err);
      return callback({ error: err.code, message: err.message }, null);
    }
    callback(null, result);
  });
};
export const updateBookingStatusAfterPayment = (bookingId, newStatus, callback) => {
  const query = `
    UPDATE booking 
    SET Book_Status = ?
    WHERE Book_ID = ?;
  `;

  connection.query(query, [newStatus, bookingId], (err, result) => {
    if (err) {
      console.error('Error updating booking status:', err);
      return callback({ error: err.code, message: err.message }, null);
    }
    callback(null, result);
  });
};

//for checkbox
export const updateBookingStatusAfterCheckbox = (bookingId, callback) => {
  const query = `
    UPDATE booking 
    SET Book_Status = 'Completed'
    WHERE Book_ID = ?;
  `;

  connection.query(query, [bookingId], (err, result) => {
    if (err) {
      console.error('Error updating booking status:', err);
      return callback({ error: err.code, message: err.message }, null);
    }
    callback(null, result);
  });
};


