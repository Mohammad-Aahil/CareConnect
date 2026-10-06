# Backend Architecture

## Technology Stack
- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **Database**: MongoDB
- **ODM**: Mongoose

## Directory Structure

```
server/src/
├── config/              # Configuration management
│   └── index.ts         # Environment variables and app config
├── routes/              # Express route definitions
│   └── health.ts       # Health check endpoint
├── controllers/         # Request/response handlers (to be added)
├── services/            # Business logic layer (to be added)
├── models/              # Mongoose models (to be added)
├── middlewares/         # Express middleware (to be added)
├── validators/          # Request validation schemas (to be added)
├── utils/               # Utility functions
│   └── database.ts      # MongoDB connection management
├── types/               # TypeScript type definitions (to be added)
├── app.ts               # Express app configuration
└── server.ts            # Server entry point
```

## Request Flow

```
HTTP Request
   ↓
Express Router (routes/)
   ↓
Middleware (authentication, validation, logging)
   ↓
Controller (controllers/)
   ↓
Service Layer (services/)
   ↓
Model/Data Access (models/)
   ↓
MongoDB (via Mongoose)
   ↓
Service Layer (process results)
   ↓
Controller (format response)
   ↓
HTTP Response
```

## Database Connection

### Connection Management
- Database connection is established in `server.ts` before server starts
- Connection utility is in `utils/database.ts`
- Graceful shutdown handled by SIGTERM/SIGINT handlers

### Connection Functions

**connectDatabase()**
- Connects to MongoDB using URI from config
- Logs success or exits on failure
- Called during server startup

**disconnectDatabase()**
- Gracefully disconnects from MongoDB
- Called during graceful shutdown
- Logs errors but doesn't exit

**getDatabaseStatus()**
- Returns current connection status
- Used for health checks and debugging

### Configuration
Database URI is configured via environment variable:
```env
MONGODB_URI=mongodb://localhost:27017/careconnect
```

## Current Implementation Status

### Completed (Milestone 1-2)
- ✅ Express app setup
- ✅ TypeScript configuration
- ✅ Health check endpoint
- ✅ MongoDB connection
- ✅ Mongoose configuration
- ✅ Graceful shutdown handling

### To Be Implemented (Future Milestones)
- ⏳ User model
- ⏳ Authentication middleware
- ⏳ Doctor profile model
- ⏳ Availability model
- ⏳ Appointment model
- ⏳ Notification model
- ⏳ Audit log model
- ⏳ API routes for all features
- ⏳ Request validation
- ⏳ Error handling middleware
- ⏳ Logging middleware

## Middleware Pipeline (Planned)

```
Request
   ↓
CORS Middleware
   ↓
Body Parser (express.json)
   ↓
URL Encoding Parser
   ↓
Logging Middleware
   ↓
Authentication Middleware
   ↓
Authorization Middleware
   ↓
Request Validation
   ↓
Route Handler
   ↓
Response
```

## Error Handling Strategy

### Database Errors
- Connection failures cause server to exit (fail-fast)
- Query errors are caught and logged
- User receives appropriate error responses

### API Errors
- Validation errors return 400 with details
- Authentication errors return 401
- Authorization errors return 403
- Not found errors return 404
- Server errors return 500 with logging

## Security Considerations

### Current
- Environment variables for sensitive data
- Database credentials not in code

### To Be Added
- Input validation on all endpoints
- SQL/NoSQL injection prevention (Mongoose provides this)
- Rate limiting
- CORS configuration
- Helmet for security headers
- Password hashing (bcrypt)
- JWT authentication
- Role-based access control

## Performance Considerations

### Current
- Connection pooling (Mongoose default)
- Indexes to be added with models

### To Be Added
- Query optimization
- Caching strategy (if needed)
- Pagination for list endpoints
- Database connection pool configuration
