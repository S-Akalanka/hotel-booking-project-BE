import { Request, Response, NextFunction } from "express";
import User from "../infrastructure/entities/User";
import Booking from "../infrastructure/entities/Booking";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import { UpdateUserDTO, UserDTO } from "../domain/dtos/user";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = req.auth();
    const userId = auth?.userId;
    let userDetails = await User.findOne({ clerkId: userId });
    res.status(200).json(userDetails);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = req.auth();
    const userId = auth?.userId;

    const {
      clerkId,
      role,
      fullName,
      firstName,
      lastName,
      email,
      imageUrl,
      phoneNumbers,
      address,
    } = req.body;

    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      user = await User.create({
        clerkId,
        role,
        fullName,
        firstName,
        lastName,
        email,
        imageUrl,
        phoneNumbers,
        address,
      });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getPastBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = req.auth();
    const clerkId = auth?.userId;
    const user = await User.findOne({ clerkId });
    if (!user) {
      return next(new NotFoundError("User not found"));
    }

    const bookingList = await Booking.find({ userId: user._id })
      .populate("hotelId")
      .sort({ createdAt: -1 });

    if (!bookingList) {
      return next(new NotFoundError("No bookings found for this user"));
    }

    res.status(200).json(bookingList);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = req.auth();
    const clerkId = auth?.userId;
    const user = await User.findOne({ clerkId });
    if (!user) {
      console.log("err");
      
      return next(new NotFoundError("User not found"));
    }

    const result = UpdateUserDTO.safeParse(req.body);

    if (!result.success) {
      throw new ValidationError(`${result.error.message}`);
    }

    const updated = await User.findByIdAndUpdate(
      user._id,
      { $set: result.data },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};
