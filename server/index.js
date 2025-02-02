const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const path = require('path');

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); // Allow frontend to make requests

// Connect to MySQL database
const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'bulakappdb',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

// Start the server
app.listen(3002, () => {
  console.log('Server is running on port 3002');
});

// ************** USER AUTHENTICATION ************

// Route to handle user registration
app.post('/register', (req, res) => {
  const { email, username, password } = req.body;

  const SQL = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
  db.query(SQL, [email, username, password], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      res.status(500).send({ message: 'Error: Could not register user.' });
    } else {
      res.status(201).send({ message: 'User registered successfully!' });
    }
  });
});

// Route to handle user login
app.post('/login', (req, res) => {
  const { loginEmail, loginPassword } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [loginEmail, loginPassword], (err, result) => {
    if (err) {
      console.error('Error logging in:', err);
      res.status(500).send({ error: 'Database error' });
    } else if (result.length > 0) {
      res.send({ message: "Login successful", success: true, user: result[0] });
    } else {
      res.status(401).send({ message: "Invalid email or password", success: false });
    }
  });
});

// ************** FLOWER DATABASE ROUTES ************

// Route to get flower data by ID
app.get('/flower/:id', (req, res) => {
  const flowerId = req.params.id;

  const sql = 'SELECT * FROM flowers WHERE id = ?';
  db.query(sql, [flowerId], (err, result) => {
    if (err) {
      console.error('Error fetching flower data:', err);
      res.status(500).send({ message: 'Error: Could not retrieve flower data.' });
    } else if (result.length > 0) {
      res.status(200).send(result[0]);
    } else {
      res.status(404).send({ message: 'Flower not found.' });
    }
  });
});

// Route to get all flower types
app.get('/flower-types', (req, res) => {
  const sql = 'SELECT * FROM flower_types';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching flower types:', err);
      res.status(500).send({ message: 'Error: Could not retrieve flower types.' });
    } else {
      res.status(200).send(result);
    }
  });
});

// Route to get all flowers
app.get('/flowers', (req, res) => {
  const sql = 'SELECT * FROM flowers';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching flowers:', err);
      res.status(500).send({ message: 'Error: Could not retrieve flowers.' });
    } else {
      res.status(200).send(result);
    }
  });
});

// Route to get flowers by type
app.get('/api/flowers', (req, res) => {
  const { flower_type_id } = req.query;
  const query = 'SELECT * FROM flowers WHERE flower_type_id = ?';
  
  db.query(query, [flower_type_id], (err, results) => {
    if (err) {
      console.error('Error fetching flowers by type:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// ************** IMAGE UPLOAD & DETECTION (YOLO) ************

// Set up multer for handling image uploads
const upload = multer({ storage: multer.memoryStorage() });

// Route to handle image uploads and detection
app.post('/detect', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'No image uploaded.' });
    }

    // Send the image to the Python API for YOLO detection
    const response = await axios.post(
      'http://localhost:8000/detect/',
      req.file.buffer,
      {
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      }
    );

    res.status(200).send(response.data);
  } catch (error) {
    console.error('Error during detection:', error);
    res.status(500).send({ message: 'Error: Detection failed.' });
  }
});

// ************** PROFILE SETTINGS ************

// Route to fetch user details
app.get('/api/user/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT email, username, picture FROM users WHERE id = ?';

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ message: 'Error fetching user data' });
    } else if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});

// Route to update user profile
app.put('/api/update-profile/:id', upload.single('profileImage'), (req, res) => {
  const userId = req.params.id;
  const { email, username, password } = req.body;
  const profileImage = req.file ? req.file.filename : null;

  let sql = 'UPDATE users SET email = ?, username = ?';
  let values = [email, username];

  if (password) {
    sql += ', password = ?';
    values.push(password);
  }
  
  if (profileImage) {
    sql += ', picture = ?';
    values.push(profileImage);
  }

  sql += ' WHERE id = ?';
  values.push(userId);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating profile:', err);
      res.status(500).json({ message: 'Error updating profile' });
    } else {
      res.json({ message: 'Profile updated successfully!' });
    }
  });
});
