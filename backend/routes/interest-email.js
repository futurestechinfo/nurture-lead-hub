
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { pool } = require('../db/config');
const { validateToken } = require('./auth');

// Configure email transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@example.com',
    pass: process.env.EMAIL_PASSWORD || 'your-password'
  }
});

// Middleware to validate token
router.use(validateToken);

// Send interest email
router.post('/interest-email', async (req, res) => {
  const { leadId, interested } = req.body;
  
  if (!leadId) {
    return res.status(400).json({ message: 'Lead ID is required' });
  }
  
  try {
    // Get lead details
    const [lead] = await pool.query('SELECT * FROM leads WHERE id = ?', [leadId]);
    
    if (lead.length === 0) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    
    const leadData = lead[0];
    
    // Update lead interest status in database
    await pool.query(
      'UPDATE leads SET interested = ? WHERE id = ?',
      [interested ? 1 : 0, leadId]
    );
    
    if (interested) {
      // Send email with lead details
      const mailOptions = {
        from: process.env.EMAIL_FROM || 'notifications@futurestechnologia.com',
        to: process.env.NOTIFICATION_EMAIL || 'admin@futurestechnologia.com',
        subject: 'New Interested Lead',
        html: `
          <h1>New Interested Lead</h1>
          <p>A lead has expressed interest:</p>
          <ul>
            <li><strong>Name:</strong> ${leadData.name}</li>
            <li><strong>Email:</strong> ${leadData.email}</li>
            <li><strong>Mobile:</strong> ${leadData.mobile}</li>
            <li><strong>Status:</strong> ${leadData.status}</li>
            <li><strong>Follow-up Status:</strong> ${leadData.followup_status}</li>
            <li><strong>Owner:</strong> ${leadData.owner}</li>
            <li><strong>Created Date:</strong> ${new Date(leadData.created_date).toLocaleString()}</li>
          </ul>
        `
      };
      
      await transporter.sendMail(mailOptions);
    }
    
    res.json({ 
      success: true, 
      message: interested ? 'Interest confirmed and email sent' : 'Interest status updated' 
    });
  } catch (error) {
    console.error('Error processing interest email:', error);
    res.status(500).json({ message: 'Failed to process interest' });
  }
});

module.exports = router;
