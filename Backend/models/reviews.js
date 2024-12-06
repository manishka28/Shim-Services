import connection from "../db/connection.js";

export const getReviewsByServiceName = (Service_Name, callback) => {
  const query = `
    SELECT * FROM 
    rating R
    JOIN bill B ON R.Bill_ID = B.Bill_ID
    JOIN bookings BK ON B.Book_ID = BK.Book_ID
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
  const query1 = `SELECT U_Email, SP_Email FROM bookings WHERE Book_Id = ?`;

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





//isha shruti 


export const getRatingsByCategory = (category, callback) => {
  const query = `
    SELECT b.Service_Name, b.Service_Category, AVG(r.RATING) AS avg_rating, 
    COUNT(*) AS total_reviews
    FROM rating r
    INNER JOIN bill bl ON r.Bill_ID = bl.Bill_ID
    INNER JOIN bookings b ON bl.Book_ID = b.Book_ID
    WHERE b.Service_Name = ?
    GROUP BY b.Service_Category;
  `;

  connection.query(query, [category], (err, results) => {
    if(err){
      console.error('Error fetching ratings', err);
      return callback(err, null);
    }
    callback(null, results); // Ensure you pass results back to the callback
  });
}


//shruti admin dashboard rting
export const getAllRating=(callback)=>{
  const query=`SELECT * FROM 
    bookings
JOIN 
    bill ON bookings.Book_ID = bill.Book_ID
JOIN 
    rating ON rating.Bill_ID = bill.Bill_ID`;
    connection.query(query, (err, results)=>{
      if (err) {
        console.error("Error fetching rating:", err);
        callback(err, null);
      } else {
        callback(null, results);
      }
    })
}



//reviews by sp  Manishka
export const getServiceProviderRatings = (serviceName, callback) => {
  // console.log("service name in model",serviceName);
  
  const query = `
    SELECT 
    bk.SP_Email,
    u1.U_Email,
    u1.U_Name AS User_Name,  -- Name of the user who left the review
    u2.U_Name AS SP_Name,    -- Name of the service provider
    r.Rating,
    r.Review,
    r.Rate_Date,
    AVG(r.Rating) OVER (PARTITION BY bk.SP_Email) AS Avg_Rating,
    bk.Service_Category
FROM rating r
JOIN bill b ON r.Bill_ID = b.Bill_ID
JOIN bookings bk ON bk.Book_ID = b.Book_ID
JOIN user u1 ON bk.U_Email = u1.U_Email  -- User who left the review
JOIN user u2 ON bk.SP_Email = u2.U_Email  -- Service provider
WHERE bk.Service_Name = ?
ORDER BY bk.SP_Email, r.Rate_Date;

  `;

  connection.query(query, [serviceName], (err, results) => {
    if (err) {
      // console.log("Error fetching service provider ratings:", err);
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback({ message: "No ratings found for the specified service" }, null);
    }
    callback(null, results);
  });
};
