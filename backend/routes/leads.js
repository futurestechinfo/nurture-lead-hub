
const express = require('express');
const router = express.Router();
const { pool } = require('../db/config');
const { validateToken } = require('./auth');

// Middleware to validate JWT token
router.use(validateToken);

// Get all leads
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT * FROM leads
      ORDER BY modified_date DESC
    `);
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ message: 'Failed to fetch leads' });
  }
});

// Get lead by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM leads WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching lead:', error);
    res.status(500).json({ message: 'Failed to fetch lead' });
  }
});

// Create new lead
router.post('/', async (req, res) => {
  const { name, email, mobile, status, followup_status, owner } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO leads (name, email, mobile, status, followup_status, owner, created_date, modified_date) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
      [name, email, mobile, status, followup_status, owner]
    );
    
    res.status(201).json({ 
      id: result.insertId,
      message: 'Lead created successfully' 
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ message: 'Failed to create lead' });
  }
});

// Update lead
router.put('/:id', async (req, res) => {
  const { name, email, mobile, status, followup_status, owner } = req.body;
  
  try {
    await pool.query(
      'UPDATE leads SET name = ?, email = ?, mobile = ?, status = ?, followup_status = ?, owner = ?, modified_date = NOW() WHERE id = ?',
      [name, email, mobile, status, followup_status, owner, req.params.id]
    );
    
    res.json({ message: 'Lead updated successfully' });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ message: 'Failed to update lead' });
  }
});

// Bulk update leads
router.put('/bulk/update', async (req, res) => {
  const { ids, field, value } = req.body;
  
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: 'No lead IDs provided' });
  }
  
  if (!field || !value) {
    return res.status(400).json({ message: 'Field and value are required' });
  }
  
  // Only allow updating certain fields for security
  const allowedFields = ['status', 'followup_status', 'owner'];
  if (!allowedFields.includes(field)) {
    return res.status(400).json({ message: 'Cannot update this field in bulk' });
  }
  
  try {
    const placeholders = ids.map(() => '?').join(',');
    const query = `UPDATE leads SET ${field} = ?, modified_date = NOW() WHERE id IN (${placeholders})`;
    
    await pool.query(query, [value, ...ids]);
    
    res.json({ 
      message: `Successfully updated ${ids.length} leads` 
    });
  } catch (error) {
    console.error('Error bulk updating leads:', error);
    res.status(500).json({ message: 'Failed to update leads' });
  }
});

// Delete lead
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM leads WHERE id = ?', [req.params.id]);
    
    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ message: 'Failed to delete lead' });
  }
});

module.exports = router;
