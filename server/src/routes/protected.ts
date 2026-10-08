import { Router } from 'express';
import { authenticate } from '../middlewares/auth';

const router = Router();

/**
 * @route   GET /api/protected/me
 * @desc    Get current user info
 * @access  Private (requires authentication)
 */
router.get('/me', authenticate, (req, res) => {
  res.json({
    success: true,
    message: 'Access granted',
    user: req.user,
  });
});

export default router;
