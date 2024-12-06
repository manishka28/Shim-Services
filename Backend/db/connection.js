import mysql from 'mysql2';
import dotenv from 'dotenv'; 
import path from 'path';


dotenv.config({ path: path.resolve('./.env') });


console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_NAME:', process.env.DB_NAME);


const connection = mysql.createConnection({
  host: process.env.DB_HOST,        // Replace with your database host
  user: process.env.DB_USER,
  port: process.env.DB_PORT,              // Replace with your database user


  password: process.env.DB_PASSWORD,     // Replace with your database password

  database: process.env.DB_NAME   // Replace with your database name
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log(`Connected to the MySQL database ${process.env.DB_NAME}`);
});

export default connection;
