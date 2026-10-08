import { Request, Response } from 'express';
import {
  createAppointment,
  getAppointmentById,
  getAppointmentsByPatientId,
  getAppointmentsByDoctorId,
  updateAppointmentStatus,
  cancelAppointment,
  getAvailableSlots,
  CreateAppointmentData,
} from '../services/appointmentService';
import { AppointmentStatus } from '../models/Appointment';
import DoctorProfile from '../models/DoctorProfile';

/**
 * Create appointment
 * POST /api/appointments
 */
export async function create(req: Request, res: Response): Promise<void> {
  try {
    const { doctorId: doctorProfileId, ...rest } = req.body;

    // Verify doctor profile exists
    const doctorProfile = await DoctorProfile.findById(doctorProfileId);
    if (!doctorProfile) {
      res.status(404).json({ success: false, message: 'Doctor profile not found' });
      return;
    }

    const data: CreateAppointmentData = {
      patientId: req.user!.userId,
      doctorId: doctorProfileId,
      ...rest,
    };

    const appointment = await createAppointment(data);

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      data: appointment,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create appointment';
    res.status(400).json({ success: false, message });
  }
}

/**
 * Get my appointments
 * GET /api/appointments/me
 */
export async function getMyAppointments(req: Request, res: Response): Promise<void> {
  try {
    let appointments;
    if (req.user!.role === 'DOCTOR') {
      appointments = await getAppointmentsByDoctorId(req.user!.userId);
    } else {
      appointments = await getAppointmentsByPatientId(req.user!.userId);
    }

    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get appointments';
    res.status(500).json({ success: false, message });
  }
}

/**
 * Get appointment by ID
 * GET /api/appointments/:id
 */
export async function getById(req: Request, res: Response): Promise<void> {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const appointment = await getAppointmentById(id);

    if (!appointment) {
      res.status(404).json({ success: false, message: 'Appointment not found' });
      return;
    }

    // Check if user is authorized to view this appointment
    if (
      req.user!.userId !== appointment.patientId.toString() &&
      req.user!.userId !== appointment.doctorId.toString() &&
      req.user!.role !== 'ADMIN'
    ) {
      res.status(403).json({ success: false, message: 'Access denied' });
      return;
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get appointment';
    res.status(500).json({ success: false, message });
  }
}

/**
 * Update appointment status
 * PUT /api/appointments/:id/status
 */
export async function updateStatus(req: Request, res: Response): Promise<void> {
  try {
    const { status } = req.body;

    if (!Object.values(AppointmentStatus).includes(status)) {
      res.status(400).json({ success: false, message: 'Invalid status' });
      return;
    }

    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const appointment = await getAppointmentById(id);

    if (!appointment) {
      res.status(404).json({ success: false, message: 'Appointment not found' });
      return;
    }

    // Only doctor or admin can update status
    if (req.user!.userId !== appointment.doctorId.toString() && req.user!.role !== 'ADMIN') {
      res.status(403).json({ success: false, message: 'Access denied' });
      return;
    }

    const updated = await updateAppointmentStatus(id, status);

    res.status(200).json({
      success: true,
      message: 'Appointment status updated successfully',
      data: updated,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update status';
    res.status(400).json({ success: false, message });
  }
}

/**
 * Cancel appointment
 * POST /api/appointments/:id/cancel
 */
export async function cancel(req: Request, res: Response): Promise<void> {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const appointment = await getAppointmentById(id);

    if (!appointment) {
      res.status(404).json({ success: false, message: 'Appointment not found' });
      return;
    }

    // Only patient or doctor can cancel
    if (
      req.user!.userId !== appointment.patientId.toString() &&
      req.user!.userId !== appointment.doctorId.toString() &&
      req.user!.role !== 'ADMIN'
    ) {
      res.status(403).json({ success: false, message: 'Access denied' });
      return;
    }

    const cancelled = await cancelAppointment(id);

    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully',
      data: cancelled,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to cancel appointment';
    res.status(400).json({ success: false, message });
  }
}

/**
 * Get available slots for a doctor
 * GET /api/appointments/available/:doctorId?date=2024-01-01
 */
export async function getAvailable(req: Request, res: Response): Promise<void> {
  try {
    const doctorId = Array.isArray(req.params.doctorId) ? req.params.doctorId[0] : req.params.doctorId;
    const { date } = req.query;

    if (!date) {
      res.status(400).json({ success: false, message: 'Date is required' });
      return;
    }

    const slots = await getAvailableSlots(doctorId, new Date(date as string));

    res.status(200).json({
      success: true,
      data: slots,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get available slots';
    res.status(500).json({ success: false, message });
  }
}
