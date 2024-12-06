import connection from "../db/connection.js";
export const addSalary = (details, callback) => {
  const { SP_Email, Salary, month, year, amount_to_pay } = details;

  // Check if the required fields are provided
  if (!SP_Email  || !month || !year) {
    console.log('Missing required fields:', { SP_Email, month, year });
    return callback({ error: 'Missing required fields' }, null);
  }

  // console.log('Adding/updating salary for:', { SP_Email, Salary, month, year, amount_to_pay });

  // Insert or update the salary and amount_to_pay if a record with the same SP_Email, month, and year already exists
  const query = `
    INSERT INTO sp_salary (SP_Email, month, year, Salary, amount_to_pay)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      Salary = Salary + VALUES(Salary),
      amount_to_pay =amount_to_pay+ VALUES(amount_to_pay)
  `;

  connection.query(query, [SP_Email, month, year, Salary, amount_to_pay], (err, result) => {
    if (err) {
      console.error('Database error while adding/updating salary:', err);
      return callback(err, null);
    }

    // console.log('Salary added or updated successfully:', result);
    callback(null, result);
  });
};

export const fetchTotalCostForSP = (details, callback) => {
  const { SP_Email, Bill_Mode } = details;

  // Check if the required fields are provided
  if (!SP_Email || !Bill_Mode) {
    console.log('Missing required fields:', { SP_Email, Bill_Mode }); // Debugging missing fields
    return callback({ error: 'Missing required fields' }, null);
  }

  console.log('Fetching total cost for:', { SP_Email, Bill_Mode }); // Log the incoming data for debugging

  // Construct the query to fetch total cost for the service provider
  const query = `
    SELECT SUM(B.Total_Cost) AS TotalCost 
    FROM bill B 
    JOIN bookings K ON K.Book_ID = B.Book_ID
    WHERE K.SP_Email = ? 
      AND K.Book_Status = "Completed" 
      AND B.Bill_Mode = ?`;

  connection.query(query, [SP_Email, Bill_Mode], (err, result) => {
    if (err) {
      console.error('Database error:', err); // Log the error for debugging
      return callback({ error: 'Database error occurred' }, null);  // Provide a generic error message
    }

    console.log('Query result:', result); // Log the query result for debugging

    // Check if any result was returned
    if (result.length === 0) {
      
      console.log('No records found for the given SP_Email and Bill_Mode');
      
      // Push a TotalCost of 0 into result and return result[0].TotalCost
      result.push({ TotalCost: 0 }); // If no results, return a TotalCost of 0
    }

    // Return the result (ensure to access TotalCost properly)
    console.log('Returning total cost:', result[0].TotalCost); // Log the final total cost
    callback(null, result[0].TotalCost);  // result[0] should contain the TotalCost
  });
};



export const fetchTotalCostForSPByMonth = (details, callback) => {
  const { SP_Email, Bill_Mode, Month, Year } = details;

  // Check if the required fields are provided
  if (!SP_Email || !Bill_Mode || !Month || !Year) {
    console.log('Missing required fields:', { SP_Email, Bill_Mode, Month, Year }); // Debugging missing fields
    return callback({ error: 'Missing required fields' }, null);
  }

  // console.log('Fetching total cost for:', { SP_Email, Bill_Mode, Month, Year }); // Log the incoming data for debugging

  // Construct the query to fetch total cost for the specified month and year
  const query = `
    SELECT SUM(B.Total_Cost) AS TotalCost 
    FROM bill B 
    JOIN bookings K ON K.Book_ID = B.Book_ID
    WHERE K.SP_Email = ? 
      AND K.Book_Status = "Completed" 
      AND B.Bill_Mode = ?
      AND MONTH(B.Bill_Date) = ?
      AND YEAR(B.Bill_Date) = ?`;

  connection.query(query, [SP_Email, Bill_Mode, Month, Year], (err, result) => {
    if (err) {
      console.error('Database error:', err); // Log the error for debugging
      return callback({ error: 'Database error occurred' }, null);  // Provide a generic error message
    }

    // console.log('Query result:', result); // Log the query result for debugging

    // Check if any result was returned
    if (result.length === 0 || result[0].TotalCost === null) {
      // console.log('No records found for the given criteria');
      result.push({ TotalCost: 0 });   // If no results, return a TotalCost of 0
    }

    // Return the result (ensure to access TotalCost properly)
    // console.log('Returning total cost for month:', result[0].TotalCost); // Log the final total cost
    callback(null, result[0].TotalCost);  // result[0] should contain the TotalCost
  });
};


export const fetchSalaryForSPByMonth = (details, callback) => {
  const { SP_Email, month, year } = details;

  // Check if the required fields are provided
  if (!SP_Email ||  !month || !year) {
    // console.log('Missing required fields:', { SP_Email, month, year }); // Debugging missing fields
    return callback({ error: 'Missing required fields' }, null);
  }

  // console.log('Fetching total cost for:', { SP_Email, Bill_Mode, Month, Year }); // Log the incoming data for debugging

  // Construct the query to fetch total cost for the specified month and year
  const query = `
    select Salary from sp_salary
where SP_email=?
AND month=?
AND year=?;`;

  connection.query(query, [SP_Email, month,year], (err, result) => {
    if (err) {
      console.error('Database error:', err); // Log the error for debugging
      return callback({ error: 'Database error occurred' }, null);  // Provide a generic error message
    }

    // console.log('Query result:', result); // Log the query result for debugging

    // Check if any result was returned
    if (result.length === 0 || result[0].Salary === null) {
      // console.log('No records found for the given criteria');
      result.push({ Salary: 0 });   // If no results, return a TotalCost of 0
    }

    // Return the result (ensure to access TotalCost properly)
    // console.log('Returning total cost for month:', result[0].Salary); // Log the final total cost
    callback(null, result[0].Salary);  // result[0] should contain the TotalCost
  });
};
export const fetchAmountToPayForSPByMonth = (details, callback) => {
  const { SP_Email, month, year } = details;

  // Check if the required fields are provided
  if (!SP_Email ||  !month || !year) {
    // console.log('Missing required fields:', { SP_Email, month, year }); // Debugging missing fields
    return callback({ error: 'Missing required fields' }, null);
  }

  // console.log('Fetching total cost for:', { SP_Email, Bill_Mode, Month, Year }); // Log the incoming data for debugging

  // Construct the query to fetch total cost for the specified month and year
  const query = `
    select amount_to_pay from sp_salary
where SP_email=?
AND month=?
AND year=?;`;

  connection.query(query, [SP_Email, month,year], (err, result) => {
    if (err) {
      console.error('Database error:', err); // Log the error for debugging
      return callback({ error: 'Database error occurred' }, null);  // Provide a generic error message
    }

    // console.log('Query result:', result); // Log the query result for debugging

    // Check if any result was returned
    if (result.length === 0 || result[0].amount_to_pay === null) {
      // console.log('No records found for the given criteria');
      result.push({ amount_to_pay: 0 });   // If no results, return a TotalCost of 0
    }

    // Return the result (ensure to access TotalCost properly)
    // console.log('Returning amnt to pay for month:', result[0].amount_to_pay); // Log the final total cost
    callback(null, result[0].amount_to_pay);  // result[0] should contain the TotalCost
  });
};

export const updateAmountToPayForSPByMonth = (details, callback) => { 
  const { SP_Email, month, year, amountToPay } = details;

  // Check if the required fields are provided
  if (!SP_Email || !month || !year || amountToPay === undefined) {
    // console.log('Missing required fields:', { SP_Email, month, year, amountToPay }); // Debugging missing fields
    return callback({ error: 'Missing required fields' }, null);
  }

  // console.log('Updating amount to pay for:', { SP_Email, month, year, amountToPay }); // Log the incoming data for debugging

  // Construct the query to update the amount_to_pay for the specified month and year
  const query = `
    UPDATE sp_salary
    SET amount_to_pay = ?
    WHERE SP_email = ?
    AND month = ?
    AND year = ?;
  `;

  connection.query(query, [amountToPay, SP_Email, month, year], (err, result) => {
    if (err) {
      console.error('Database error:', err); // Log the error for debugging
      return callback({ error: 'Database error occurred' }, null);  // Provide a generic error message
    }

    // console.log('Query result:', result); // Log the query result for debugging

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      // console.log('No records updated for the given criteria');
      return callback({ error: 'No records found to update' }, null);  // If no rows affected, return error
    }

    // console.log('Successfully updated amount to pay for month:', amountToPay); // Log the success
    callback(null, { success: true, amount_to_pay: amountToPay });  // Return the updated amount to pay
  });
};
