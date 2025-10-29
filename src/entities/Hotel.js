import mongoose, { Schema } from "mongoose";

const hotelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    reviews: {
        type: [String],
    },
    price: {
        type: Number,
        required: true
    },
    amenities: {
        type: [String],
    },
})

const Hotel = mongoose.model("Hotel", hotelSchema);


export default Hotel;
