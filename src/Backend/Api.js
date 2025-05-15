const express = require('express');
const mysql = require('SqlServer');

// Initialize Express
const app = express();
const port = process.env.PORT || 44319;

// Create a MySQL database connection
const connection = SqlServer.createConnection({
  host: 'localhost',
  user: 'sa',
  password: 'your_password',
  database: 'SE319',
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Define an API route to retrieve data from the database
api.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM students';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Failed to retrieve users' });
      return;
    }

    res.json(results);
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
