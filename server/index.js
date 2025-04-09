const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const path = require('path');
const FormData = require('form-data');

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); // Allow frontend to make requests

// 🔹 **Multer Storage Configuration (Fixes `upload is not defined` error)**
const storage = multer.memoryStorage();
const upload = multer({ storage });



// Connect to MySQL database
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});



db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

// Start the server
// Use Render's dynamic PORT environment variable
const port = process.env.PORT || 3002;  // Fallback to 3002 if not set

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
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

// ======================================================
// 🟢 IMAGE UPLOAD & DETECTION ROUTES
// ======================================================

// 🔹 **Live Detection (No Database Storage)**
app.post("/detect/live/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send({ message: "No image uploaded." });

    const formData = new FormData();
    formData.append("file", req.file.buffer, { filename: "image.jpg" });

    const response = await axios.post("http://127.0.0.1:8000/detect/", formData, {
      headers: formData.getHeaders(),
    });

    res.status(200).send(response.data);
  } catch (error) {
    console.error("Detection error:", error);
    res.status(500).send({ message: "Detection failed." });
  }
});

// 🔹 **Upload Detection (Saves to History)**
app.post("/detect/upload/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file || !req.body.user_id) return res.status(400).send({ message: "Missing data." });

    const formData = new FormData();
    formData.append("file", req.file.buffer, { filename: "image.jpg" });
    formData.append("user_id", req.body.user_id);

    const response = await axios.post("http://127.0.0.1:8000/detect/", formData, {
      headers: formData.getHeaders(),
    });

    res.status(200).send(response.data);
  } catch (error) {
    console.error("Detection error:", error);
    res.status(500).send({ message: "Detection failed." });
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

//USER PROFILE//
const bcrypt = require('bcrypt');

// ✅ API: Update User Profile
app.put("/api/update-profile/:id", upload.single("profileImage"), async (req, res) => {
  const userId = req.params.id;
  const { email, username, password } = req.body;
  const profileImage = req.file ? req.file.filename : null;

  let sql = "UPDATE users SET email = ?, username = ?";
  let values = [email, username];

  if (password) {
    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    sql += ", password = ?";
    values.push(hashedPassword);
  }

  if (profileImage) {
    sql += ", picture = ?";
    values.push(profileImage);
  }

  sql += " WHERE id = ?";
  values.push(userId);

  // Determine the image URL dynamically based on the environment
  const imageUrl = profileImage ? `https://your-domain.com/uploads/${profileImage}` : null;

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating profile:", err);
      res.status(500).json({ message: "Error updating profile" });
    } else {
      res.json({
        message: "Profile updated successfully!",
        newImageUrl: imageUrl,
      });
    }
  });
});



// ************** DETECTION HISTORY ROUTES ************
// Route to get detection history for a specific user
app.get('/history/:user_id', (req, res) => {
  const userId = req.params.user_id;

  const sql = 'SELECT * FROM detection_history WHERE user_id = ? ORDER BY detected_at DESC';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching history:', err);
      res.status(500).json({ message: 'Failed to retrieve history' });
    } else {
      res.status(200).json(results);
    }
  });
});



// *********************** FAVORITES *************************//
// Route to add a flower to favorites
app.post('/favorites/add', (req, res) => {
  const { user_id, flower_id } = req.body;

  const sql = 'INSERT INTO favorites (user_id, flower_id) VALUES (?, ?)';
  db.query(sql, [user_id, flower_id], (err, result) => {
    if (err) {
      console.error('Error adding favorite:', err);
      return res.status(500).json({ message: 'Error adding to favorites' });
    }
    res.status(200).json({ message: 'Added to favorites' });
  });
});

// Route to remove a flower from favorites
app.post('/favorites/remove', (req, res) => {
  const { user_id, flower_id } = req.body;

  const sql = 'DELETE FROM favorites WHERE user_id = ? AND flower_id = ?';
  db.query(sql, [user_id, flower_id], (err, result) => {
    if (err) {
      console.error('Error removing favorite:', err);
      return res.status(500).json({ message: 'Error removing from favorites' });
    }
    res.status(200).json({ message: 'Removed from favorites' });
  });
});

// Route to fetch the user's favorite flowers
app.get('/favorites/:user_id', (req, res) => {
  const user_id = req.params.user_id;

  const sql = `SELECT f.*, fl.flower_name, fl.image_url 
               FROM favorites f 
               JOIN flowers fl ON f.flower_id = fl.id 
               WHERE f.user_id = ?`;

  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching favorites:', err);
      return res.status(500).json({ message: 'Error fetching favorites' });
    }
    res.status(200).json(results);
  });
});




// // **✅ Get User Details**
app.get("/api/user/:id", (req, res) => {
  const userId = req.params.id;
  if (!userId) return res.status(400).json({ message: "User ID is required" });

  const sql = "SELECT id, email, username, picture FROM users WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user:", err);
      res.status(500).json({ message: "Error fetching user data" });
    } else if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
});

// **✅ Update User Profile**
app.put("/api/update-profile/:id", upload.single("profileImage"), async (req, res) => {
  const userId = req.params.id;
  const { email, username, password } = req.body;
  const profileImage = req.file ? req.file.filename : null;

  let updateFields = [];
  let values = [];

  if (email) {
    updateFields.push("email = ?");
    values.push(email);
  }
  if (username) {
    updateFields.push("username = ?");
    values.push(username);
  }
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateFields.push("password = ?");
    values.push(hashedPassword);
  }
  if (profileImage) {
    updateFields.push("picture = ?");
    values.push(profileImage);
  }

  if (updateFields.length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  values.push(userId);

  const sql = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`;
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating profile:", err);
      res.status(500).json({ message: "Error updating profile" });
    } else {
      res.json({ message: "Profile updated successfully!" });
    }
  });
});


