import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";
import NotFoundError from "../domain/errors/not-found-error";
import Hotel from "../infrastructure/entities/Hotel";
import { CreateHotelDTO, SearchHotelDTO } from "../domain/dtos/hotel";
import { tr } from "zod/v4/locales";
import { generateEmbedding } from "./utils/embeddings";
import Stripe from "stripe";

export const getAllHotels = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
  next: NextFunction,
) => {
  
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
  });

  try {
    const hotelData = req.body;
    const result = CreateHotelDTO.safeParse(hotelData);

    if (!result.success) {
      throw new ValidationError(`${result.error.message}`);
    }
    const embedding = await generateEmbedding(
      `${result.data.name} ${result.data.description} ${result.data.location} ${result.data.price}`,
    );

    const product = await stripe.products.create({
      name: result.data.name,
      description: result.data.description,
      default_price_data: {
        unit_amount: Math.round(result.data.price * 100),
        currency: "usd",
      },
    });

    await Hotel.create({
      ...result.data,
      embedding: embedding,
      stripePriceId: product.default_price,
    });

    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

export const getHotelById = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
  next: NextFunction,
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

    const hotel = await Hotel.findById({ _id });
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
  next: NextFunction,
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
  next: NextFunction,
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

export const filterHotels = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { location, checkIn, checkOut, guest } = req.query;

    if (!location && !checkIn && !checkOut && !guest) {
      // todo error next, and validate existence
      throw new ValidationError("Location or/and all data required");
    } else if (location && checkIn && checkOut && guest !== "0") {
      // // Full filter logic placeholder
      const hotels = await Hotel.find();
      const filteredHotels = hotels.slice(3).filter((hotel) => {
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

export const searchHotels = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { query, sortBy, page, maxPrice, minPrice, rating, amenities } =
      req.query;

    let hotels: any[] = await Hotel.find();

    if (
      !query &&
      !sortBy &&
      !page &&
      !maxPrice &&
      !minPrice &&
      !rating &&
      !amenities
    ) {
      return res.status(200).json(hotels);
    }

    // sortby
    if (sortBy) {
      if (sortBy === "price-low")
        hotels = await Hotel.find().sort({ price: 1 });
      else if (sortBy === "price-high")
        hotels = await Hotel.find().sort({ price: -1 });
      else if (sortBy === "rating")
        hotels = await Hotel.find().sort({ rating: -1 });
    }

    if (rating) {
      hotels = hotels.filter((hotel) => {
        return hotel.rating >= parseFloat(rating as string);
      });
    }

    // amenities
    if (amenities) {
      const amenitiesArray = Array.isArray(amenities) ? amenities : [amenities];
      hotels = hotels.filter((hotel) => {
        return amenitiesArray.every((amenity) =>
          hotel.amenities.map((a: any) => a.name).includes(amenity),
        );
      });
    }

    // query
    if (query) {
      hotels = hotels.filter((hotel) => {
        return (
          hotel.name.toLowerCase().includes(String(query).toLowerCase()) ||
          hotel.location.toLowerCase().includes(String(query).toLowerCase())
        );
      });
    }

    // price range
    if (minPrice && maxPrice) {
      hotels = hotels.filter((hotel) => {
        return (
          hotel.price >= parseFloat(minPrice as string) &&
          hotel.price <= parseFloat(maxPrice as string)
        );
      });
    }

    // page
    const pageNo = parseInt(req.query.page as string) || 1;
    const limit = 7;
    const skip = (pageNo - 1) * limit;

    const totalResults = hotels.length;

    //slice
    hotels = hotels.slice(skip, skip + limit);

    const response = {
      hotels: hotels,
      totalResults: totalResults,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getAllHotelsBySearchQuery = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = SearchHotelDTO.safeParse(req.query);
    if (!result.success) {
      throw new ValidationError(`${result.error.message}`);
    }
    const { query } = result.data;

    const queryEmbedding = await generateEmbedding(query);

    const hotels = await Hotel.aggregate([
      {
        $vectorSearch: {
          index: "hotel_vector_index",
          path: "embedding",
          queryVector: queryEmbedding,
          numCandidates: 25,
          limit: 6,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          images: 1,
          location: 1,
          price: 1,
          rating: 1,
          amenities: 1,
          score: { $meta: "vectorSearchScore" },
        },
      },
    ]);

    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};
