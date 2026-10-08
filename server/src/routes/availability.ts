import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import { UserRole } from '../models/User';
import {
  create,
  getMyAvailability,
  getByDoctorId,
  update,
  remove,
} from '../controllers/availabilityController';

const router = Router();

/**
 * @route   POST /api/availability
 * @desc    Create availability
 * @access  Private (Doctor)
 */
router.post('/', authenticate, authorize(UserRole.DOCTOR), create);

/**
 * @route   GET /api/availability/me
 * @desc    Get my availability
 * @access  Private (Doctor)
 */
router.get('/me', authenticate, authorize(UserRole.DOCTOR), getMyAvailability);

/**
 * @route   GET /api/availability/doctor/:doctorId
 * @desc    Get availability by doctor ID
 * @access  Public
 */
router.get('/doctor/:doctorId', getByDoctorId);

/**
 * @route   PUT /api/availability/:id
 * @desc    Update availability
 * @access  Private (Doctor)
 */
router.put('/:id', authenticate, authorize(UserRole.DOCTOR), update);

/**
 * @route   DELETE /api/availability/:id
 * @desc    Delete availability
 * @access  Private (Doctor)
 */
router.delete('/:id', authenticate, authorize(UserRole.DOCTOR), remove);

export default router;
