import { Request, Response, NextFunction } from "express";
import UnauthorizedError from "../../domain/errors/unauthorized-error";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.auth();
  console.log("IS_AUTHENTICATED", auth?.isAuthenticated);
  if (!auth?.isAuthenticated) {
    throw new UnauthorizedError("Unauthorized");
  }
  next();
};

export default isAuthenticated;
