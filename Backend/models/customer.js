import connection from '../db/connection.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Get all customers
export const getAllCustomers = (callback) => {
  connection.query('SELECT * FROM user', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return callback(err, null);
    }
    // console.log('Query results:', results); 
    callback(null, results);
  });
};

// Add a new customer
export const addCustomer = (customerData, callback) => {
  const { U_Name, U_Email, U_Phone, U_Password, is_SP,joining_Date,Active } = customerData;
  
    // console.log('Checking for existing email or phone:', U_Email, U_Phone);
  
    // Check if email or phone already exists
    connection.query('SELECT * FROM user WHERE U_Email = ? OR U_Phone = ?', [U_Email, U_Phone], (err, results) => {
      if (err) {
        console.error('Error checking email or phone:', err);
        return callback(err, null);
      }
  
      // console.log('Query results for existing email or phone:', results);
  
      if (results.length > 0) {
        return callback({ error: 'Email or Phone already exists' }, null);
      }

    // Hash the password
    bcrypt.hash(U_Password, 10, (hashErr, hashedPassword) => {
      if (hashErr) {
        console.error('Error hashing password:', hashErr);
        return callback({ error: 'Failed to hash password' }, null);
      }
    
      // Insert the customer with the hashed password
      const query = `
        INSERT INTO user (U_Name, U_Email, U_Phone, U_Password, is_SP,joining_Date,Active)
        VALUES (?, ?, ?, ?, ?,?,?)
      `;
      connection.query(query, [U_Name, U_Email, U_Phone, hashedPassword, is_SP,joining_Date,Active], (err, result) => {
        if (err) {
          console.error('Error inserting customer:', err);
          return callback({ error: err.code, message: err.message }, null);
        }
        callback(null, result);
      });
    });
    
  });
};

// Update is_SP for Customer
export const updateIsSP = (U_Email, is_SP, callback) => {
  const query = `
    UPDATE user
    SET is_SP = ?
    WHERE U_Email = ?
  `;

  connection.query(query, [is_SP, U_Email], (err, result) => {
    if (err) {
      console.error('Error updating is_SP:', err);
      return callback({ error: err.code, message: err.message }, null);
    }

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      return callback({ error: 'User not found or no update needed' }, null);
    }

    callback(null, result);
  });
};

export const userDetails = (U_Email, callback) => {
  const query = `SELECT * FROM user WHERE U_Email = ?`;
  connection.query(query, [U_Email], (err, results) => {
    if (err) {
      console.error("Error fetching user details:", err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};




