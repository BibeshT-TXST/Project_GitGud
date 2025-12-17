const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to handle JSON in req.body

// Simple Test Route
app.get('/test', (req, res) => {
  res.json({ message: "Systems Team" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});