import mongoose, { Document, Schema } from 'mongoose';

export interface IDoctorProfile extends Document {
  userId: mongoose.Types.ObjectId;
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
  createdAt: Date;
  updatedAt: Date;
}

const doctorProfileSchema = new Schema<IDoctorProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      unique: true,
    },
    specialization: {
      type: String,
      required: [true, 'Specialization is required'],
      trim: true,
    },
    qualifications: {
      type: [String],
      required: [true, 'Qualifications are required'],
      validate: {
        validator: function (v: string[]) {
          return v.length > 0;
        },
        message: 'At least one qualification is required',
      },
    },
    experienceYears: {
      type: Number,
      required: [true, 'Experience years is required'],
      min: [0, 'Experience cannot be negative'],
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [1000, 'Bio cannot exceed 1000 characters'],
    },
    consultationFee: {
      type: Number,
      required: [true, 'Consultation fee is required'],
      min: [0, 'Fee cannot be negative'],
    },
    clinic: {
      name: String,
      address: String,
      phone: String,
    },
  },
  {
    timestamps: true,
    indexes: [
      { userId: 1, unique: true },
    ],
  }
);

export default mongoose.model<IDoctorProfile>('DoctorProfile', doctorProfileSchema);
