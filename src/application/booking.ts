import { Request, Response, NextFunction } from "express";
import Booking from "../infrastructure/entities/Booking";
import { CreateBookingDTO } from "../domain/dtos/booking";
import ValidationError from "../domain/errors/validation-error";
import NotFoundError from "../domain/errors/not-found-error";
import Hotel from "../infrastructure/entities/Hotel";
import { getAuth } from "@clerk/express";
import UnauthorizedError from "../domain/errors/unauthorized-error";
import User from "../entities/User";

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1️⃣ Validate input using Zod
    const bookingResult = CreateBookingDTO.safeParse(req.body);
    if (!bookingResult.success) {
      throw new ValidationError(bookingResult.error.message);
    }

    const { hotelId, checkIn, checkOut, noOfGuests, userId, noOfRooms } =
      bookingResult.data;

    if (!userId) {
      throw new UnauthorizedError("Unauthorized");
    }

    // 2️⃣ ✅ Validate hotelId before querying MongoDB
    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      throw new NotFoundError("Hotel not found");
    }

    // 3️⃣ Find hotel
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }

    // 4️⃣ Assign room numbers
    const assignedRoomNumbers: number[] = [];
    for (let i = 0; i < noOfRooms; i++) {
      let roomNumber: number;
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

    // 5️⃣ Create booking
    const user = await User.findOne({ clerkId: userId }); // userId from Clerk
    if (!user) throw new NotFoundError("User not found");

    const newBooking = await Booking.create({
      hotelId,
      user,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      roomNumbers: assignedRoomNumbers,
      noOfGuests,
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
