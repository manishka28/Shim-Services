import connection from '../db/connection.js';

// Get all service providers
export const getAllServiceProviders = (callback) => {
  connection.query('SELECT * FROM serviceprovider', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Add a new service provider
export const addServiceProvider = (serviceProviderData, callback) => {
  const {
    SP_Email,
    SP_PIN,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
    LanguageSpoken,
    GovernmentID,
    CityName,
    State,
    Country,
    AccountNo,
    IFSCcode,
    Bank_Name,
    Branch_Name
  } = serviceProviderData;

  // Check if the CityName exists before inserting
  connection.query('SELECT * FROM city WHERE City_Name = ?', [CityName], (err, results) => {
    if (err) {
      console.error('Error checking location:', err);
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback({ error: 'City does not exist in the city table' }, null);
    }

    // Insert query for adding new service provider with all required columns
    const query = `
      INSERT INTO serviceprovider 
      (SP_Email, SP_PIN, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, LanguageSpoken, GovernmentID, CityName, State, Country, AccountNo, IFSCcode, Bank_Name, Branch_Name)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?)
    `;

    connection.query(
      query,
      [SP_Email, SP_PIN, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday,  LanguageSpoken, GovernmentID, CityName, State, Country, AccountNo, IFSCcode, Bank_Name, Branch_Name],
      (err, result) => {
        if (err) {
          console.error('Error inserting service provider:', err);
          return callback({ error: err.code, message: err.message }, null);
        }
        callback(null, result);
      }
    );
  });
};

// Fetch the service name(s) of a specific service provider
export const getServiceNamesByServiceProvider = (SP_Email, callback) => {
  const query = `
    SELECT Service_Name 
    FROM sp_services 
    WHERE SP_Email = ?
  `;

  // console.log('Executing query:', query, 'with SP_Email:', SP_Email); // Debugging print

  connection.query(query, [SP_Email], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return callback(err, null);
    }

    if (results.length === 0) {
      return callback({ message: 'No services found for this service provider' }, null);
    }

    // console.log('Query results:', results); // Debugging print
    callback(null, results);
  });
};

//fetching city shruti


// Fetch city and mobile number by service provider's email
export const getCityAndMobileByEmail = (SP_Email, callback) => {
  const query1 = `
    SELECT CityName 
    FROM serviceprovider
    WHERE SP_Email = ?
  `;
  const query2 = `
    SELECT U_Phone
    FROM user
    WHERE U_Email = ?
  `;

  // console.log('Executing query for service provider city:', query1, 'with SP_Email:', SP_Email);

  connection.query(query1, [SP_Email], (err, results) => {
    if (err) {
      console.error('Error executing query for city:', err);
      return callback(err, null);
    }

    if (results.length === 0) {
      return callback({ message: 'No data found for this service provider' }, null);
    }

    // console.log('City query results:', results);

    // Now execute the query for the phone number
    connection.query(query2, [SP_Email], (err2, results2) => {
      if (err2) {
        console.error('Error executing query for phone:', err2);
        return callback(err2, null);
      }

      if (results2.length === 0) {
        return callback({ message: 'No phone data found for this user' }, null);
      }

      // console.log('Phone query results:', results2);

      // Combine the results and return them
      const data = {
        CityName: results[0].CityName,
        SP_Phone: results2[0].U_Phone
      };

      callback(null, data);
    });
  });
};


//shruti - for view sp
export const getSPDetails = (SP_Email, callback) => {
  const query = `SELECT * 
FROM sp_services s 
JOIN serviceprovider sp 
ON s.SP_Email = sp.SP_Email 
WHERE s.SP_Email = ?;
`;
  connection.query(query, [SP_Email], (error, results) => {
    if (error) {
      return callback(error, null); // Handle error
    }
    return callback(null, results); // Return results
  });
};


export const getSPServices = (SP_Email, callback) => {
  const query = `SELECT * FROM bookings WHERE SP_Email = ?`; // Correct query to fetch all bookings for the service provider
  
  connection.query(query, [SP_Email], (error, results) => {
    if (error) {
      return callback(error, null); // Handle error
    }

    // Check if results are empty and return an appropriate message
    if (results.length == 0) {
      // console.log("no service provided yet")
      return callback(null, []);
    }

    // Return all results (multiple bookings)
    return callback(null, results);
  });
};












