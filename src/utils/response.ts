import { Response } from 'express';
import { HTTP_STATUS, MESSAGES } from './constants';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  error?: string;
}


export const sendSuccess = <T>(
  res: Response,
  data?: T,
  message?: string,
  statusCode: number = HTTP_STATUS.OK
): void => {
  const response: ApiResponse<T> = {
    success: true,
    message: message || MESSAGES.SUCCESS,
  };

  if (data !== undefined) {
    response.data = data;
  }

  res.status(statusCode).json(response);
};


export const sendCreated = <T>(
  res: Response,
  data: T,
  message?: string
): void => {
  sendSuccess(res, data, message || MESSAGES.CREATED, HTTP_STATUS.CREATED);
};


export const sendError = (
  res: Response,
  message: string,
  statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  error?: string
): void => {
  const response: ApiResponse = {
    success: false,
    message,
  };

  if (error && process.env.NODE_ENV === 'development') {
    response.error = error;
  }

  res.status(statusCode).json(response);
};


export const sendBadRequest = (
  res: Response,
  message?: string,
  error?: string
): void => {
  sendError(res, message || MESSAGES.BAD_REQUEST, HTTP_STATUS.BAD_REQUEST, error);
};


export const sendNotFound = (
  res: Response,
  message?: string
): void => {
  sendError(res, message || MESSAGES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
};


export const sendValidationError = (
  res: Response,
  errors: string[] | string,
  message?: string
): void => {
  const errorMessage = Array.isArray(errors) ? errors.join(', ') : errors;
  sendError(
    res,
    message || MESSAGES.VALIDATION_ERROR,
    HTTP_STATUS.BAD_REQUEST,
    errorMessage
  );
};


export const sendListResponse = <T>(
  res: Response,
  data: T[],
  message?: string
): void => {
  const response: ApiResponse<T[]> = {
    success: true,
    message: message || MESSAGES.SUCCESS,
    count: data.length,
    data,
  };

  res.status(HTTP_STATUS.OK).json(response);
};

/**
 * Sends a paginated list response
 */
export const sendPaginatedResponse = <T>(
  res: Response,
  data: T[],
  page: number,
  limit: number,
  total: number,
  message?: string
): void => {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  const response: ApiResponse<T[]> & {
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  } = {
    success: true,
    message: message || MESSAGES.SUCCESS,
    count: data.length,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage,
      hasPrevPage,
    },
  };

  res.status(HTTP_STATUS.OK).json(response);
};

