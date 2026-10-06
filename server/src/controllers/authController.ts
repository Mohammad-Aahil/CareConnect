import { Request, Response } from 'express';
import {
  registerUser,
  loginUser,
  RegisterData,
  LoginData,
} from '../services/authService';
import {
  validateRegisterInput,
  validateLoginInput,
} from '../validators/authValidator';

/**
 * Register a new user
 * POST /api/auth/register
 */
export async function register(req: Request, res: Response): Promise<void> {
  try {
    // Validate input
    const validatedData = validateRegisterInput(req.body);

    // Convert to service layer data
    const registerData: RegisterData = {
      name: validatedData.name,
      email: validatedData.email,
      password: validatedData.password,
      role: validatedData.role,
      phone: validatedData.phone,
    };

    // Register user
    const result = await registerUser(registerData);

    // Return success response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error) {
    // Handle errors
    const message = error instanceof Error ? error.message : 'Registration failed';
    res.status(400).json({
      success: false,
      message,
    });
  }
}

/**
 * Login a user
 * POST /api/auth/login
 */
export async function login(req: Request, res: Response): Promise<void> {
  try {
    // Validate input
    const validatedData = validateLoginInput(req.body);

    // Convert to service layer data
    const loginData: LoginData = {
      email: validatedData.email,
      password: validatedData.password,
    };

    // Login user
    const result = await loginUser(loginData);

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error) {
    // Handle errors
    const message = error instanceof Error ? error.message : 'Login failed';
    res.status(401).json({
      success: false,
      message,
    });
  }
}
