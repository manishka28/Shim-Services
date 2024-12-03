import connection from '../db/connection.js';
export const getAllAdminServices = async () => {
  try {
    // SQL query to select all records from the services table
    const query = `
      SELECT *
      FROM services;
    `;

    // Execute the query
    const [rows] = await connection.promise().query(query);

    // Check if any records were found
    if (rows.length > 0) {
      return rows; // Return all service records
    } else {
      // If no records are found, return an empty array or handle as needed
      return [];
    }
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error; // Propagate the error for further handling (e.g., in the API controller)
  }
};


export const addServiceByAdmin = async (adminEmail, serviceName, serviceCategory, initialPrice) => {
  try {
    // SQL query to insert data into the add_services table
    const query1 = `
      INSERT INTO add_services (A_email, Add_Service_Name, Add_Service_Category)
      VALUES (?, ?, ?);
    `;

    // SQL query to insert data into the services table
    const query2 = `
      INSERT INTO services (Service_Name, Service_Category, Initial_Price)
      VALUES (?, ?, ?);
    `;

    // Execute the first query
    await connection.promise().query(query1, [adminEmail, serviceName, serviceCategory]);
    
    // Execute the second query
    await connection.promise().query(query2, [serviceName, serviceCategory, initialPrice]);

    // console.log('Service added successfully.');
  } catch (error) {
    console.error('Error adding service:', error);
    throw error; // Propagate the error for further handling (e.g., in the API controller)
  }
};


export const deleteServiceByAdmin = async (serviceName, serviceCategory) => {
  try {
    // SQL query to delete data from the Services table
    console.log(serviceName,serviceCategory);
    
    const query1 = `
      DELETE FROM Services
      WHERE Service_Name = ? AND Service_Category = ?;
    `;

    // SQL query to delete data from the add_services table
    const query2 = `
      DELETE FROM add_services
      WHERE Add_Service_Name = ? AND Add_Service_Category = ?;
    `;

    // Execute the first query
    await connection.promise().query(query1, [serviceName, serviceCategory]);
    
    // Execute the second query
    await connection.promise().query(query2, [serviceName, serviceCategory]);

    console.log('Service deleted successfully.');
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error; // Propagate the error for further handling (e.g., in the API controller)
  }
};