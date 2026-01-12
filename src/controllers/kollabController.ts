import { Request, Response } from 'express';
import { Kollab } from '../schemas/Kollab';
import { Idea } from '../schemas/Idea';
import { CreateKollabDto } from '../types/kollab';
import { validateCreateKollab, validateObjectId, sanitizeString } from '../utils/validators';
import { sendCreated, sendSuccess, sendError, sendBadRequest, sendNotFound, sendValidationError } from '../utils/response';
import { HTTP_STATUS, MESSAGES } from '../utils/constants';

export const createKollab = async (req: Request, res: Response): Promise<void> => {
  try {
    const kollabData: CreateKollabDto = req.body;

    const validation = validateCreateKollab(kollabData);
    if (!validation.isValid) {
      sendValidationError(res, validation.errors);
      return;
    }

    const idea = await Idea.findById(kollabData.ideaId);
    if (!idea) {
      sendNotFound(res, 'Idea not found');
      return;
    }

    if (idea.status !== 'approved') {
      sendError(
        res,
        'Cannot create a Kollab for an idea that is not approved',
        HTTP_STATUS.BAD_REQUEST
      );
      return;
    }

    const existingActiveKollab = await Kollab.findOne({
      ideaId: kollabData.ideaId,
      status: 'active',
    });

    if (existingActiveKollab) {
      sendError(
        res,
        'An active Kollab already exists for this idea',
        HTTP_STATUS.CONFLICT
      );
      return;
    }

    const kollab = new Kollab({
      ideaId: kollabData.ideaId,
      goal: sanitizeString(kollabData.goal),
      participants: kollabData.participants.map((p) => sanitizeString(p)),
      successCriteria: sanitizeString(kollabData.successCriteria),
      status: kollabData.status || 'active',
      createdAt: new Date(),
    });

    const savedKollab = await kollab.save();
    
    await savedKollab.populate('ideaId');

    sendCreated(res, savedKollab, 'Kollab created successfully');
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        sendValidationError(res, error.message);
        return;
      }

      if (error.name === 'MongoServerError' && (error as { code?: number }).code === 11000) {
        sendError(
          res,
          'An active Kollab already exists for this idea',
          HTTP_STATUS.CONFLICT
        );
        return;
      }
    }

    sendError(
      res,
      'Error creating Kollab',
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
};

export const getKollabById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const kollabId = Array.isArray(id) ? id[0] : id;

    // Validate MongoDB ObjectId format
    if (!validateObjectId(kollabId)) {
      sendBadRequest(res, MESSAGES.INVALID_ID);
      return;
    }

    // Find kollab and populate the ideaId reference
    const kollab = await Kollab.findById(kollabId).populate('ideaId');

    if (!kollab) {
      sendNotFound(res, 'Kollab not found');
      return;
    }

    sendSuccess(res, kollab, 'Kollab retrieved successfully');
  } catch (error) {
    sendError(
      res,
      'Error fetching Kollab',
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
};

