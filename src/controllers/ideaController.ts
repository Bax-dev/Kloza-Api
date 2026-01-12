import { Request, Response } from 'express';
import { Idea } from '../schemas/Idea';
import { CreateIdeaDto } from '../types/idea';
import { validateCreateIdea, validateObjectId, sanitizeString } from '../utils/validators';
import { sendCreated, sendListResponse, sendSuccess, sendError, sendBadRequest, sendNotFound, sendValidationError, sendPaginatedResponse } from '../utils/response';
import { HTTP_STATUS, MESSAGES } from '../utils/constants';

export const createIdea = async (req: Request, res: Response): Promise<void> => {
  try {
    const ideaData: CreateIdeaDto = req.body;

    const validation = validateCreateIdea(ideaData);
    if (!validation.isValid) {
      sendValidationError(res, validation.errors);
      return;
    }

    const idea = new Idea({
      title: sanitizeString(ideaData.title),
      description: sanitizeString(ideaData.description),
      createdBy: sanitizeString(ideaData.createdBy),
      status: ideaData.status || 'draft',
      createdAt: new Date(),
    });

    const savedIdea = await idea.save();

    sendCreated(res, savedIdea, 'Idea created successfully');
  } catch (error) {
    if (error instanceof Error) {
      // Handle validation errors from Mongoose
      if (error.name === 'ValidationError') {
        sendValidationError(res, error.message);
        return;
      }
    }

    sendError(
      res,
      'Error creating idea',
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
};

export const getIdeas = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    if (page < 1) {
      sendError(
        res,
        'Page must be greater than 0',
        HTTP_STATUS.BAD_REQUEST
      );
      return;
    }

    if (limit < 1 || limit > 100) {
      sendError(
        res,
        'Limit must be between 1 and 100',
        HTTP_STATUS.BAD_REQUEST
      );
      return;
    }

    // Get total count and paginated results
    const [ideas, total] = await Promise.all([
      Idea.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Idea.countDocuments(),
    ]);

    sendPaginatedResponse(res, ideas, page, limit, total, 'Ideas retrieved successfully');
  } catch (error) {
    sendError(
      res,
      'Error fetching ideas',
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
};

export const getIdeaById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const ideaId = Array.isArray(id) ? id[0] : id;

    if (!validateObjectId(ideaId)) {
      sendBadRequest(res, MESSAGES.INVALID_ID);
      return;
    }

    const idea = await Idea.findById(ideaId);

    if (!idea) {
      sendNotFound(res, 'Idea not found');
      return;
    }

    sendSuccess(res, idea, 'Idea retrieved successfully');
  } catch (error) {
    sendError(
      res,
      'Error fetching idea',
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
};
