import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import { UserRole } from '../models/User';

const router = Router();

/**
 * @route   GET /api/admin/users
 * @desc    Get all users (admin only)
 * @access  Private (Admin)
 */
router.get('/users', authenticate, authorize(UserRole.ADMIN), (req, res) => {
  res.json({
    success: true,
    message: 'Admin access granted - user management',
  });
});

/**
 * @route   GET /api/admin/dashboard
 * @desc    Get admin dashboard stats
 * @access  Private (Admin)
 */
router.get('/dashboard', authenticate, authorize(UserRole.ADMIN), (req, res) => {
  res.json({
    success: true,
    message: 'Admin dashboard data',
  });
});

export default router;
