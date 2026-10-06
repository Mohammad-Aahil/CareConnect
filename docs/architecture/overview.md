# CareConnect Architecture Overview

## System Purpose
CareConnect is a healthcare appointment management platform. It is NOT a medical diagnosis system - it handles scheduling, user management, notifications, and administrative operations.

## Architecture Pattern
**Modular Monolith**

We use a modular monolith architecture because:
- Simpler to develop and deploy for a portfolio/learning project
- Lower operational complexity than microservices
- Easier to test and debug
- Can be split into microservices later if needed
- Suitable for the scale of this application

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     React Frontend                       │
│  (React + TypeScript + Vite + Tailwind + React Router)  │
└────────────────────┬────────────────────────────────────┘
                     │ REST API
                     ↓
┌─────────────────────────────────────────────────────────┐
│                     Express Backend                      │
│              (Node.js + TypeScript + Express)            │
│  ┌──────────┬──────────┬──────────┬────────────────┐  │
│  │ Routes   │Middleware│Controllers│ Services        │  │
│  └──────────┴──────────┴──────────┴────────────────┘  │
│  ┌──────────┬──────────┬──────────┬────────────────┐  │
│  │Validators│ Models   │ Utils    │ Integrations   │  │
│  └──────────┴──────────┴──────────┴────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        ↓            ↓            ↓
   ┌─────────┐ ┌─────────┐ ┌─────────┐
   │ MongoDB │ │  Email  │ │Notification│
   └─────────┘ └─────────┘ └─────────┘
```

## Backend Request Flow

```
HTTP Request
   ↓
Route Layer
   ↓
Middleware (auth, validation, logging)
   ↓
Controller (request/response handling)
   ↓
Service Layer (business logic)
   ↓
Model/Data Access Layer
   ↓
Database
   ↓
Service Layer (processing)
   ↓
Controller (response formatting)
   ↓
HTTP Response
```

## Frontend Structure

```
client/src/
├── app/
│   ├── router/          # React Router configuration
│   └── providers/       # React Query, theme providers
├── components/
│   ├── ui/              # Reusable UI components
│   ├── layout/          # Layout components (header, footer)
│   └── common/          # Common shared components
├── features/            # Feature-specific modules
│   ├── auth/            # Authentication
│   ├── doctors/         # Doctor management
│   ├── availability/    # Availability management
│   ├── appointments/    # Appointment booking
│   ├── notifications/   # Notifications
│   └── admin/           # Admin panel
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── services/            # API service layer
└── types/               # TypeScript type definitions
```

## Backend Structure

```
server/src/
├── config/              # Configuration (env vars, constants)
├── routes/              # Express route definitions
├── controllers/         # Request/response handlers
├── services/            # Business logic layer
├── models/              # Mongoose models
├── middlewares/         # Express middleware
├── validators/          # Request validation schemas
├── utils/               # Utility functions
├── integrations/        # External service integrations
├── jobs/                # Background jobs
├── types/               # TypeScript type definitions
├── app.ts               # Express app configuration
└── server.ts            # Server entry point
```

## Key Design Decisions

### Why Modular Monolith?
- Appropriate scale for a portfolio project
- Easier to develop, test, and deploy
- Lower operational overhead
- Can evolve to microservices if needed

### Why TypeScript?
- Type safety catches errors at compile time
- Better developer experience with IDE support
- Self-documenting code
- Easier refactoring

### Why React Query?
- Powerful data fetching and caching
- Automatic refetching and synchronization
- Type-safe API calls
- Reduces boilerplate for data fetching

### Why Zustand?
- Lightweight state management
- Simple API
- Good for client-side state (user session, UI state)
- Complements React Query (server state)

### Why Tailwind CSS?
- Utility-first CSS for rapid development
- No custom CSS to maintain
- Consistent design system
- Easy responsive design

## Technology Stack

### Frontend
- React 18+
- TypeScript
- Vite (build tool)
- React Router (routing)
- TanStack Query (server state)
- Zustand (client state)
- Tailwind CSS (styling)

### Backend
- Node.js
- Express
- TypeScript
- MongoDB (database)
- Mongoose (ODM)

### Development
- Git
- GitHub
- VS Code / AI coding environment
