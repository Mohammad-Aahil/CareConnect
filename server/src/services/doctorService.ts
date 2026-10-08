import DoctorProfile from '../models/DoctorProfile';
import User from '../models/User';
import { IDoctorProfile } from '../models/DoctorProfile';

export interface CreateDoctorProfileData {
  userId: string;
  specialization: string;
  qualifications: string[];
  experienceYears: number;
  bio?: string;
  consultationFee: number;
  clinic?: {
    name: string;
    address: string;
    phone?: string;
  };
}

export interface UpdateDoctorProfileData {
  specialization?: string;
  qualifications?: string[];
  experienceYears?: number;
  bio?: string;
  consultationFee?: number;
  clinic?: {
    name?: string;
    address?: string;
    phone?: string;
  };
}

/**
 * Create a doctor profile
 */
export async function createDoctorProfile(
  data: CreateDoctorProfileData
): Promise<IDoctorProfile> {
  // Verify user exists and is a doctor
  const user = await User.findById(data.userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (user.role !== 'DOCTOR') {
    throw new Error('User must have DOCTOR role');
  }

  // Check if profile already exists
  const existingProfile = await DoctorProfile.findOne({ userId: data.userId });
  if (existingProfile) {
    throw new Error('Doctor profile already exists for this user');
  }

  // Create profile
  const profile = await DoctorProfile.create(data);
  return profile;
}

/**
 * Get doctor profile by user ID
 */
export async function getDoctorProfileByUserId(
  userId: string
): Promise<IDoctorProfile | null> {
  return DoctorProfile.findOne({ userId }).populate('userId', 'name email');
}

/**
 * Get doctor profile by ID
 */
export async function getDoctorProfileById(
  id: string
): Promise<IDoctorProfile | null> {
  return DoctorProfile.findById(id).populate('userId', 'name email');
}

/**
 * Update doctor profile
 */
export async function updateDoctorProfile(
  id: string,
  data: UpdateDoctorProfileData
): Promise<IDoctorProfile | null> {
  return DoctorProfile.findByIdAndUpdate(id, data, { new: true }).populate(
    'userId',
    'name email'
  );
}

/**
 * Search doctors by specialization
 */
export async function searchDoctors(specialization?: string): Promise<IDoctorProfile[]> {
  const query: Record<string, unknown> = {};
  if (specialization) {
    query.specialization = { $regex: specialization, $options: 'i' };
  }

  return DoctorProfile.find(query).populate('userId', 'name email isActive');
}

/**
 * Get all doctors
 */
export async function getAllDoctors(): Promise<IDoctorProfile[]> {
  return DoctorProfile.find().populate('userId', 'name email isActive');
}
