import connection from '../db/connection.js';

// Get all bills
export const getAllBills = (callback) => {
  connection.query('SELECT * FROM bill', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};


// Add a new bill
export const addBill = (billData, callback) => { 
  const { Book_ID, Bill_Date, Bill_Mode, Labor_Entries, Total_Cost } = billData;

  // Insert query for adding a new bill
  const query = `
    INSERT INTO bill (Book_ID, Bill_Date, Bill_Mode, Labor_Entries, Total_Cost)
    VALUES (?, ?, ?, ?, ?)
  `;

  // Insert the bill data with labor entries and total cost
  connection.query(query, [Book_ID, Bill_Date, Bill_Mode, JSON.stringify(Labor_Entries), Total_Cost + Total_Cost*0.05], (err, result) => {
    if (err) {
      console.error('Error inserting bill:', err);
      return callback({ error: err.code, message: err.message }, null);
    }

    // Now query the Bill_ID of the last inserted bill (this is assuming Bill_ID is auto-incremented)
    const lastInsertQuery = `SELECT Bill_ID FROM bill WHERE Book_ID = ? ORDER BY Bill_ID DESC LIMIT 1`;

    connection.query(lastInsertQuery, [Book_ID], (err, rows) => {
      if (err) {
        console.error('Error fetching Bill_ID:', err);
        return callback({ error: err.code, message: err.message }, null);
      }

      if (rows.length > 0) {
        const newBillId = rows[0].Bill_ID; // Get the last inserted Bill_ID
        callback(null, { Bill_ID: newBillId });
      } else {
        callback({ error: 'Unable to retrieve Bill_ID' }, null);
      }
    });
  });
};


// Get a specific bill by Book_ID
export const getBillById = (Book_ID, callback) => {
  connection.query(`
    SELECT * FROM 
    bill B
    JOIN
    bookings BK
    ON B.Book_ID=BK.Book_ID
    WHERE BK.Book_ID = ?
    `, [Book_ID], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return callback(err, null);
    }

    if (results.length === 0) {
      return callback({ error: 'Bill not found' }, null);
    }

    callback(null, results[0]);
  });
};

//updating razorpay_payment_id in db
export const updateRazorpayPaymentId = (billId, razorpay_payment_id, callback) => {
  const query = 'UPDATE bill SET Payment_ID = ? WHERE bill_id = ?';

  connection.query(query, [razorpay_payment_id, billId], (err, result) => {
    if (err) {
      console.error('Error updating Razorpay payment ID:', err);
      return callback({ error: err.code, message: err.message }, null);
    }
    callback(null, result);
  });
};

//cash payments -- shruti

export const cashPayment = async (bookId) => {
  try {
    // SQL query to get the payment mode (Bill_Mode) for the given Book_ID
    const query = 'SELECT Bill_Mode FROM bill WHERE Book_ID = ?';

    // Use the query method to fetch data
    const [rows] = await connection.promise().query(query, [bookId]);

    // Check if a result was found
    if (rows.length > 0) {
      return rows[0].Bill_Mode;  // Return the payment mode (Bill_Mode) for the order
    } else {
      // If no record is found, return null or handle the case as needed
      return null;
    }
  } catch (error) {
    console.error('Error fetching payment mode:', error);
    throw error;  // Propagate the error for further handling (e.g., in the controller)
  }
};