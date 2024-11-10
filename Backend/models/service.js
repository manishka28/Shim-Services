// models/service.js
import connection from '../db/connection.js';

// Get all services
export const getAllServices = (callback) => {
  connection.query('SELECT * FROM service', (err, results) => {
    if (err) {
      console.error('Error fetching services:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Add a new service
export const addService = (serviceData, callback) => {
  const { Service_Name, Service_Category, Initial_Price } = serviceData;

  // Check if the service already exists (based on the primary key: Service_Name + Service_Category)
  connection.query(
    'SELECT * FROM service WHERE Service_Name = ? AND Service_Category = ?',
    [Service_Name, Service_Category],
    (err, results) => {
      if (err) {
        console.error('Error checking service existence:', err);
        return callback(err, null);
      }

      if (results.length > 0) {
        return callback({ error: 'Service already exists' }, null);
      }

      // Insert new service
      const query = `
        INSERT INTO service (Service_Name, Service_Category, Initial_Price)
        VALUES (?, ?, ?)
      `;
      connection.query(
        query,
        [Service_Name, Service_Category, Initial_Price],
        (err, result) => {
          if (err) {
            console.error('Error adding service:', err);
            return callback({ error: err.code, message: err.message }, null);
          }
          callback(null, result);
        }
      );
    }
  );
};
