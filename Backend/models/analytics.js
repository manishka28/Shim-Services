import connection from '../db/connection.js';

export const getTotalCost = async () => {
  try {
    // SQL query to calculate the total cost from all records in the bill table
    // console.log("fetching");
    
    const query = `
      SELECT (SUM(Total_Cost) / 10) AS total_cost
      FROM bill;
    `;

    // Execute the query
    const [rows] = await connection.promise().query(query);
    // console.log(rows);
    

    // Check if a result was found
    if (rows.length > 0) {
      return rows[0].total_cost; // Return the total cost
    } else {
      // If no record is found, return 0 or handle the case as needed
      return 0;
    }
  } catch (error) {
    console.error('Error calculating total cost:', error);
    throw error; // Propagate the error for further handling (e.g., in the API controller)
  }
};

export const getMonthlySales = async (month, year) => {
  try {
    // SQL query to calculate total sales
    const query = `
      SELECT (SUM(Total_Cost) / 10) AS total_sales
      FROM bill
      WHERE MONTH(Bill_Date) = ? AND YEAR(Bill_Date) = ?;
    `;
    
    

    // Execute the query with parameters
    const [rows] = await connection.promise().query(query, [month, year]);

    // Check if a result was found
    if (rows.length > 0) {
      return rows[0].total_sales; // Return the total sales for the given month and year
    } else {
      // If no record is found, return 0 or handle the case as needed
      return 0;
    }
  } catch (error) {
    console.error('Error calculating total sales:', error);
    throw error; // Propagate the error for further handling (e.g., in the API controller)
  }
};
export const getNewCustomersAndSPs = async(month, year, isSP, callback) => {
  try {
    // Query to get users based on the provided criteria
    const query = `
      SELECT COUNT(*) AS total_count
      FROM user 
      WHERE MONTH(joining_Date) = ? AND YEAR(joining_Date) = ? AND is_SP = ?;
    `;

    connection.query(query, [month, year, isSP], (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        return callback(err, null);
      }
      if (results.length > 0) {
        const totalCount = results[0].total_count;
        callback(null, { totalCount });
      } else {
        callback(null, { totalCount: 0 });
      }
      
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    callback({ error: 'An unexpected error occurred' }, null);
  }
};
export const getTotalCustomersAndSPs = async (isSP, callback) => {
  try {
    // Query to count the total number of customers and SPs based on the provided isSP status
    const query = `
      SELECT 
        COUNT(*) AS total_count 
      FROM user 
      WHERE is_SP = ?;
    `;

    connection.query(query, [isSP], (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        return callback(err, null);
      }

      // Check if any results were returned
      if (results.length > 0) {
        const totalCount = results[0].total_count;
        callback(null, { totalCount });
      } else {
        callback(null, { totalCount: 0 });
      }
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    callback({ error: 'An unexpected error occurred' }, null);
  }
};
export const getDailyRevenue = async (month, year) => {
  return new Promise((resolve, reject) => {
    // Query to fetch daily revenue data for the specified month and year
    const query = `
      SELECT 
        DATE(Bill_Date) AS date,
        SUM(Total_Cost) AS daily_revenue
      FROM 
        bill
      WHERE 
        YEAR(Bill_Date) = ? AND MONTH(Bill_Date) = ?
      GROUP BY 
        DATE(Bill_Date)
      ORDER BY 
        DATE(Bill_Date);
    `;

    connection.query(query, [year, month], (err, results) => {
      if (err) {
        console.error('Error fetching daily revenue data:', err);
        return reject(err);
      }

      // Check if any results were returned
      if (results.length > 0) {
        // Format results into an array of date-revenue pairs
        const revenueData = results.map(row => ({
          date: row.date.toISOString().split('T')[0], // Format as YYYY-MM-DD
          revenue: row.daily_revenue || 0 // Handle null as 0
        }));
        resolve(revenueData);
      } else {
        resolve([]);
      }
    });
  });
};

export const getBookingCountByService = async () => {
  try {
    const query = `
      SELECT COUNT(*) AS booking_count, Service_Name 
      FROM bookings 
      GROUP BY Service_Name;
    `;
    
    // Execute the query and get the results
    const [rows] = await connection.promise().query(query);

    // Return the results
    return rows;
  } catch (error) {
    console.error('Error fetching booking count by service:', error);
    throw error; // Propagate the error for further handling
  }
};
export const getBookingCountByCity = async () => {
  try {
    const query = `
      SELECT COUNT(*) AS booking_count, Book_City 
      FROM bookings 
      GROUP BY Book_City;
    `;
    
    // Execute the query and get the results
    const [rows] = await connection.promise().query(query);

    // Return the results
    return rows;
  } catch (error) {
    console.error('Error fetching booking count by service:', error);
    throw error; // Propagate the error for further handling
  }
};
