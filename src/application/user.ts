import { Request, Response, NextFunction } from "express";
import User from "../entities/User";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.auth || {};
    const { email, name, imageUrl } = req.body;

    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      user = await User.create({
        clerkId: userId,
        email,
        name,
        imageUrl,
      });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
