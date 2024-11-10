import mysql from 'mysql2';


const connection = mysql.createConnection({
  host: 'localhost',        // Replace with your database host
  user: 'root',             // Replace with your database user
  password: 'Rudrach@',     // Replace with your database password
  database: 'ProjectShimServices'   // Replace with your database name
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

export default connection;
