import { Request, Response } from 'express';
import {
  createAvailability,
  getAvailabilityByDoctorId,
  updateAvailability,
  deleteAvailability,
  CreateAvailabilityData,
  UpdateAvailabilityData,
} from '../services/availabilityService';

/**
 * Create availability
 * POST /api/availability
 */
export async function create(req: Request, res: Response): Promise<void> {
  try {
    // Get doctor profile for this user
    const DoctorProfile = (await import('../models/DoctorProfile')).default;
    const doctorProfile = await DoctorProfile.findOne({ userId: req.user!.userId });

    if (!doctorProfile) {
      res.status(404).json({ success: false, message: 'Doctor profile not found' });
      return;
    }

    const data: CreateAvailabilityData = {
      doctorId: doctorProfile._id.toString(),
      ...req.body,
    };

    const availability = await createAvailability(data);

    res.status(201).json({
      success: true,
      message: 'Availability created successfully',
      data: availability,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create availability';
    res.status(400).json({ success: false, message });
  }
}

/**
 * Get my availability
 * GET /api/availability/me
 */
export async function getMyAvailability(req: Request, res: Response): Promise<void> {
  try {
    const DoctorProfile = (await import('../models/DoctorProfile')).default;
    const doctorProfile = await DoctorProfile.findOne({ userId: req.user!.userId });

    if (!doctorProfile) {
      res.status(404).json({ success: false, message: 'Doctor profile not found' });
      return;
    }

    const availability = await getAvailabilityByDoctorId(doctorProfile._id.toString());

    res.status(200).json({
      success: true,
      data: availability,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get availability';
    res.status(500).json({ success: false, message });
  }
}

/**
 * Get availability by doctor ID
 * GET /api/availability/doctor/:doctorId
 */
export async function getByDoctorId(req: Request, res: Response): Promise<void> {
  try {
    const doctorId = Array.isArray(req.params.doctorId) ? req.params.doctorId[0] : req.params.doctorId;
    const availability = await getAvailabilityByDoctorId(doctorId);

    res.status(200).json({
      success: true,
      data: availability,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get availability';
    res.status(500).json({ success: false, message });
  }
}

/**
 * Update availability
 * PUT /api/availability/:id
 */
export async function update(req: Request, res: Response): Promise<void> {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const data: UpdateAvailabilityData = req.body;
    const updated = await updateAvailability(id, data);

    if (!updated) {
      res.status(404).json({ success: false, message: 'Availability not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Availability updated successfully',
      data: updated,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update availability';
    res.status(400).json({ success: false, message });
  }
}

/**
 * Delete availability
 * DELETE /api/availability/:id
 */
export async function remove(req: Request, res: Response): Promise<void> {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const deleted = await deleteAvailability(id);

    if (!deleted) {
      res.status(404).json({ success: false, message: 'Availability not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Availability deleted successfully',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete availability';
    res.status(500).json({ success: false, message });
  }
}
