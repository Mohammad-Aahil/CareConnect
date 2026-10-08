# Development Setup

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas connection)
- Git

## Repository Structure

```
CareConnect_Devin/
├── client/          # React frontend
├── server/          # Express backend
├── docs/            # Documentation
└── .gitignore       # Git ignore rules
```

## Initial Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd CareConnect_Devin
```

### 2. Backend Setup

```bash
cd server
npm install
```

#### Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/careconnect
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

#### Run Backend

```bash
npm run dev    # Development with hot reload
npm run build  # Build TypeScript to JavaScript
npm start      # Run production build
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd client
npm install
```

#### Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
VITE_API_BASE_URL=http://localhost:5000
```

#### Run Frontend

```bash
npm run dev    # Development with hot reload
npm run build  # Build for production
npm run preview # Preview production build
```

Frontend will run on `http://localhost:5173`

## Running Both Servers

### Terminal 1 - Backend
```bash
cd server
npm run dev
```

### Terminal 2 - Frontend
```bash
cd client
npm run dev
```

## Verification

### Backend Health Check
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "development"
}
```

### Frontend Access
Open browser to `http://localhost:5173`

## Troubleshooting

### Port Already in Use

**Backend (port 5000):**
```bash
# Find process
netstat -ano | findstr :5000
# Kill process (Windows)
taskkill /PID <PID> /F
```

**Frontend (port 5173):**
```bash
# Find process
netstat -ano | findstr :5173
# Kill process (Windows)
taskkill /PID <PID> /F
```

### MongoDB Connection Failed

Ensure MongoDB is running:
- Local MongoDB: Check if MongoDB service is running
  ```bash
  # Windows
  # Check MongoDB service status
  sc query MongoDB

  # Start MongoDB service
  net start MongoDB
  ```
- MongoDB Atlas: Verify connection string and network access
  - Ensure your IP is whitelisted in Atlas
  - Check connection string format
  - Verify username/password are correct

**Test MongoDB connection:**
```bash
# Using MongoDB shell
mongosh "mongodb://localhost:27017/careconnect"

# Or using MongoDB client
mongo mongodb://localhost:27017/careconnect
```

### TypeScript Errors

```bash
cd server
npm run build  # Check for TypeScript errors
```

### Dependency Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Development Workflow

1. Make changes to code
2. Backend auto-restarts with nodemon
3. Frontend hot-reloads with Vite
4. Test changes in browser
5. Commit changes with meaningful messages
6. Push to GitHub

## Git Workflow

```bash
# Check status
git status

# Stage changes
git add .

# Commit
git commit -m "feat: add feature description"

# Push
git push origin master
```

## Next Steps

After setup, proceed with:
- ✅ Milestone 1: Foundation (completed)
- ✅ Milestone 2: Database setup (completed)
- ✅ Milestone 3: Authentication (completed)
- ⏳ Milestone 4: RBAC
- ⏳ Milestone 5: Doctor Profiles
- See project roadmap for full details
