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
  next: NextFunction
) => {
  try {
    // Validate input using Zod
    const bookingResult = CreateBookingDTO.safeParse(req.body);
    if (!bookingResult.success) {
      throw new ValidationError(bookingResult.error.message);
    }

    const { userId, hotelId, checkIn, checkOut, noOfRooms, roomType, noOfGuests } =
      bookingResult.data;

    if (!userId) {
      throw new UnauthorizedError("Unauthorized");
    }

    // Validate hotelId before querying MongoDB
    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      throw new NotFoundError("Hotel not found");
    }

    // Find hotel
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }

    // Assign room numbers
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

    // Create booking
    const user = await User.findOne({ clerkId: userId }); // userId from Clerk
    if (!user) throw new NotFoundError("User not found");

    const newBooking = await Booking.create({
      userId: user._id,
      hotelId: hotelId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      noOfRooms: noOfRooms,
      roomType: roomType,
      noOfGuests: noOfGuests,
      roomNumbers: assignedRoomNumbers,
      paymentStatus: "PENDING",
    });    

    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Create Booking Error:", error);
    next(error);
  }
};


export const getAllBookingsForHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
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
  next: NextFunction
) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
    return;
  } catch (error) {
    next(error);
  }
};

export const getBookingById = async (
  req: Request,
  res: Response,
  next: NextFunction
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
