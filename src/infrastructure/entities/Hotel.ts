import mongoose, { Schema } from "mongoose";

const roomTypeSchema = new Schema({
  id: {
    type: String,
    required: [true, "Room type ID is required"],
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  stripePriceId: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  features: {
    type: [String],
  },
});

const hotelSchema = new Schema(
  {
    stripePriceId: { 
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    reviews: {
      type: [String],
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    amenities: [
      {
        name: { type: String },
        longName: { type: String },
        icon: { type: String },
      },
    ],
    highlights: {
      type: [String],
    },
    roomTypes: [roomTypeSchema],
    embedding: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
