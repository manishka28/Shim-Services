import mysql from 'mysql2';
import dotenv from 'dotenv'; 
dotenv.config({ path: 'C:\\Users\\HP\\OneDrive\\Desktop\\SHIM\\Shim-Services\\Backend\\.env' });
console.log(process.env.DB_PASSWORD);

const connection = mysql.createConnection({
  host: process.env.DB_HOST,        // Replace with your database host
  user: process.env.DB_USER,             // Replace with your database user


  password: process.env.DB_PASSWORD,     // Replace with your database password

  database: process.env.DB_NAME   // Replace with your database name
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
