const app = require('./src/app');
const { baseWebhookURL } = require('./src/config');
require('dotenv').config();

// Define the port to listen on
const port = process.env.PORT || 5002;

// Check if BASE_WEBHOOK_URL environment variable is available
if (!baseWebhookURL) {
  console.error('BASE_WEBHOOK_URL environment variable is not available. Exiting...');
  process.exit(1); // Terminate the application with an error code
}

// Start the server
app.listen(port, (err) => {
  if (err) {
    console.error(`Error starting server: ${err.message}`);
    process.exit(1); // Exit with an error code if there's an issue starting the server
  }
  console.log(`Server running on port ${port}`);
});
