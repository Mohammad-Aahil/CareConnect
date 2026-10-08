import { Request, Response } from 'express';
import {
  createDoctorProfile,
  getDoctorProfileByUserId,
  getDoctorProfileById,
  updateDoctorProfile,
  searchDoctors,
  getAllDoctors,
  CreateDoctorProfileData,
  UpdateDoctorProfileData,
} from '../services/doctorService';

/**
 * Create doctor profile
 * POST /api/doctors/profile
 */
export async function createProfile(req: Request, res: Response): Promise<void> {
  try {
    const data: CreateDoctorProfileData = {
      userId: req.user!.userId,
      ...req.body,
    };

    const profile = await createDoctorProfile(data);

    res.status(201).json({
      success: true,
      message: 'Doctor profile created successfully',
      data: profile,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create profile';
    res.status(400).json({ success: false, message });
  }
}

/**
 * Get my doctor profile
 * GET /api/doctors/me
 */
export async function getMyProfile(req: Request, res: Response): Promise<void> {
  try {
    const profile = await getDoctorProfileByUserId(req.user!.userId);

    if (!profile) {
      res.status(404).json({ success: false, message: 'Profile not found' });
      return;
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get profile';
    res.status(500).json({ success: false, message });
  }
}

/**
 * Get doctor profile by ID
 * GET /api/doctors/:id
 */
export async function getProfileById(req: Request, res: Response): Promise<void> {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const profile = await getDoctorProfileById(id);

    if (!profile) {
      res.status(404).json({ success: false, message: 'Profile not found' });
      return;
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get profile';
    res.status(500).json({ success: false, message });
  }
}

/**
 * Update doctor profile
 * PUT /api/doctors/profile
 */
export async function updateProfile(req: Request, res: Response): Promise<void> {
  try {
    const profile = await getDoctorProfileByUserId(req.user!.userId);

    if (!profile) {
      res.status(404).json({ success: false, message: 'Profile not found' });
      return;
    }

    const data: UpdateDoctorProfileData = req.body;
    const updated = await updateDoctorProfile(profile._id.toString(), data);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updated,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update profile';
    res.status(400).json({ success: false, message });
  }
}

/**
 * Search doctors
 * GET /api/doctors/search?specialization=cardiology
 */
export async function search(req: Request, res: Response): Promise<void> {
  try {
    const { specialization } = req.query;
    const doctors = await searchDoctors(specialization as string);

    res.status(200).json({
      success: true,
      data: doctors,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Search failed';
    res.status(500).json({ success: false, message });
  }
}

/**
 * Get all doctors
 * GET /api/doctors
 */
export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const doctors = await getAllDoctors();

    res.status(200).json({
      success: true,
      data: doctors,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get doctors';
    res.status(500).json({ success: false, message });
  }
}
