import mongoose, { Schema, Document } from 'mongoose';
import { IKollab, KollabStatus } from '../types/kollab';

export interface IKollabDocument extends Omit<IKollab, 'ideaId'>, Document {
  ideaId: mongoose.Types.ObjectId;
}

const KollabSchema = new Schema<IKollabDocument>(
  {
    ideaId: {
      type: Schema.Types.ObjectId,
      ref: 'Idea',
      required: [true, 'ideaId is required'],
      index: true,
    },
    goal: {
      type: String,
      required: [true, 'Goal is required'],
      trim: true,
      minlength: [1, 'Goal must be at least 1 character long'],
      maxlength: [1000, 'Goal cannot exceed 1000 characters'],
    },
    participants: {
      type: [String],
      required: [true, 'Participants are required'],
      validate: {
        validator: (participants: string[]) => {
          return Array.isArray(participants) && participants.length > 0;
        },
        message: 'At least one participant is required',
      },
    },
    successCriteria: {
      type: String,
      required: [true, 'Success criteria is required'],
      trim: true,
      minlength: [1, 'Success criteria must be at least 1 character long'],
      maxlength: [2000, 'Success criteria cannot exceed 2000 characters'],
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'completed', 'cancelled'],
        message: 'Status must be one of: active, completed, cancelled',
      },
      default: 'active',
      required: true,
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

KollabSchema.index({ ideaId: 1, status: 1 });
KollabSchema.index({ createdAt: -1 });

// Business Rule: An idea can only have one active Kollab
// Unique compound index with partial filter ensures only one active Kollab per idea
KollabSchema.index({ ideaId: 1, status: 1 }, { unique: true, partialFilterExpression: { status: 'active' } });

export const Kollab = mongoose.model<IKollabDocument>('Kollab', KollabSchema);

