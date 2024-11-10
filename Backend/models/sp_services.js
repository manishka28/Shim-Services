import connection from '../db/connection.js';

// Retrieve all services for a specific service provider
export const getAllServicesForProvider = (spEmail, callback) => {
  connection.query(
    'SELECT * FROM sp_services WHERE SP_Email = ?',
    [spEmail],
    (err, results) => {
      if (err) {
        console.error('Error fetching services:', err);
        return callback(err, null);
      }
      callback(null, results);
    }
  );
};

// Add a new service for a specific service provider
export const addNewServiceForProvider = (serviceData, callback) => {
  const { SP_Email, Service_Name, Service_Category, Service_Experience } = serviceData;

  // Check if the service already exists (based on the composite key: SP_Email + Service_Name + Service_Category)
  connection.query(
    'SELECT * FROM sp_services WHERE SP_Email = ? AND Service_Name = ? AND Service_Category = ?',
    [SP_Email, Service_Name, Service_Category],
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
        INSERT INTO sp_services (SP_Email, Service_Name, Service_Category, Service_Experience)
        VALUES (?, ?, ?, ?)
      `;
      connection.query(
        query,
        [SP_Email, Service_Name, Service_Category, Service_Experience],
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
