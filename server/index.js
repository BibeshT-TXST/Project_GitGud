const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');

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
    email: "txst@test.com",
    password: "Alkek"
  };

  const { email, password } = req.body; 
  // Validate Credentials
  if (email === testUser.email && password === testUser.password) {
    // Generate Token
    // Use secret from env or default to 'TXST_UL' for dev
    const secret = process.env.JWT_SECRET || 'TXST_UL';
    const token = jwt.sign(
      { email: testUser.email },
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});