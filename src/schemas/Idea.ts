import mongoose, { Schema, Document } from 'mongoose';
import { IIdea, IdeaStatus } from '../types/idea';

export interface IIdeaDocument extends IIdea, Document {}

const IdeaSchema = new Schema<IIdeaDocument>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [1, 'Title must be at least 1 character long'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [1, 'Description must be at least 1 character long'],
      maxlength: [5000, 'Description cannot exceed 5000 characters'],
    },
    createdBy: {
      type: String,
      required: [true, 'createdBy is required'],
      trim: true,
      minlength: [1, 'createdBy must be at least 1 character long'],
    },
    status: {
      type: String,
      enum: {
        values: ['draft', 'approved', 'archived'],
        message: 'Status must be one of: draft, approved, archived',
      },
      default: 'draft',
      required: true,
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

IdeaSchema.index({ createdAt: -1 });
IdeaSchema.index({ status: 1 });
IdeaSchema.index({ createdBy: 1 });

export const Idea = mongoose.model<IIdeaDocument>('Idea', IdeaSchema);

