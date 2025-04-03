
const express = require('express');
const router = express.Router();
const { validateToken } = require('./auth');
const nodemailer = require('nodemailer');

// Middleware to validate JWT token
router.use(validateToken);

// Configure nodemailer with test account
// In production, use actual email service details
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'testuser@example.com', // replace with actual email
    pass: 'testpassword' // replace with actual password
  }
});

// Send lead interest email
router.post('/leads/interest-email', async (req, res) => {
  try {
    const leadData = req.body;
    
    if (!leadData) {
      return res.status(400).json({ message: 'Lead data is required' });
    }
    
    // Email content formatting
    const emailContent = `
      <h2>New Interested Lead</h2>
      <p>A lead has been marked as interested and requires follow-up.</p>
      
      <h3>Lead Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${leadData.name}</li>
        <li><strong>Email:</strong> ${leadData.email}</li>
        <li><strong>Phone:</strong> ${leadData.mobile}</li>
        <li><strong>Status:</strong> ${leadData.status}</li>
        <li><strong>Lead ID:</strong> ${leadData.id}</li>
        <li><strong>Owner:</strong> ${leadData.owner}</li>
      </ul>
      
      <p>Please contact this lead as soon as possible.</p>
      <p>This is an automated message from the LeadHub CRM system.</p>
    `;
    
    // Email options
    const mailOptions = {
      from: '"LeadHub CRM" <crm@futures-tech.com>',
      to: 'sales@futures-tech.com', // Replace with actual recipient
      subject: `New Interested Lead: ${leadData.name}`,
      html: emailContent
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent:', info.messageId);
    
    res.json({ 
      message: 'Interest email sent successfully',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Error sending interest email:', error);
    res.status(500).json({ message: 'Failed to send interest email' });
  }
});

module.exports = router;
