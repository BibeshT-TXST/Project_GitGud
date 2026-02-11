const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to handle JSON in req.body

// Simple Test Route
app.get('/test', (req, res) => {
  res.json({ message: "Systems Team" });
});

// Login Route
app.post('/auth/login', (req, res) => {                                 //Fixed route to match client request
  // Dummy User
  const testUser = {
    username: "OrcaO7",
    password: "Alkek"
  };

  const { username, password } = req.body;

  // Validate Credentials
  if (username === testUser.username && password === testUser.password) {
    // Generate Token
    // Use secret from env or default to 'TXST_UL' for dev
    const secret = process.env.JWT_SECRET || 'TXST_UL';
    const token = jwt.sign(
      { username: testUser.username },
      secret,
      { expiresIn: '1h' }
    );
    return res.json({
      message: "Login successful",
      token: token
    });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

//Inventory Route
//This block awaits ping from frontend and via custom SQL query using pool extracts data from the dbs container and sends it back to frontend
app.get('/api/inventory',async (req, res) => {
  try {
    const allBooks = await pool.query('SELECT isbn, title, booktype, current_status as status, purchasedate FROM books');
    res.json(allBooks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

//Add Book Route
//This block awaits ping from frontend and via custom SQL query using pool inserts data from the dbs container and sends it back to frontend
app.post('/api/inventory/add', async (req, res) => {
  try {
    const { isbn, title, booktype, status, date } = req.body;
    const newBook = await pool.query(
      'INSERT INTO books (isbn, title, booktype, current_status, purchasedate) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [isbn, title, booktype, status, date]
    );
    res.json(newBook.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

//Update Book Route
//This block awaits ping from frontend and via custom SQL query using pool updates data in the database and sends updated record back to frontend
app.put('/api/inventory/:isbn', async (req, res) => {
  try {
    const { isbn } = req.params; // Get ISBN from URL parameter
    const { title, booktype, status, purchasedate } = req.body; // Get updated data from request body

    // Execute SQL UPDATE query
    const updatedBook = await pool.query(
      'UPDATE books SET title = $1, booktype = $2, current_status = $3, purchasedate = $4 WHERE isbn = $5 RETURNING *',
      [title, booktype, status, purchasedate, isbn]
    );
    // Return the updated book data
    res.json(updatedBook.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});