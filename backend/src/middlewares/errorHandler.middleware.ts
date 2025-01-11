import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { z } from "zod";
import ApiError from "../utils/ApiError";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));

  return res.status(BAD_REQUEST).json({
    message: error.message,
    errors,
  });
};

const handleApiError = (res: Response, error: ApiError) => {
  return res.status(error.statusCode).json({
    statusCode: error.statusCode,
    message: error.message,
  });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`Error occured PATH: ${req.path}`, error);
  if (error instanceof z.ZodError) {
    return handleZodError(res, error);
  }
  if (error instanceof ApiError) {
    return handleApiError(res, error);
  }
  return res.status(INTERNAL_SERVER_ERROR).json({
    statusCode: INTERNAL_SERVER_ERROR,
    message: "Error occured",
    error
  });
};

export default errorHandler;
