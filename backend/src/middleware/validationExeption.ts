import { NextFunction, Request, Response } from "express";

export class ValidationException extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.name = "ValidationException";
    this.status = 400;
  }
}

export function errorValidation(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ValidationException) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  next(err);
}
