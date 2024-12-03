import connection from '../db/connection.js';
export const getAllSPSalaryByAdmin = async () => {
  try {
    // SQL query to fetch all records with a join
    const query = `
      SELECT *
      FROM sp_salary ss
      JOIN serviceprovider s
      ON ss.SP_Email = s.SP_Email;
    `;

    // Execute the query
    const [rows] = await connection.promise().query(query);

    // Return the results
    return rows.length > 0 ? rows : []; // Return the rows or an empty array if no data
  } catch (error) {
    console.error('Error fetching SP salary data:', error);
    throw error; // Propagate the error
  }
};

