import Appointment, { AppointmentStatus } from '../models/Appointment';
import { IAppointment } from '../models/Appointment';
import Availability from '../models/Availability';

export interface CreateAppointmentData {
  patientId: string;
  doctorId: string;
  startTime: Date;
  endTime: Date;
  reason: string;
  notes?: string;
}

export interface UpdateAppointmentData {
  status?: AppointmentStatus;
  notes?: string;
}

/**
 * Create an appointment
 */
export async function createAppointment(
  data: CreateAppointmentData
): Promise<IAppointment> {
  // Check for conflicting appointments
  const conflicting = await Appointment.findOne({
    doctorId: data.doctorId,
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
    status: { $in: [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED] },
  });

  if (conflicting) {
    throw new Error('Doctor already has an appointment at this time');
  }

  // Check patient availability
  const patientConflict = await Appointment.findOne({
    patientId: data.patientId,
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
    status: { $in: [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED] },
  });

  if (patientConflict) {
    throw new Error('You already have an appointment at this time');
  }

  return Appointment.create(data);
}

/**
 * Get appointment by ID
 */
export async function getAppointmentById(id: string): Promise<IAppointment | null> {
  return Appointment.findById(id)
    .populate('patientId', 'name email')
    .populate('doctorId');
}

/**
 * Get appointments by patient ID
 */
export async function getAppointmentsByPatientId(
  patientId: string
): Promise<IAppointment[]> {
  return Appointment.find({ patientId })
    .populate('doctorId')
    .sort({ startTime: -1 });
}

/**
 * Get appointments by doctor ID
 */
export async function getAppointmentsByDoctorId(
  doctorId: string
): Promise<IAppointment[]> {
  return Appointment.find({ doctorId })
    .populate('patientId', 'name email')
    .sort({ startTime: -1 });
}

/**
 * Update appointment status
 */
export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
): Promise<IAppointment | null> {
  return Appointment.findByIdAndUpdate(id, { status }, { new: true });
}

/**
 * Cancel appointment
 */
export async function cancelAppointment(id: string): Promise<IAppointment | null> {
  return Appointment.findByIdAndUpdate(
    id,
    { status: AppointmentStatus.CANCELLED },
    { new: true }
  );
}

/**
 * Get available slots for a doctor on a specific date
 */
export async function getAvailableSlots(
  doctorId: string,
  date: Date
): Promise<Array<{ startTime: Date; endTime: Date }>> {
  const dayOfWeek = date.getDay();
  const availability = await Availability.findOne({
    doctorId,
    dayOfWeek,
    isActive: true,
  });

  if (!availability) {
    return [];
  }

  // Get existing appointments for this date
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const existingAppointments = await Appointment.find({
    doctorId,
    startTime: { $gte: startOfDay, $lt: endOfDay },
    status: { $in: [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED] },
  });

  // Generate all slots
  const { generateSlots } = await import('./availabilityService');
  const allSlots = generateSlots(availability, date);

  // Filter out booked slots
  const bookedTimes = existingAppointments.map((apt) => apt.startTime.getTime());
  const availableSlots = allSlots.filter(
    (slot) => !bookedTimes.includes(slot.startTime.getTime())
  );

  return availableSlots;
}
