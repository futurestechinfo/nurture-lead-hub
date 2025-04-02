
# Lead Management System - Backend

This is the backend server for the Lead Management System.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)

### Database Setup
1. Create a MySQL database:
```
mysql -u root -p
```

2. Import the database schema:
```
mysql -u root -p < db/lead_management.sql
```

### Server Setup
1. Install dependencies:
```
npm install
```

2. Create a .env file (optional):
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=lead_management
JWT_SECRET=your_secret_key
PORT=8000
```

3. Start the server:
```
npm start
```

The server will be running on http://localhost:8000

## API Endpoints

### Authentication
- POST /api/auth/login - Login with username and password

### Protected Routes (requires authentication)
- GET /api/leads - Get all leads
- POST /api/leads - Create new lead
- GET /api/leads/:id - Get lead details
- PUT /api/leads/:id - Update lead
- DELETE /api/leads/:id - Delete lead
- POST /api/leads/:id/comments - Add comment to lead

## Notes
- Default admin user: username: admin, password: password123
- The password is hashed in the database
