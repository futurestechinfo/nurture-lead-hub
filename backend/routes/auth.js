
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../db/config');

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }
    
    // Get user from database
    const [users] = await pool.query(
      'SELECT * FROM users WHERE username = ? AND is_active = TRUE',
      [username]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
    
    const user = users[0];
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    // Remove password from response
    delete user.password;
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Middleware to validate JWT token
const validateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1]; // Bearer <token>
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error('Token validation error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = router;
module.exports.validateToken = validateToken;
