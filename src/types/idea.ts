export type IdeaStatus = 'draft' | 'approved' | 'archived';

export interface IIdea {
  title: string;
  description: string;
  createdBy: string;
  status: IdeaStatus;
  createdAt: Date;
}

export interface CreateIdeaDto {
  title: string;
  description: string;
  createdBy: string;
  status?: IdeaStatus;
}

