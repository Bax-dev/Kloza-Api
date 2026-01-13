import { Request, Response } from 'express';
import { Discussion } from '../schemas/Discussion';
import { Kollab } from '../schemas/Kollab';
import { CreateDiscussionDto } from '../types/discussion';
import { validateCreateDiscussion, validateObjectId, sanitizeString } from '../utils/validators';
import { sendCreated, sendError, sendBadRequest, sendNotFound, sendValidationError } from '../utils/response';
import { HTTP_STATUS, MESSAGES } from '../utils/constants';

export const createDiscussion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const discussionData: CreateDiscussionDto = req.body;

    const kollabId = Array.isArray(id) ? id[0] : id;

    if (!validateObjectId(kollabId)) {
      sendBadRequest(res, MESSAGES.INVALID_ID);
      return;
    }

    const validation = validateCreateDiscussion(discussionData);
    if (!validation.isValid) {
      sendValidationError(res, validation.errors);
      return;
    }

    const kollab = await Kollab.findById(kollabId);
    if (!kollab) {
      sendNotFound(res, 'Kollab not found');
      return;
    }

    const discussion = new Discussion({
      kollabId: kollabId,
      message: sanitizeString(discussionData.message),
      author: sanitizeString(discussionData.author),
      createdAt: new Date(),
    });

    const savedDiscussion = await discussion.save();

    await savedDiscussion.populate('kollabId');

    sendCreated(res, savedDiscussion, 'Discussion created successfully');
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        sendValidationError(res, error.message);
        return;
      }
    }

    sendError(
      res,
      'Error creating discussion',
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
};

