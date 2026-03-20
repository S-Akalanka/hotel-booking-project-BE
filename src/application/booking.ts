import { Request, Response, NextFunction } from "express";
import { CreateBookingDTO } from "../domain/dtos/booking";
import ValidationError from "../domain/errors/validation-error";
import NotFoundError from "../domain/errors/not-found-error";
import Hotel from "../infrastructure/entities/Hotel";
import { getAuth } from "@clerk/express";
import UnauthorizedError from "../domain/errors/unauthorized-error";
import User from "../infrastructure/entities/User";
import Booking from "../infrastructure/entities/Booking";
import mongoose from "mongoose";

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bookingResult = CreateBookingDTO.safeParse(req.body);
    if (!bookingResult.success) {
      throw new ValidationError(bookingResult.error.message);
    }

    // 1. Get Secure User Identity from Clerk
    const { userId } = getAuth(req);
    if (!userId) {
      throw new UnauthorizedError("Unauthorized"); // [cite: 290]
    }

    // 2. Validate Hotel & Data
    const {
      hotelId,
      checkIn,
      checkOut,
      noOfRooms,
      roomType,
      noOfGuests,
      price,
    } = bookingResult.data;
    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      throw new NotFoundError("Hotel not found");
    }

    // 3. Room Assignment Logic
    const assignedRoomNumbers: number[] = [];
    for (let i = 0; i < noOfRooms; i++) {
      let roomNumber: number = 0;
      let isAvailable = false;
      while (!isAvailable) {
        roomNumber = Math.floor(Math.random() * 1000) + 1;
        const existingBooking = await Booking.findOne({
          hotelId,
          roomNumbers: roomNumber,
          $or: [
            {
              checkIn: { $lte: new Date(checkOut) },
              checkOut: { $gte: new Date(checkIn) },
            },
          ],
        });
        isAvailable = !existingBooking;
      }
      assignedRoomNumbers.push(roomNumber);
    }

    // 4. Find the Database User record
    const user = await User.findOne({ clerkId: userId });
    if (!user) throw new NotFoundError("User not found");

    // 5. Create the "Payable Entity" with PENDING status [cite: 33, 34, 59, 60]
    const newBooking = await Booking.create({
      userId: user._id,
      hotelId: hotelId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      noOfRooms: noOfRooms,
      roomType: roomType,
      noOfGuests: noOfGuests,
      roomNumbers: assignedRoomNumbers,
      price: price,
      status: "CONFIRMED",
      paymentStatus: "PENDING",
    });

    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
};

export const getAllBookingsForHotel = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const hotelId = req.params.hotelId;
    const bookings = await Booking.find({ hotelId: hotelId });
    res.status(200).json(bookings);
    return;
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
    return;
  } catch (error) {
    next(error);
  }
};

export const getBookingById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bookingId = req.params.bookingId;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw new NotFoundError("Booking not found");
    }
    res.status(200).json(booking);
    return;
  } catch (error) {
    next(error);
  }
};
