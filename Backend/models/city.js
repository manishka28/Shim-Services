import connection from '../db/connection.js';

// Function to get all cities
export const getAllCities = (callback) => {
  const query = 'SELECT * FROM city';
  connection.query(query, (err, results) => { // Use connection.query
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Function to add a new city
export const addCity = (city, callback) => {
  const { City_PIN, City_Name, City_State, City_Country } = city;

  // Check if the required fields are provided
  if (!City_PIN || !City_Name || !City_State || !City_Country) {
    return callback({ error: 'Missing required fields' }, null);
  }

  // Insert the city into the database
  const query = 'INSERT INTO city (City_PIN, City_Name, City_State, City_Country) VALUES (?, ?, ?, ?)';
  connection.query(query, [City_PIN, City_Name, City_State, City_Country], (err, result) => { // Use connection.query
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
