export interface IDiscussion {
  kollabId: string;
  message: string;
  author: string;
  createdAt: Date;
}

export interface CreateDiscussionDto {
  message: string;
  author: string;
}

