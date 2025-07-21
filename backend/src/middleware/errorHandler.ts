import { NextFunction, Request, Response } from "express";

export class ApiError extends Error {
  constructor(public message: string, public statusCode: number = 500) {
    super(message);
    this.name = "ApiError";
  }
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Optional: log actual error in dev
  console.error(err);

  return res.status(500).json({ message: "Internal Server Error" });
}
