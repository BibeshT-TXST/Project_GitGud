// ----- server.js -----
// Production entry point.
// Imports the configured Express app and binds it to a port.
// Test files import app.js directly,
// prevents port conflicts during test runs.
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
