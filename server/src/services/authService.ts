import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import User, { IUser, UserRole } from '../models/User';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<IUser, 'passwordHash'>;
  token: string;
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Compare a plain password with a hashed password
 */
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate a JWT token for a user
 */
export function generateToken(userId: string, role: UserRole): string {
  const payload = { userId, role };
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
}

/**
 * Verify a JWT token and return the payload
 */
export function verifyToken(token: string): { userId: string; role: UserRole } {
  try {
    const payload = jwt.verify(token, config.jwtSecret) as {
      userId: string;
      role: UserRole;
    };
    return payload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Register a new user
 */
export async function registerUser(
  data: RegisterData
): Promise<AuthResponse> {
  // Check if user already exists
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Hash password
  const passwordHash = await hashPassword(data.password);

  // Create user
  const user = await User.create({
    name: data.name,
    email: data.email,
    passwordHash,
    role: data.role || UserRole.PATIENT,
    phone: data.phone,
  });

  // Generate token
  const token = generateToken(user._id.toString(), user.role);

  // Return user without password
  return {
    user: user.toJSON() as Omit<IUser, 'passwordHash'>,
    token,
  };
}

/**
 * Login a user
 */
export async function loginUser(data: LoginData): Promise<AuthResponse> {
  // Find user by email
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check if user is active
  if (!user.isActive) {
    throw new Error('Account is deactivated');
  }

  // Compare password
  const isPasswordValid = await comparePassword(data.password, user.passwordHash);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate token
  const token = generateToken(user._id.toString(), user.role);

  // Return user without password
  return {
    user: user.toJSON() as Omit<IUser, 'passwordHash'>,
    token,
  };
}
