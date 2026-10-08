# CareConnect

A healthcare appointment management platform built with MERN stack (MongoDB, Express, React, Node.js).

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Role-based access control (Patient, Doctor, Admin)
- Protected routes

### Doctor Management
- Create and manage doctor profiles
- Search doctors by specialization
- View doctor availability

### Availability Management
- Configure availability slots
- Generate appointment slots
- Manage weekly schedules

### Appointment Management
- Book appointments
- View appointments
- Cancel appointments
- Status management (Pending, Confirmed, Completed, Cancelled, No-Show)
- Conflict prevention

### Notifications
- In-app notifications
- Mark as read/unread
- Notification history

### Admin Features
- User management
- Doctor management
- Dashboard and analytics (to be extended)

## Technology Stack

### Frontend
- React 18
- TypeScript
- Vite
- React Router
- TanStack Query
- Zustand
- Tailwind CSS

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcrypt

## Project Structure

```
CareConnect_Devin/
├── client/                 # React frontend
│   ├── src/
│   │   ├── app/           # App configuration
│   │   ├── components/    # Reusable components
│   │   ├── features/      # Feature modules
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # Utilities
│   │   └── services/      # API services
│   └── package.json
├── server/                # Express backend
│   ├── src/
│   │   ├── config/        # Configuration
│   │   ├── controllers/   # Request handlers
│   │   ├── middlewares/   # Express middleware
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── utils/         # Utilities
│   │   ├── validators/    # Input validation
│   │   ├── app.ts         # Express app
│   │   └── server.ts      # Server entry
│   └── package.json
├── docs/                  # Documentation
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd CareConnect_Devin
```

2. Backend setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

3. Frontend setup
```bash
cd client
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Environment Variables

**Backend (.env)**
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/careconnect
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

**Frontend (.env)**
```
VITE_API_BASE_URL=http://localhost:5000
```

## API Documentation

See [docs/api/auth.md](docs/api/auth.md) for authentication API documentation.

More API documentation to be added.

## Running the Application

### Backend
```bash
cd server
npm run dev    # Development
npm run build  # Build
npm start      # Production
```

### Frontend
```bash
cd client
npm run dev    # Development
npm run build  # Build
npm run preview # Preview production build
```

## Development

### Backend
- Runs on port 5000
- Hot reload with nodemon
- TypeScript compilation with ts-node

### Frontend
- Runs on port 5173
- Hot reload with Vite
- TypeScript compilation

## Architecture

- Modular monolith architecture
- Separation of concerns (routes, controllers, services, models)
- Type-safe with TypeScript
- RESTful API design
- Role-based access control

## Security

- Password hashing with bcrypt
- JWT authentication
- Role-based authorization
- Input validation
- Environment variables for sensitive data

## License

ISC

## Generated with [Devin](https://devin.ai)
