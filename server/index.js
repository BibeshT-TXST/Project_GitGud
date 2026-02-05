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
app.get('api/inventory',async (req,res) => {
  try{

  } catch(err){
    console.error(err.message);
    res.status(500).json({ error: "Server error"});
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});