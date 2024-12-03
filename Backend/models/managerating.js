import connection from "../db/connection.js";

export const getAllReportsByAdmin = async () => {
  try {
    // SQL query to select all records from the report table
    const query = `
      SELECT *
      FROM report;
    `;

    // Execute the query
    const [rows] = await connection.promise().query(query);

    // Check if any records were found
    if (rows.length > 0) {
      return rows; // Return all report records
    } else {
      // If no records are found, return an empty array or handle as needed
      return [];
    }
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error; // Propagate the error for further handling (e.g., in the API controller)
  }
};
export const updateReportStatusToRejected = async (reportId, adminEmail) => {
  try {
    // SQL query to update the report status and email in the report table
    const query = `
      UPDATE report
      SET Report_Status = 'Rejected', A_Email = ?
      WHERE Report_ID = ?;
    `;

    // Execute the query
    const [result] = await connection.promise().query(query, [adminEmail, reportId]);

    // Check if any rows were affected
    if (result.affectedRows > 0) {
      return { message: 'Report updated successfully' };
    } else {
      return { message: 'No report found with the given ID' };
    }
  } catch (error) {
    console.error('Error updating report:', error);
    throw error; // Propagate the error for further handling (e.g., in the API controller)
  }
};
export const updateReportToResolvedAndUserStatus = async (reportId, adminEmail, userEmail) => {
  try {
    // SQL queries to update the report status and user status
    const query1 = `
      UPDATE report
      SET Report_Status = 'Resolved', A_Email = ?
      WHERE Report_ID = ?;
    `;

    const query2 = `
      UPDATE user
      SET Active = 0
      WHERE U_Email = ?;
    `;

    // Execute the queries with the provided parameters
    const [result1] = await connection.promise().query(query1, [adminEmail, reportId]);
    const [result2] = await connection.promise().query(query2, [userEmail]);

    // Check if both queries were successful
    if (result1.affectedRows > 0 && result2.affectedRows > 0) {
      return { message: 'Report and user status updated successfully' };
    } else {
      return { message: 'No matching records found for the given IDs' };
    }
  } catch (error) {
    console.error('Error updating report and user status:', error);
    throw error; // Propagate the error for further handling (e.g., in the API controller)
  }
};

