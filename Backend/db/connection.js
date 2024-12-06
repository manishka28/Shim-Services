import mysql from 'mysql2';
import dotenv from 'dotenv'; 
import path from 'path';


dotenv.config({ path: path.resolve('./.env') });


console.log('DB_HOST:', process.env.MYSQLHOST);
console.log('DB_USER:', process.env.MYSQLUSER);
console.log('DB_PASSWORD:', process.env.MYSQL_ROOT_PASSWORD);
console.log('DB_PORT:', process.env.MYSQLPORT);
console.log('DB_NAME:', process.env.MYSQL_DATABASE);


const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,        // Replace with your database host
  user: process.env.MYSQLUSER,
  port: process.env.MYSQLPORT,              // Replace with your database user


  password: process.env.MYSQL_ROOT_PASSWORD,     // Replace with your database password

  database: process.env.MYSQL_DATABASE   // Replace with your database name
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
