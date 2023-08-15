// index.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Set up the port for the server
const port = process.env.PORT || 3000;

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/mongoose_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Test the database connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB!');
});

// Error handling for database connection
mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Define a simple schema for the message
const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
});

// Create a model based on the schema
const Message = mongoose.model('Message', messageSchema);

// Middleware to parse JSON in request body
app.use(express.json());

// Define a route to fetch a message
app.get('/api/message', async (req, res) => {
  try {
    // Fetch a random message from the database
    const message = await Message.findOne().sample(1);

    if (!message) {
      return res.status(404).json({ message: 'No message found.' });
    }

    res.json(message);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
