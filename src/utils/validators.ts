import { CreateIdeaDto } from '../types/idea';
import { CreateKollabDto } from '../types/kollab';
import { CreateDiscussionDto } from '../types/discussion';
import { VALIDATION, OBJECT_ID_PATTERN, IDEA_STATUS, KOLLAB_STATUS } from './constants';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}


export const validateObjectId = (id: string): boolean => {
  return OBJECT_ID_PATTERN.test(id);
};

export const validateCreateIdea = (data: CreateIdeaDto): ValidationResult => {
  const errors: string[] = [];

  if (!data.title || typeof data.title !== 'string') {
    errors.push('Title is required and must be a string');
  } else {
    const trimmedTitle = data.title.trim();
    if (trimmedTitle.length < VALIDATION.TITLE_MIN_LENGTH) {
      errors.push(`Title must be at least ${VALIDATION.TITLE_MIN_LENGTH} character(s) long`);
    }
    if (trimmedTitle.length > VALIDATION.TITLE_MAX_LENGTH) {
      errors.push(`Title cannot exceed ${VALIDATION.TITLE_MAX_LENGTH} characters`);
    }
  }

  if (!data.description || typeof data.description !== 'string') {
    errors.push('Description is required and must be a string');
  } else {
    const trimmedDescription = data.description.trim();
    if (trimmedDescription.length < VALIDATION.DESCRIPTION_MIN_LENGTH) {
      errors.push(`Description must be at least ${VALIDATION.DESCRIPTION_MIN_LENGTH} character(s) long`);
    }
    if (trimmedDescription.length > VALIDATION.DESCRIPTION_MAX_LENGTH) {
      errors.push(`Description cannot exceed ${VALIDATION.DESCRIPTION_MAX_LENGTH} characters`);
    }
  }

  if (!data.createdBy || typeof data.createdBy !== 'string') {
    errors.push('createdBy is required and must be a string');
  } else {
    const trimmedCreatedBy = data.createdBy.trim();
    if (trimmedCreatedBy.length < VALIDATION.CREATED_BY_MIN_LENGTH) {
      errors.push(`createdBy must be at least ${VALIDATION.CREATED_BY_MIN_LENGTH} character(s) long`);
    }
  }

  if (data.status !== undefined) {
    if (typeof data.status !== 'string') {
      errors.push('Status must be a string');
    } else if (!Object.values(IDEA_STATUS).includes(data.status as typeof IDEA_STATUS[keyof typeof IDEA_STATUS])) {
      errors.push(`Status must be one of: ${Object.values(IDEA_STATUS).join(', ')}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};


export const validateRequiredFields = (
  data: Record<string, unknown>,
  requiredFields: string[]
): ValidationResult => {
  const errors: string[] = [];

  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim().length === 0)) {
      errors.push(`${field} is required`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};


export const sanitizeString = (value: string): string => {
  return value.trim();
};

/**
 * Validates discussion creation data
 */
export const validateCreateDiscussion = (data: CreateDiscussionDto): ValidationResult => {
  const errors: string[] = [];

  if (!data.message || typeof data.message !== 'string') {
    errors.push('Message is required and must be a string');
  } else {
    const trimmedMessage = data.message.trim();
    if (trimmedMessage.length < VALIDATION.MESSAGE_MIN_LENGTH) {
      errors.push(`Message must be at least ${VALIDATION.MESSAGE_MIN_LENGTH} character(s) long`);
    }
    if (trimmedMessage.length > VALIDATION.MESSAGE_MAX_LENGTH) {
      errors.push(`Message cannot exceed ${VALIDATION.MESSAGE_MAX_LENGTH} characters`);
    }
  }

  if (!data.author || typeof data.author !== 'string') {
    errors.push('Author is required and must be a string');
  } else {
    const trimmedAuthor = data.author.trim();
    if (trimmedAuthor.length < VALIDATION.AUTHOR_MIN_LENGTH) {
      errors.push(`Author must be at least ${VALIDATION.AUTHOR_MIN_LENGTH} character(s) long`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};


export const validateCreateKollab = (data: CreateKollabDto): ValidationResult => {
  const errors: string[] = [];

  if (!data.ideaId || typeof data.ideaId !== 'string') {
    errors.push('ideaId is required and must be a string');
  } else if (!validateObjectId(data.ideaId)) {
    errors.push('ideaId must be a valid MongoDB ObjectId');
  }

  // Validate goal
  if (!data.goal || typeof data.goal !== 'string') {
    errors.push('Goal is required and must be a string');
  } else {
    const trimmedGoal = data.goal.trim();
    if (trimmedGoal.length < VALIDATION.GOAL_MIN_LENGTH) {
      errors.push(`Goal must be at least ${VALIDATION.GOAL_MIN_LENGTH} character(s) long`);
    }
    if (trimmedGoal.length > VALIDATION.GOAL_MAX_LENGTH) {
      errors.push(`Goal cannot exceed ${VALIDATION.GOAL_MAX_LENGTH} characters`);
    }
  }

  if (!Array.isArray(data.participants)) {
    errors.push('Participants must be an array');
  } else if (data.participants.length === 0) {
    errors.push('At least one participant is required');
  } else {
    data.participants.forEach((participant, index) => {
      if (typeof participant !== 'string' || participant.trim().length === 0) {
        errors.push(`Participant at index ${index} must be a non-empty string`);
      }
    });
  }

  if (!data.successCriteria || typeof data.successCriteria !== 'string') {
    errors.push('Success criteria is required and must be a string');
  } else {
    const trimmedCriteria = data.successCriteria.trim();
    if (trimmedCriteria.length < VALIDATION.SUCCESS_CRITERIA_MIN_LENGTH) {
      errors.push(`Success criteria must be at least ${VALIDATION.SUCCESS_CRITERIA_MIN_LENGTH} character(s) long`);
    }
    if (trimmedCriteria.length > VALIDATION.SUCCESS_CRITERIA_MAX_LENGTH) {
      errors.push(`Success criteria cannot exceed ${VALIDATION.SUCCESS_CRITERIA_MAX_LENGTH} characters`);
    }
  }

  if (data.status !== undefined) {
    if (typeof data.status !== 'string') {
      errors.push('Status must be a string');
    } else if (!Object.values(KOLLAB_STATUS).includes(data.status as typeof KOLLAB_STATUS[keyof typeof KOLLAB_STATUS])) {
      errors.push(`Status must be one of: ${Object.values(KOLLAB_STATUS).join(', ')}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

