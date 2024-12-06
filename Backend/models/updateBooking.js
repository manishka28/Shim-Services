import connection from '../db/connection.js';
import nodemailer from 'nodemailer';
import twilio from 'twilio';

// Set up Nodemailer transport
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'shimservices5@gmail.com', // Your Gmail address
//     pass: 'shimservices5@jk'         // Your Gmail password (preferably use OAuth for security)
//   }
// });

// Set up Twilio for SMS
const client = twilio('ACb46b06526d1cb3bd34879cbadbad7cf7', '41af1d542cc3e8ac0ba8d1c72ee5e9ba');  // Your Twilio SID and Auth Token

// Function to update booking status and send email/SMS notifications
export const updateBookingStatus = (bookingId, newStatus, SP_Email, callback) => { 
  // Update the booking status first
  const query = 'UPDATE bookings SET Book_Status = ?, SP_Email = ? WHERE Book_ID = ?';

  connection.query(query, [newStatus, SP_Email, bookingId], (err, result) => {
    if (err) {
      console.error('Error updating bookings status:', err);
      return callback({ error: err.code, message: err.message }, null);
    }

    // After updating the booking status, fetch user details (name and phone)
    const fetchUserQuery = `
      SELECT *
      FROM bookings b
      JOIN user u ON b.U_Email = u.U_Email
      WHERE b.Book_ID = ?;
    `;
    
    connection.query(fetchUserQuery, [bookingId], async (err, userResult) => {
      if (err) {
        console.error('Error fetching user details:', err);
        return callback({ error: err.code, message: err.message }, null);
      }

      const user = userResult[0];  // Assuming there's only one user per booking

      if (!user) {
        // console.log('User not found');
        return callback({ error: 'User not found', message: 'No user found with this booking ID' }, null);
      }

      // Send email notification to the service provider 
      // const serviceProviderMailOptions = {
      //   from: 'shimservices5@gmail.com',
      //   to: SP_Email, // Service provider email
      //   subject: 'Booking Status Updated',
      //   text: `Your booking with ID ${bookingId} has been updated to ${newStatus}
      //   Details:
      //   Customer Name:${user.Customer_Name}.
      //   Customer Address: ${user.Book_HouseNo},${user.Book_Area},${user.Book_City},${user.Book_City_PIN}, ${user.Book_State}
      //   Service Name : ${user.Service_Name}
      //   Service Category: ${user.Service_Category}
      //   Appointment Date: ${user.Appointment_Date}`
      // };

      // try {
      //   await transporter.sendMail(serviceProviderMailOptions);
      //   console.log('Service provider email sent successfully!');
      // } catch (emailError) {
      //   console.error('Error sending service provider email:', emailError);
      // }

      // Send email notification to the user
      // const userMailOptions = {
      //   from: 'shimservices5@gmail.com',
      //   to: user.U_Email, // User email
      //   subject: 'Booking Status Updated',
      //   text: `Your booking with ID ${bookingId} has been updated to ${newStatus}.
      //   Details:
      //   Service Provider Email: ${user.SP_Email}
      //   Customer Address: ${user.Book_HouseNo},${user.Book_Area},${user.Book_City},${user.Book_City_PIN}, ${user.Book_State}
      //   Service Name : ${user.Service_Name}
      //   Service Category: ${user.Service_Category}
      //   Appointment Date: ${user.Appointment_Date}
      //   `
      // };

      // try {
      //   await transporter.sendMail(userMailOptions);
      //   console.log('User email sent successfully!');
      // } catch (emailError) {
      //   console.error('Error sending user email:', emailError);
      // }

      // Send SMS notification to the user (user's phone)
      const phoneNumber = user.U_Phone;  // Get phone number from user details
      try {
        await client.messages.create({
          body: 
        `
        Your booking with ID ${bookingId} is now ${newStatus}.
        Details:
        Service Provider Email: ${user.SP_Email}
        Customer Address: ${user.Book_HouseNo},${user.Book_Area},${user.Book_City},${user.Book_City_PIN}, ${user.Book_State}
        Service Name : ${user.Service_Name}
        Service Category: ${user.Service_Category}
        Appointment Date: ${user.Appointment_Date}
        `,
          from: '+16672132408', // Your Twilio number
          to: phoneNumber
        });
        // console.log('SMS sent successfully!');
      } catch (smsError) {
        console.error('Error sending SMS:', smsError);
      }

      // Return result after status update and sending notifications
      callback(null, result);
    });
  });
};



// Function for handling booking status after payment
export const updateBookingStatusAfterPayment = (bookingId, newStatus, callback) => {
  const query = `
    UPDATE bookings
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

// Function for handling checkbox (mark booking as completed)
export const updateBookingStatusAfterCheckbox = (bookingId, callback) => {
  const query = `
    UPDATE bookings 
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
