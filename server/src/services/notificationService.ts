import Notification from '../models/Notification';
import { INotification } from '../models/Notification';

export interface CreateNotificationData {
  recipientId: string;
  type: string;
  title: string;
  message: string;
  metadata?: Record<string, unknown>;
}

/**
 * Create a notification
 */
export async function createNotification(
  data: CreateNotificationData
): Promise<INotification> {
  return Notification.create(data);
}

/**
 * Get notifications by recipient ID
 */
export async function getNotificationsByRecipientId(
  recipientId: string,
  unreadOnly = false
): Promise<INotification[]> {
  const query: Record<string, unknown> = { recipientId };
  if (unreadOnly) {
    query.isRead = false;
  }
  return Notification.find(query).sort({ createdAt: -1 });
}

/**
 * Mark notification as read
 */
export async function markAsRead(id: string): Promise<INotification | null> {
  return Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
}

/**
 * Mark all notifications as read for a user
 */
export async function markAllAsRead(recipientId: string): Promise<{ modifiedCount: number }> {
  return Notification.updateMany(
    { recipientId, isRead: false },
    { isRead: true }
  );
}

/**
 * Delete notification
 */
export async function deleteNotification(id: string): Promise<INotification | null> {
  return Notification.findByIdAndDelete(id);
}
