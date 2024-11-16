import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { Response } from "express";
import { z } from "zod";

export const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));

  res.status(HttpStatusCodes.BAD_REQUEST).json({
    errors,
    status: "BAD_REQUEST",
    code: HttpStatusCodes.BAD_REQUEST,
    message: error.issues[0].message,
  });
};

export const handleAppError = (res: Response, error: Error) => {
  res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
    message: error.message,
  });
};
