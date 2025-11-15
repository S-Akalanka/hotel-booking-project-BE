import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";
import NotFoundError from "../domain/errors/not-found-error";
import Hotel from "../infrastructure/entities/Hotel";
import { CreateHotelDTO } from "../domain/dtos/hotel";
import { tr } from "zod/v4/locales";

export const getAllHotels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

export const createHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotelData = req.body;
    const result = CreateHotelDTO.safeParse(hotelData);

    if (!result.success) {
      throw new ValidationError(`${result.error.message}`);
    }
    const hotel = new Hotel(result.data);
    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    next(error);
  }
};

export const getHotelById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.params;
    const hotel = await Hotel.findById(_id);

    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }

    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    const hotelData = req.body;
    if (
      !hotelData.name ||
      !hotelData.location ||
      !hotelData.price ||
      !Array.isArray(hotelData.images) ||
      hotelData.images.length === 0
    ) {
      throw new ValidationError("Invalid hotel data");
    }

    const hotel = await Hotel.findById(_id);
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }

    await Hotel.findByIdAndUpdate(_id, hotelData);
    res.status(200).json(hotelData);
  } catch (error) {
    next(error);
  }
};

export const patchHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    const hotelData = req.body;
    if (!hotelData.price) {
      throw new ValidationError("Price is required");
    }
    const hotel = await Hotel.findById(_id);
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }
    await Hotel.findByIdAndUpdate(_id, { price: hotelData.price });
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params._id;
    const hotel = await Hotel.findById(_id);
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }
    await Hotel.findByIdAndDelete(_id);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

export const searchHotels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { location, checkIn, checkOut, guest } = req.query;

    console.log(location, checkIn, checkOut, guest);

    if (!location && !checkIn && !checkOut && !guest) {
      console.log("1st");
      throw new ValidationError("Location or/and all data required");
    } else if (location && checkIn && checkOut && guest !== "0") {
      // // Full filter logic placeholder
      const hotels = await Hotel.find();
      const filteredHotels = hotels.slice(3,).filter((hotel) => {
        return hotel.location
          .toLowerCase()
          .includes(String(location).toLowerCase());
      });
      res.status(200).json(filteredHotels);
    } else if (location) {
      const hotels = await Hotel.find();
      const filteredHotels = hotels.filter((hotel) => {
        return hotel.location
          .toLowerCase()
          .includes(String(location).toLowerCase());
      });
      res.status(200).json(filteredHotels);
    }
    res.status(400).send();
  } catch (error) {
    next(error);
  }
};
