import { Request, Response, NextFunction } from "express";
import UnauthorizedError from "../../domain/errors/unauthorized-error";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  console.log("IS_AUTHENTICATED", req.auth?.isAuthenticated);
  if (!req.auth?.isAuthenticated) {
    throw new UnauthorizedError("Unauthorized");
  }
  next();
};

export default isAuthenticated;
