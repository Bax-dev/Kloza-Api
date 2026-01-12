import mongoose, { Schema, Document } from 'mongoose';
import { IDiscussion } from '../types/discussion';

export interface IDiscussionDocument extends Omit<IDiscussion, 'kollabId'>, Document {
  kollabId: mongoose.Types.ObjectId;
}

const DiscussionSchema = new Schema<IDiscussionDocument>(
  {
    kollabId: {
      type: Schema.Types.ObjectId,
      ref: 'Kollab',
      required: [true, 'kollabId is required'],
      index: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [1, 'Message must be at least 1 character long'],
      maxlength: [5000, 'Message cannot exceed 5000 characters'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
      minlength: [1, 'Author must be at least 1 character long'],
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

DiscussionSchema.index({ kollabId: 1, createdAt: -1 });
DiscussionSchema.index({ createdAt: -1 });

export const Discussion = mongoose.model<IDiscussionDocument>('Discussion', DiscussionSchema);

