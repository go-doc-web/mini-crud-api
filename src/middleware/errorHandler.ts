// middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err instanceof ApiError ? err.status : 500;
  const message = err instanceof ApiError ? err.message : "Unexpected error";

  console.error("🔥 Error:", message);
  res.status(status).json({ message });
};
