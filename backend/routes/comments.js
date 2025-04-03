
const express = require('express');
const router = express.Router();
const { pool } = require('../db/config');
const { validateToken } = require('./auth');

// Middleware to validate JWT token
router.use(validateToken);

// Get comments for a lead
router.get('/leads/:leadId/comments', async (req, res) => {
  try {
    const leadId = req.params.leadId;
    
    const [rows] = await pool.query(`
      SELECT lc.*, u.username as user_name, u.full_name
      FROM lead_comments lc
      JOIN users u ON lc.user_id = u.id
      WHERE lc.lead_id = ?
      ORDER BY lc.created_at DESC
    `, [leadId]);
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
});

// Add a comment to a lead
router.post('/leads/:leadId/comments', async (req, res) => {
  try {
    const leadId = req.params.leadId;
    const { content } = req.body;
    const userId = req.user.id;
    
    if (!content) {
      return res.status(400).json({ message: 'Comment content is required' });
    }
    
    // First check if the lead exists
    const [leads] = await pool.query('SELECT id FROM leads WHERE id = ?', [leadId]);
    
    if (leads.length === 0) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    
    // Add the comment
    const [result] = await pool.query(
      'INSERT INTO lead_comments (lead_id, user_id, comment, created_at) VALUES (?, ?, ?, NOW())',
      [leadId, userId, content]
    );
    
    // Get the created comment with user info
    const [comments] = await pool.query(`
      SELECT lc.*, u.username as user_name, u.full_name
      FROM lead_comments lc
      JOIN users u ON lc.user_id = u.id
      WHERE lc.id = ?
    `, [result.insertId]);
    
    res.status(201).json({
      message: 'Comment added successfully',
      comment: comments[0]
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Failed to add comment' });
  }
});

module.exports = router;
