# Authentication API

## Overview
Authentication endpoints for user registration and login. Uses JWT tokens for stateless authentication.

## Base URL
`http://localhost:5000/api/auth`

## Endpoints

### Register User

**Endpoint:** `POST /api/auth/register`

**Description:** Register a new user account

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "PATIENT",
  "phone": "+1234567890"
}
```

**Request Fields:**
- `name` (string, required): User's full name (2-100 characters)
- `email` (string, required): User's email address (must be valid format, unique)
- `password` (string, required): User's password (6-128 characters)
- `role` (string, optional): User role (PATIENT, DOCTOR, ADMIN). Defaults to PATIENT
- `phone` (string, optional): User's phone number

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "6ac746b234fd49b9501ba5ec",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "PATIENT",
      "isActive": true,
      "createdAt": "2026-10-08T07:30:58.114Z",
      "updatedAt": "2026-10-08T07:30:58.114Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**

400 Bad Request (Validation Error):
```json
{
  "success": false,
  "message": "Name is required"
}
```

400 Bad Request (Duplicate Email):
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

---

### Login User

**Endpoint:** `POST /api/auth/login`

**Description:** Login with email and password

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Request Fields:**
- `email` (string, required): User's email address
- `password` (string, required): User's password

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "6ac746b234fd49b9501ba5ec",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "PATIENT",
      "isActive": true,
      "createdAt": "2026-10-08T07:30:58.114Z",
      "updatedAt": "2026-10-08T07:30:58.114Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**

401 Unauthorized (Invalid Credentials):
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

401 Unauthorized (Account Deactivated):
```json
{
  "success": false,
  "message": "Account is deactivated"
}
```

---

## Authentication Middleware

### Using JWT Token

For protected endpoints, include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

**Example:**
```bash
curl -X GET http://localhost:5000/api/protected/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Token Structure

The JWT token contains:
- `userId`: User's MongoDB ID
- `role`: User's role (PATIENT, DOCTOR, ADMIN)
- `iat`: Issued at timestamp
- `exp`: Expiration timestamp (7 days from issue)

### Token Expiration

Tokens expire after 7 days by default. After expiration, the user must login again to get a new token.

---

## Security Notes

- Passwords are hashed using bcrypt before storage
- Passwords are never returned in API responses
- JWT tokens are signed with a secret key
- Tokens expire after 7 days
- Email addresses are unique
- Invalid tokens return 401 Unauthorized
- Missing tokens return 401 Unauthorized

---

## Testing Examples

### Register a Patient
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "PATIENT"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Access Protected Route
```bash
curl -X GET http://localhost:5000/api/protected/me \
  -H "Authorization: Bearer <your-token-here>"
```
