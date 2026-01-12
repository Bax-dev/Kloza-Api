import { Request, Response } from 'express';
import { Idea } from '../../schemas/Idea';
import { getIdeaById } from '../../controllers/ideaController';
import { sendSuccess, sendBadRequest, sendNotFound } from '../../utils/response';
import { validateObjectId } from '../../utils/validators';
import { MESSAGES } from '../../utils/constants';

// Mock dependencies
jest.mock('../../schemas/Idea');
jest.mock('../../utils/response');
jest.mock('../../utils/validators');

const mockIdea = Idea as jest.Mocked<typeof Idea>;
const mockSendSuccess = sendSuccess as jest.MockedFunction<typeof sendSuccess>;
const mockSendBadRequest = sendBadRequest as jest.MockedFunction<typeof sendBadRequest>;
const mockSendNotFound = sendNotFound as jest.MockedFunction<typeof sendNotFound>;
const mockValidateObjectId = validateObjectId as jest.MockedFunction<typeof validateObjectId>;

describe('getIdeaById', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockReq = {
      params: {
        id: '507f1f77bcf86cd799439011',
      },
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it('should return idea when valid ID is provided and idea exists', async () => {
    const mockIdeaData = {
      _id: '507f1f77bcf86cd799439011',
      title: 'Test Idea',
      description: 'Test Description',
      createdBy: 'user123',
      status: 'draft',
      createdAt: new Date(),
    };

    mockValidateObjectId.mockReturnValue(true);
    mockIdea.findById = jest.fn().mockResolvedValue(mockIdeaData);

    await getIdeaById(mockReq as Request, mockRes as Response);

    expect(mockValidateObjectId).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
    expect(mockIdea.findById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
    expect(mockSendSuccess).toHaveBeenCalledWith(
      mockRes,
      mockIdeaData,
      'Idea retrieved successfully'
    );
  });

  it('should return 400 when invalid ID format is provided', async () => {
    mockValidateObjectId.mockReturnValue(false);

    await getIdeaById(mockReq as Request, mockRes as Response);

    expect(mockValidateObjectId).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
    expect(mockSendBadRequest).toHaveBeenCalledWith(mockRes, MESSAGES.INVALID_ID);
    expect(mockIdea.findById).not.toHaveBeenCalled();
  });

  it('should return 404 when idea is not found', async () => {
    mockValidateObjectId.mockReturnValue(true);
    mockIdea.findById = jest.fn().mockResolvedValue(null);

    await getIdeaById(mockReq as Request, mockRes as Response);

    expect(mockValidateObjectId).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
    expect(mockIdea.findById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
    expect(mockSendNotFound).toHaveBeenCalledWith(mockRes, 'Idea not found');
  });

  it('should handle array ID parameter', async () => {
    const mockIdeaData = {
      _id: '507f1f77bcf86cd799439011',
      title: 'Test Idea',
      description: 'Test Description',
      createdBy: 'user123',
      status: 'draft',
      createdAt: new Date(),
    };

    mockReq.params = {
      id: ['507f1f77bcf86cd799439011'] as unknown as string,
    };

    mockValidateObjectId.mockReturnValue(true);
    mockIdea.findById = jest.fn().mockResolvedValue(mockIdeaData);

    await getIdeaById(mockReq as Request, mockRes as Response);

    expect(mockValidateObjectId).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
    expect(mockIdea.findById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
    expect(mockSendSuccess).toHaveBeenCalled();
  });
});

