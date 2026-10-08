import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import { UserRole } from '../models/User';
import {
  createProfile,
  getMyProfile,
  getProfileById,
  updateProfile,
  search,
  getAll,
} from '../controllers/doctorController';

const router = Router();

/**
 * @route   POST /api/doctors/profile
 * @desc    Create doctor profile
 * @access  Private (Doctor)
 */
router.post('/profile', authenticate, authorize(UserRole.DOCTOR), createProfile);

/**
 * @route   GET /api/doctors/me
 * @desc    Get my doctor profile
 * @access  Private (Doctor)
 */
router.get('/me', authenticate, authorize(UserRole.DOCTOR), getMyProfile);

/**
 * @route   GET /api/doctors
 * @desc    Get all doctors
 * @access  Public
 */
router.get('/', getAll);

/**
 * @route   GET /api/doctors/search
 * @desc    Search doctors by specialization
 * @access  Public
 */
router.get('/search', search);

/**
 * @route   GET /api/doctors/:id
 * @desc    Get doctor profile by ID
 * @access  Public
 */
router.get('/:id', getProfileById);

/**
 * @route   PUT /api/doctors/profile
 * @desc    Update doctor profile
 * @access  Private (Doctor)
 */
router.put('/profile', authenticate, authorize(UserRole.DOCTOR), updateProfile);

export default router;
