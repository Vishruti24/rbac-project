# RBAC Project

A Role-Based Access Control (RBAC) application with React frontend and Node.js backend.

## Features

- User authentication with JWT tokens
- Role-based access control (user/admin roles)
- Protected routes
- Persistent login sessions
- MongoDB database integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGO_URL=mongodb://localhost:27017/rbac-project
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

Start the backend server:
```bash
npm run dev
```

The backend will run on http://localhost:5000

### 2. Frontend Setup

```bash
cd frontend/rbac-frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The frontend will run on http://localhost:5173

### 3. Database Setup

Make sure MongoDB is running on your system. The application will automatically create the database and collections when you first register a user.

## Usage

1. Open http://localhost:5173 in your browser
2. Register a new user or login with existing credentials
3. Users with 'admin' role can access the admin panel
4. Regular users can access the dashboard

## API Endpoints

- `POST /api/auth/createuser` - Create a new user
- `POST /api/auth/login` - Login user
- `GET /api/admin/dashboard` - Admin-only dashboard (requires admin role)

## Default Configuration

If no `.env` file is provided, the application will use these defaults:
- Port: 5000
- MongoDB URL: mongodb://localhost:27017/rbac-project
- JWT Secret: fallback-secret-key-for-development

## Troubleshooting

1. **Database Connection Issues**: Ensure MongoDB is running and accessible
2. **CORS Issues**: The backend is configured to allow CORS from the frontend
3. **Token Issues**: Clear localStorage if experiencing authentication problems
4. **Port Conflicts**: Change the PORT in .env if 5000 is already in use
