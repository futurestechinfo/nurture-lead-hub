const express = require('express');
const cors = require('cors');
const { pool } = require('./db/config');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test DB connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database!');
  connection.release();
});

// Import routes
const authRoutes = require('./routes/auth');
const leadsRoutes = require('./routes/leads');
const commentsRoutes = require('./routes/comments');
const interestEmailRoutes = require('./routes/interest-email');

// Use routes
app.use('/api', authRoutes);
app.use('/api', leadsRoutes);
app.use('/api', commentsRoutes);
app.use('/api', interestEmailRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
