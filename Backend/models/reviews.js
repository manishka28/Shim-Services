import connection from "../db/connection.js";

export const getReviewsByServiceName = (Service_Name, callback) => {
  const query = `
    SELECT * FROM 
    rating R
    JOIN bill B ON R.Bill_ID = B.Bill_ID
    JOIN Booking BK ON B.Book_ID = BK.Book_ID
    join user U on
U.U_Email=BK.U_Email
    WHERE Service_Name = ?;
  `;
  
  connection.query(query, [Service_Name], (err, results) => {
    if (err) {
      console.error("Error executing query", err);
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback({ message: "No reviews found" }, null);
    }
    callback(null, results);
  });
};





//shruti insert rating table




export const insertRating = (ratingData, callback) => {
  const { Book_Id, Rating, Review } = ratingData;

  // Step 1: Get Bill_Id from the bill table based on Book_Id
  const query1 = `SELECT Bill_Id FROM bill WHERE Book_Id = ?`;

  connection.query(query1, [Book_Id], (err, results) => {
      if (err) {
          console.error('Error fetching Bill_Id', err);
          return callback({ error: err.code, message: err.message }, null);
      }

      if (results.length === 0) {
          return callback({ error: 'NOT_FOUND', message: 'Bill_Id not found for the given Book_Id' }, null);
      }

      const Bill_Id = results[0].Bill_Id;  // Get the Bill_Id from the result

      // Step 2: Insert the rating with the fetched Bill_Id
      const query2 = `INSERT INTO rating (Bill_Id, Rating, Rate_Date, Review) VALUES (?, ?, NOW(), ?)`;

      connection.query(query2, [Bill_Id, Rating, Review], (err, result) => {
          if (err) {
              console.error('Error inserting rating', err);
              return callback({ error: err.code, message: err.message }, null);
          }
          callback(null, result);
      });
  });
};




export const insertReport = (reportData, callback) => {
  const { Book_Id, Report_Description, Report_Type, Report_Status } = reportData;

  // Step 1: Get U_Email and SP_Email from the booking table based on Book_Id
  const query1 = `SELECT U_Email, SP_Email FROM booking WHERE Book_Id = ?`;

  connection.query(query1, [Book_Id], (err, results) => {
      if (err) {
          console.error('Error fetching U_Email and SP_Email', err);
          return callback({ error: err.code, message: err.message }, null);
      }

      if (results.length === 0) {
          return callback({ error: 'NOT_FOUND', message: 'No booking found for the given Book_Id' }, null);
      }

      const { U_Email, SP_Email } = results[0];  // Get U_Email and SP_Email from the result

      // Step 2: Get Bill_Id from the bill table based on Book_Id
      const query2 = `SELECT Bill_Id FROM bill WHERE Book_Id = ?`;

      connection.query(query2, [Book_Id], (err, billResults) => {
          if (err) {
              console.error('Error fetching Bill_Id', err);
              return callback({ error: err.code, message: err.message }, null);
          }

          if (billResults.length === 0) {
              return callback({ error: 'NOT_FOUND', message: 'No Bill_Id found for the given Book_Id' }, null);
          }

          const Bill_ID = billResults[0].Bill_Id;  // Get Bill_Id from the result

          // Step 3: Insert the report with the fetched U_Email, SP_Email, and Bill_ID
          const insertQuery = `INSERT INTO report (SP_Email, U_Email, Bill_ID, Report_Date, Report_Description, Report_Type, Report_Status)
                               VALUES (?, ?, ?, NOW(), ?, ?, ?)`;

          connection.query(insertQuery, [SP_Email, U_Email, Bill_ID, Report_Description, Report_Type, Report_Status], (err, result) => {
              if (err) {
                  console.error('Error inserting report', err);
                  return callback({ error: err.code, message: err.message }, null);
              }
              callback(null, result);
          });
      });
  });
};



