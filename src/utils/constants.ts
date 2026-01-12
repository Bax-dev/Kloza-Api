
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const MESSAGES = {
  SUCCESS: 'Operation successful',
  CREATED: 'Resource created successfully',
  NOT_FOUND: 'Resource not found',
  BAD_REQUEST: 'Invalid request',
  VALIDATION_ERROR: 'Validation error',
  SERVER_ERROR: 'Internal server error',
  MISSING_FIELDS: 'Missing required fields',
  INVALID_ID: 'Invalid ID format',
} as const;

export const VALIDATION = {
  TITLE_MIN_LENGTH: 1,
  TITLE_MAX_LENGTH: 200,
  DESCRIPTION_MIN_LENGTH: 1,
  DESCRIPTION_MAX_LENGTH: 5000,
  CREATED_BY_MIN_LENGTH: 1,
  MONGODB_OBJECT_ID_LENGTH: 24,
  GOAL_MIN_LENGTH: 1,
  GOAL_MAX_LENGTH: 1000,
  SUCCESS_CRITERIA_MIN_LENGTH: 1,
  SUCCESS_CRITERIA_MAX_LENGTH: 2000,
  MESSAGE_MIN_LENGTH: 1,
  MESSAGE_MAX_LENGTH: 5000,
  AUTHOR_MIN_LENGTH: 1,
} as const;

export const IDEA_STATUS = {
  DRAFT: 'draft',
  APPROVED: 'approved',
  ARCHIVED: 'archived',
} as const;

export const KOLLAB_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const OBJECT_ID_PATTERN = /^[0-9a-fA-F]{24}$/;
