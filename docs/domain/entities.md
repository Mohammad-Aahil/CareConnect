# Domain Entities

## User

### Purpose
Represents a user in the CareConnect system. Users can be patients, doctors, or administrators.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier (MongoDB) |
| `name` | String | Yes | User's full name (2-100 characters) |
| `email` | String | Yes | User's email address (unique, validated) |
| `passwordHash` | String | Yes | Hashed password (bcrypt, never exposed) |
| `role` | Enum | No | User role (PATIENT, DOCTOR, ADMIN). Defaults to PATIENT |
| `phone` | String | No | User's phone number (optional) |
| `isActive` | Boolean | No | Account status. Defaults to true |
| `createdAt` | Date | Auto | Timestamp when user was created |
| `updatedAt` | Date | Auto | Timestamp when user was last updated |

### Roles

**PATIENT**
- Can book appointments
- Can view their appointments
- Can manage their profile
- Can receive notifications

**DOCTOR**
- Can manage their profile
- Can configure availability
- Can view appointments
- Can manage appointment status
- Can view relevant patient information

**ADMIN**
- Can manage all users
- Can manage doctors
- Can manage appointments
- Can view dashboard and analytics
- Can view audit logs

### Validation Rules

- **Name**: Required, 2-100 characters
- **Email**: Required, valid email format, unique across all users
- **Password**: Required, 6-128 characters (plaintext), hashed to 60+ characters
- **Role**: Must be one of PATIENT, DOCTOR, ADMIN
- **Phone**: Optional, valid phone number format, max 20 characters

### Security Considerations

- Password is hashed using bcrypt (10 salt rounds)
- Password hash is never exposed in API responses
- Email uniqueness is enforced at database level
- Role-based access control (RBAC) restricts permissions
- Accounts can be deactivated (isActive = false)

### Indexes

- Email: Unique index for fast lookups and uniqueness enforcement

### Related Entities

- **DoctorProfile**: One-to-one with User where role = DOCTOR
- **Appointment**: Many-to-one (patient has many appointments, doctor has many appointments)
- **Notification**: One-to-many (user has many notifications)

---

## DoctorProfile

### Purpose
Extended profile information for doctor users. Contains professional details.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier (MongoDB) |
| `userId` | ObjectId | Yes | Reference to User (must have role = DOCTOR) |
| `specialization` | String | Yes | Doctor's medical specialization |
| `qualifications` | Array[String] | Yes | List of medical qualifications |
| `experienceYears` | Number | Yes | Years of experience |
| `bio` | String | No | Professional biography |
| `consultationFee` | Number | Yes | Fee per consultation |
| `clinic` | Object | No | Clinic information (name, address, etc.) |
| `createdAt` | Date | Auto | Timestamp when profile was created |
| `updatedAt` | Date | Auto | Timestamp when profile was last updated |

### Relationships

- **User**: One-to-one (each doctor has one user account)
- **Availability**: One-to-many (doctor has many availability slots)
- **Appointment**: One-to-many (doctor has many appointments)

---

## Availability

### Purpose
Defines when a doctor is available for appointments.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier (MongoDB) |
| `doctorId` | ObjectId | Yes | Reference to DoctorProfile |
| `dayOfWeek` | Number | Yes | Day of week (0-6, 0 = Sunday) |
| `startTime` | String | Yes | Start time (HH:MM format) |
| `endTime` | String | Yes | End time (HH:MM format) |
| `isActive` | Boolean | No | Whether this availability is active. Defaults to true |
| `createdAt` | Date | Auto | Timestamp when availability was created |
| `updatedAt` | Date | Auto | Timestamp when availability was last updated |

### Business Rules

- startTime must be before endTime
- Doctor cannot have overlapping availability on the same day
- Used to generate appointment slots

---

## Appointment

### Purpose
Represents a scheduled appointment between a patient and a doctor.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier (MongoDB) |
| `patientId` | ObjectId | Yes | Reference to User (role = PATIENT) |
| `doctorId` | ObjectId | Yes | Reference to DoctorProfile |
| `startTime` | Date | Yes | Appointment start time |
| `endTime` | Date | Yes | Appointment end time |
| `status` | Enum | Yes | Appointment status |
| `reason` | String | Yes | Reason for appointment |
| `notes` | String | No | Additional notes |
| `createdAt` | Date | Auto | Timestamp when appointment was created |
| `updatedAt` | Date | Auto | Timestamp when appointment was last updated |

### Status Values

- **PENDING**: Appointment requested, awaiting confirmation
- **CONFIRMED**: Appointment confirmed by doctor
- **COMPLETED**: Appointment has taken place
- **CANCELLED**: Appointment cancelled by patient or doctor
- **NO_SHOW**: Patient did not attend

### Business Rules

- Patient cannot book overlapping appointments
- Doctor cannot have overlapping appointments
- Appointment must be within doctor's availability
- Status transitions are controlled (e.g., cannot go from COMPLETED to PENDING)
- Only doctor can confirm PENDING appointments
- Either party can cancel confirmed appointments

---

## Notification

### Purpose
In-app notifications for users (appointment reminders, status changes, etc.).

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier (MongoDB) |
| `recipientId` | ObjectId | Yes | Reference to User |
| `type` | String | Yes | Notification type |
| `title` | String | Yes | Notification title |
| `message` | String | Yes | Notification message |
| `isRead` | Boolean | No | Whether notification has been read. Defaults to false |
| `metadata` | Object | No | Additional data (e.g., appointmentId) |
| `createdAt` | Date | Auto | Timestamp when notification was created |

### Notification Types

- APPOINTMENT_CONFIRMED
- APPOINTMENT_CANCELLED
- APPOINTMENT_REMINDER
- APPOINTMENT_COMPLETED
- PROFILE_UPDATED
- SYSTEM

---

## AuditLog

### Purpose
Tracks important system actions for security and compliance.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier (MongoDB) |
| `userId` | ObjectId | Yes | Reference to User who performed action |
| `action` | String | Yes | Action performed (e.g., CREATE_APPOINTMENT) |
| `entityType` | String | Yes | Type of entity affected (e.g., APPOINTMENT) |
| `entityId` | ObjectId | Yes | ID of entity affected |
| `changes` | Object | No | Details of changes made |
| `ipAddress` | String | No | IP address of request |
| `userAgent` | String | No | User agent of request |
| `createdAt` | Date | Auto | Timestamp when action was performed |

### Actions to Log

- CREATE_APPOINTMENT
- UPDATE_APPOINTMENT
- CANCEL_APPOINTMENT
- CONFIRM_APPOINTMENT
- COMPLETE_APPOINTMENT
- CREATE_USER
- UPDATE_USER
- DELETE_USER
- DEACTIVATE_USER
- ACTIVATE_USER
