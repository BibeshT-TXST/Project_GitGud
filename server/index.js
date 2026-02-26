const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const pool = require('./db');
const argon2 = require('argon2');
const crypto = require('crypto');

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
app.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const pepper = process.env.PEPPER_SECRET;

    // Check if user exists
    const userResult = await pool.query("SELECT * FROM users WHERE net_id = $1", [username]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const startUser = userResult.rows[0];
    const storedHash = startUser.passwords;

    // Verify Password
    const validPassword = await argon2.verify(storedHash, password + pepper);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate Token
    const secret = process.env.JWT_SECRET || 'TXST_UL';
    const token = jwt.sign(
      { username: startUser.net_id },
      secret,
      { expiresIn: '1h' }
    );

    return res.json({
      message: "Login successful",
      token: token
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Signup Route
app.post('/auth/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const pepper = process.env.PEPPER_SECRET;

    if (!pepper) {
      console.error("PEPPER_SECRET is missing in .env");
      return res.status(500).json({ error: "Server configuration error" });
    }

    // Check if user exists
    const userExist = await pool.query("SELECT * FROM users WHERE net_id = $1", [username]);
    if (userExist.rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Argon2 generates its own internal salt automatically
    const hashedPassword = await argon2.hash(password + pepper);

    await pool.query(
      'INSERT INTO users (net_id, passwords) VALUES ($1, $2)',
      [username, hashedPassword]
    );

    res.status(201).json({ message: "Signup success" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Book Stats Route — returns counts by status and book type
app.get('/api/inventory/stats', async (req, res) => {
  try {
    const statusCounts = await pool.query(
      'SELECT current_status AS status, COUNT(*)::int AS count FROM books GROUP BY current_status'
    );
    const typeCounts = await pool.query(
      'SELECT booktype, COUNT(*)::int AS count FROM books GROUP BY booktype'
    );
    const totalCount = await pool.query(
      'SELECT COUNT(*)::int AS count FROM books'
    );
    res.json({
      total: totalCount.rows[0].count,
      byStatus: statusCounts.rows,
      byType: typeCounts.rows,
    });
    // This a sample of the Json object created by res.json({})
    /*--------sample of Json object-----*///For reference
    /*---------------------------------------------------------

      {
        "total": 15,
        "byStatus": [
          { "status": "Available", "count": 12 },
          { "status": "Checked Out", "count": 3 }
        ],
        "byType": [
          { "booktype": "paperback", "count": 8 },
          { "booktype": "Hardcover", "count": 7 }
        ]
      }

    -----------------------------------------------------------*/
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});


//Inventory Route
//This block awaits ping from frontend and via custom SQL query using pool extracts data from the dbs container and sends it back to frontend
app.get('/api/inventory', async (req, res) => {
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

    // Check if book was found and updated
    if (updatedBook.rows.length === 0) {
      return res.status(404).json({ error: "Book not found with the provided ISBN" });
    }

    // Return the updated book data
    res.json(updatedBook.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

//Delete Book Route
//This block awaits ping from frontend and via custom SQL query using pool deletes a book from the database by ISBN
app.delete('/api/inventory/:isbn', async (req, res) => {
  try {
    const { isbn } = req.params; // Get ISBN from URL parameter
    
    // Execute SQL DELETE query
    const deletedBook = await pool.query(
      'DELETE FROM books WHERE isbn = $1 RETURNING *',
      [isbn]
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }

});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});