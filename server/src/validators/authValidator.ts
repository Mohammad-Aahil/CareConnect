import { UserRole } from '../models/User';

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  phone?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

/**
 * Validate registration input
 */
export function validateRegisterInput(data: unknown): RegisterInput {
  const input = data as RegisterInput;

  if (!input.name || typeof input.name !== 'string') {
    throw new Error('Name is required');
  }

  if (input.name.length < 2 || input.name.length > 100) {
    throw new Error('Name must be between 2 and 100 characters');
  }

  if (!input.email || typeof input.email !== 'string') {
    throw new Error('Email is required');
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(input.email)) {
    throw new Error('Please provide a valid email address');
  }

  if (!input.password || typeof input.password !== 'string') {
    throw new Error('Password is required');
  }

  if (input.password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  if (input.password.length > 128) {
    throw new Error('Password cannot exceed 128 characters');
  }

  if (input.role && !Object.values(UserRole).includes(input.role)) {
    throw new Error('Invalid role');
  }

  if (input.phone && typeof input.phone !== 'string') {
    throw new Error('Phone must be a string');
  }

  if (input.phone && input.phone.length > 20) {
    throw new Error('Phone cannot exceed 20 characters');
  }

  return input;
}

/**
 * Validate login input
 */
export function validateLoginInput(data: unknown): LoginInput {
  const input = data as LoginInput;

  if (!input.email || typeof input.email !== 'string') {
    throw new Error('Email is required');
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(input.email)) {
    throw new Error('Please provide a valid email address');
  }

  if (!input.password || typeof input.password !== 'string') {
    throw new Error('Password is required');
  }

  return input;
}
