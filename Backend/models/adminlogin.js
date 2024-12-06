import connection from "../db/connection.js";

export const getAllAdmin = (callback) => {
  connection.query('SELECT * FROM admin', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return callback(err, null);
    }
    // console.log('Query results:', results); 
    callback(null, results);
  });
};

export const adminDetails = (A_Email, callback) => {
  const query = `select * from admin a left join add_services ad on a.A_Email=ad.A_Email where a.A_Email=?`;
  connection.query(query, [A_Email], (err, results) => {
    if (err) {
      console.error("Error fetching admin details:", err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};


//shruti

export const adminReportAction=(A_Email, callback)=>{
  const query='SELECT * FROM report WHERE A_EMAIL=?';
  connection.query(query,[A_Email],(err, results)=>{
    if (err) {
      console.error("Error fetching admin report actions:", err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  })
}



export const invoiceBalance=(callback)=>{
  const query=`select * from bookings b  join bill bl on b.Book_ID=bl.Book_ID`;
  connection.query(query,(err, results)=>{
    if (err) {
      console.error("Error fetching admin report actions:", err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  })
}