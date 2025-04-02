
-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS lead_management;
USE lead_management;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE,
  full_name VARCHAR(100),
  role ENUM('admin', 'manager', 'agent') DEFAULT 'agent',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  mobile VARCHAR(20),
  status ENUM('New', 'Contacted', 'Qualified', 'Converted', 'Closed') DEFAULT 'New',
  followup_status ENUM('None', 'Scheduled', 'Completed') DEFAULT 'None',
  owner VARCHAR(50),
  notes TEXT,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create lead comments table
CREATE TABLE IF NOT EXISTS lead_comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lead_id INT NOT NULL,
  user_id INT NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert default admin user (password: password123)
INSERT INTO users (username, password, email, full_name, role)
VALUES ('admin', '$2b$10$K.0HwpsoPvGAkvGPqAC6u.vcM5IWr0xOcVMZyLrVvPLjXZwEJA1zS', 'admin@example.com', 'Admin User', 'admin')
ON DUPLICATE KEY UPDATE username = username;

-- Insert some sample leads
INSERT INTO leads (name, email, mobile, status, followup_status, owner, notes)
VALUES 
  ('John Doe', 'john@example.com', '555-123-4567', 'New', 'None', 'admin', 'Interested in premium plan'),
  ('Jane Smith', 'jane@example.com', '555-987-6543', 'Contacted', 'Scheduled', 'admin', 'Called on June 1st, follow up next week'),
  ('Michael Johnson', 'michael@example.com', '555-567-8901', 'Qualified', 'Completed', 'admin', 'Ready for proposal'),
  ('Emily Brown', 'emily@example.com', '555-234-5678', 'Converted', 'None', 'admin', 'Signed up for basic plan'),
  ('David Wilson', 'david@example.com', '555-345-6789', 'New', 'Scheduled', 'admin', 'Referred by Jane Smith')
ON DUPLICATE KEY UPDATE id = id;
