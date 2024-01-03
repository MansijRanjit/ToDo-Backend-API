import HttpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";

import loggerWithNameSpace from "../util/logger";

import UnauthenticatedError from "../error/unauthenticatedError";
import BadRequestError from "../error/badRequestError";
import ConflictError from "../error/conflictError";
import NotFoundError from "../error/notFoundError";
import NoContentError from "../error/noContentError";

const logger = loggerWithNameSpace("ErrorHandler");

/**
 * Error response middleware for 404 not found. This middleware function should be at the very bottom of the stack.
 *
 */
export function notFoundError(_req: Request, res: Response) {
  return res.status(HttpStatus.NOT_FOUND).json({
    message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
  });
}

export function genericErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction // eslint-disable-line
) {
  if (err.stack) {
    logger.error(err.stack);
  }

  if (err instanceof BadRequestError) {
    return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
  }

  if (err instanceof UnauthenticatedError) {
    return res.status(HttpStatus.UNAUTHORIZED).json({ message: err.message });
  }

  if(err instanceof ConflictError){
    return res.status(HttpStatus.CONFLICT).json({message: err.message});
  }

  if(err instanceof NoContentError){
    return res.status(HttpStatus.NO_CONTENT).json({message:err.message});
  }

  if(err instanceof NotFoundError){
    return res.status(HttpStatus.CONFLICT).json({message: err.message})
  }

  return res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .json({ message: err.message });
}
