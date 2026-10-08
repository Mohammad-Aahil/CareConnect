import Availability from '../models/Availability';
import { IAvailability } from '../models/Availability';

export interface CreateAvailabilityData {
  doctorId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface UpdateAvailabilityData {
  dayOfWeek?: number;
  startTime?: string;
  endTime?: string;
  isActive?: boolean;
}

/**
 * Create availability slot
 */
export async function createAvailability(
  data: CreateAvailabilityData
): Promise<IAvailability> {
  // Check for overlapping availability
  const existing = await Availability.findOne({
    doctorId: data.doctorId,
    dayOfWeek: data.dayOfWeek,
    $or: [
      {
        $and: [
          { startTime: { $lte: data.startTime } },
          { endTime: { $gt: data.startTime } },
        ],
      },
      {
        $and: [
          { startTime: { $lt: data.endTime } },
          { endTime: { $gte: data.endTime } },
        ],
      },
    ],
  });

  if (existing) {
    throw new Error('Overlapping availability exists for this day');
  }

  return Availability.create(data);
}

/**
 * Get availability by doctor ID
 */
export async function getAvailabilityByDoctorId(
  doctorId: string
): Promise<IAvailability[]> {
  return Availability.find({ doctorId, isActive: true });
}

/**
 * Update availability
 */
export async function updateAvailability(
  id: string,
  data: UpdateAvailabilityData
): Promise<IAvailability | null> {
  return Availability.findByIdAndUpdate(id, data, { new: true });
}

/**
 * Delete availability
 */
export async function deleteAvailability(id: string): Promise<IAvailability | null> {
  return Availability.findByIdAndDelete(id);
}

/**
 * Generate appointment slots from availability
 */
export function generateSlots(
  availability: IAvailability,
  date: Date
): Array<{ startTime: Date; endTime: Date }> {
  const slots: Array<{ startTime: Date; endTime: Date }> = [];
  const [startHour, startMin] = availability.startTime.split(':').map(Number);
  const [endHour, endMin] = availability.endTime.split(':').map(Number);

  const slotDuration = 30; // 30 minutes per slot
  let currentMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;

  while (currentMinutes + slotDuration <= endMinutes) {
    const slotDate = new Date(date);
    slotDate.setHours(Math.floor(currentMinutes / 60));
    slotDate.setMinutes(currentMinutes % 60);
    slotDate.setSeconds(0);
    slotDate.setMilliseconds(0);

    const slotEndDate = new Date(slotDate);
    slotEndDate.setMinutes(slotDate.getMinutes() + slotDuration);

    slots.push({
      startTime: slotDate,
      endTime: slotEndDate,
    });

    currentMinutes += slotDuration;
  }

  return slots;
}
