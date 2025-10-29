import Hotel from "../entities/Hotel.js";

export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    console.log({ error: "Failed tp=o fetch hotels" });
  }
};

export const createHotel = async (req, res) => {
  try {
    const hotelData = req.body;
    if (
      !hotelData.name ||
      !hotelData.location ||
      !hotelData.price ||
      !Array.isArray(hotelData.images) ||
      hotelData.images.length === 0
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const hotel = new Hotel(hotelData);
    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ error: "Failed to create hotel" });
  }
};

export const getHotelById = async (req, res) => {
  try {
    const { _id } = req.params;
    const hotel = await Hotel.findById(_id);

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};

export const updateHotel = async (req, res) => {
  try {
    const { _id } = req.params;
    const updateData = req.body;

    const hotel = await Hotel.findByIdAndUpdate(_id, updateData);

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ error: "Failed to update hotel" });
  }
};

export const patchHotel = async (req, res) => {
  try {
    const { _id } = req.params;
    const { price } = req.body;

    if (price === undefined) {
      return res.status(400).json({ error: "Price is required" });
    }

    const hotel = await Hotel.findByIdAndUpdate(
      _id,
      { price },
      { new: true, runValidators: true }
    );

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ error: "Failed to update hotel price" });
  }
};

export const deleteHotel = async (req, res) => {
  try {
    const { _id } = req.params;
    const hotel = await Hotel.findByIdAndDelete(_id);

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete hotel" });
  }
};
