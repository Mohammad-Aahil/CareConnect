import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import {
  create,
  getMyNotifications,
  markAsReadController,
  markAllAsReadController,
  remove,
} from '../controllers/notificationController';

const router = Router();

/**
 * @route   POST /api/notifications
 * @desc    Create notification (internal use)
 * @access  Private
 */
router.post('/', authenticate, create);

/**
 * @route   GET /api/notifications
 * @desc    Get my notifications
 * @access  Private
 */
router.get('/', authenticate, getMyNotifications);

/**
 * @route   PUT /api/notifications/:id/read
 * @desc    Mark notification as read
 * @access  Private
 */
router.put('/:id/read', authenticate, markAsReadController);

/**
 * @route   PUT /api/notifications/read-all
 * @desc    Mark all notifications as read
 * @access  Private
 */
router.put('/read-all', authenticate, markAllAsReadController);

/**
 * @route   DELETE /api/notifications/:id
 * @desc    Delete notification
 * @access  Private
 */
router.delete('/:id', authenticate, remove);

export default router;
