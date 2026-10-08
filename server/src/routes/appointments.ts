import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import { UserRole } from '../models/User';
import {
  create,
  getMyAppointments,
  getById,
  updateStatus,
  cancel,
  getAvailable,
} from '../controllers/appointmentController';

const router = Router();

/**
 * @route   POST /api/appointments
 * @desc    Create appointment
 * @access  Private (Patient)
 */
router.post('/', authenticate, authorize(UserRole.PATIENT), create);

/**
 * @route   GET /api/appointments/me
 * @desc    Get my appointments
 * @access  Private (Patient, Doctor)
 */
router.get('/me', authenticate, getMyAppointments);

/**
 * @route   GET /api/appointments/available/:doctorId
 * @desc    Get available slots for a doctor
 * @access  Public
 */
router.get('/available/:doctorId', getAvailable);

/**
 * @route   GET /api/appointments/:id
 * @desc    Get appointment by ID
 * @access  Private
 */
router.get('/:id', authenticate, getById);

/**
 * @route   PUT /api/appointments/:id/status
 * @desc    Update appointment status
 * @access  Private (Doctor, Admin)
 */
router.put('/:id/status', authenticate, authorize(UserRole.DOCTOR, UserRole.ADMIN), updateStatus);

/**
 * @route   POST /api/appointments/:id/cancel
 * @desc    Cancel appointment
 * @access  Private (Patient, Doctor, Admin)
 */
router.post('/:id/cancel', authenticate, cancel);

export default router;
