import { Types } from 'mongoose';

export type KollabStatus = 'active' | 'completed' | 'cancelled';

export interface IKollab {
  ideaId: Types.ObjectId | string;
  goal: string;
  participants: string[];
  successCriteria: string;
  status: KollabStatus;
  createdAt: Date;
}

export interface CreateKollabDto {
  ideaId: string;
  goal: string;
  participants: string[];
  successCriteria: string;
  status?: KollabStatus;
}

