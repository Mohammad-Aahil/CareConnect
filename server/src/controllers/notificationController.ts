import { Request, Response } from 'express';
import {
  createNotification,
  getNotificationsByRecipientId,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  CreateNotificationData,
} from '../services/notificationService';

/**
 * Create notification
 * POST /api/notifications
 */
export async function create(req: Request, res: Response): Promise<void> {
  try {
    const data: CreateNotificationData = req.body;
    const notification = await createNotification(data);

    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      data: notification,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create notification';
    res.status(400).json({ success: false, message });
  }
}

/**
 * Get my notifications
 * GET /api/notifications?unreadOnly=true
 */
export async function getMyNotifications(req: Request, res: Response): Promise<void> {
  try {
    const { unreadOnly } = req.query;
    const notifications = await getNotificationsByRecipientId(
      req.user!.userId,
      unreadOnly === 'true'
    );

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get notifications';
    res.status(500).json({ success: false, message });
  }
}

/**
 * Mark notification as read
 * PUT /api/notifications/:id/read
 */
export async function markAsReadController(req: Request, res: Response): Promise<void> {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const notification = await markAsRead(id);

    if (!notification) {
      res.status(404).json({ success: false, message: 'Notification not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Notification marked as read',
      data: notification,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to mark as read';
    res.status(500).json({ success: false, message });
  }
}

/**
 * Mark all notifications as read
 * PUT /api/notifications/read-all
 */
export async function markAllAsReadController(req: Request, res: Response): Promise<void> {
  try {
    const result = await markAllAsRead(req.user!.userId);

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read',
      data: result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to mark all as read';
    res.status(500).json({ success: false, message });
  }
}

/**
 * Delete notification
 * DELETE /api/notifications/:id
 */
export async function remove(req: Request, res: Response): Promise<void> {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const deleted = await deleteNotification(id);

    if (!deleted) {
      res.status(404).json({ success: false, message: 'Notification not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Notification deleted successfully',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete notification';
    res.status(500).json({ success: false, message });
  }
}
