
-- MySQL database setup for Lead Management System

-- Create Database
CREATE DATABASE IF NOT EXISTS lead_management;
USE lead_management;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE,
  full_name VARCHAR(100),
  role ENUM('admin', 'manager', 'sales') NOT NULL DEFAULT 'sales',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Lead Status Table
CREATE TABLE IF NOT EXISTS lead_statuses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  color VARCHAR(20),
  sort_order INT DEFAULT 0
);

-- Leads Table
CREATE TABLE IF NOT EXISTS leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20),
  status_id INT,
  source VARCHAR(50),
  owner_id INT,
  notes TEXT,
  follow_up_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (status_id) REFERENCES lead_statuses(id),
  FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- Lead Comments Table
CREATE TABLE IF NOT EXISTS lead_comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lead_id INT NOT NULL,
  user_id INT NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert default data
-- Default admin user (password: password123)
INSERT INTO users (username, password, email, full_name, role) 
VALUES ('admin', '$2b$10$3zJSY0jVYs6tT5XYxz6TXeCzfFmmpGnGEMDwHZ.5aYzwR9jquhZH.', 'admin@example.com', 'Admin User', 'admin');

-- Default lead statuses
INSERT INTO lead_statuses (name, description, color, sort_order) VALUES
('New', 'Newly created lead', '#3498db', 1),
('Contacted', 'Initial contact made', '#f39c12', 2),
('Qualified', 'Lead has been qualified', '#2ecc71', 3),
('Proposal', 'Proposal has been sent', '#9b59b6', 4),
('Negotiation', 'In negotiation phase', '#e74c3c', 5),
('Won', 'Deal won', '#27ae60', 6),
('Lost', 'Deal lost', '#c0392b', 7);

-- Sample leads
INSERT INTO leads (name, email, phone, status_id, source, owner_id, notes) VALUES
('John Doe', 'john@example.com', '555-123-4567', 1, 'Website', 1, 'Interested in our premium package'),
('Jane Smith', 'jane@example.com', '555-987-6543', 2, 'Referral', 1, 'Follow up next week'),
('Bob Johnson', 'bob@example.com', '555-555-5555', 3, 'Social Media', 1, 'Requested demo');
