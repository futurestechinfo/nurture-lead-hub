
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./db/config');
const authRoutes = require('./routes/auth');
const leadsRoutes = require('./routes/leads');
const commentsRoutes = require('./routes/comments');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
testConnection();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api', commentsRoutes); // Add comments routes

// Default route
app.get('/', (req, res) => {
  res.send('Lead Management API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
