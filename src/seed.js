import connectDB from "./db.js";
import Hotel from "./entities/Hotel.js";
import Location from "./entities/Location.js";

const hotels = [
  {
    name: "Montmartre Majesty Hotel",
    images: ["https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg"],
    location: "Paris, France",
    rating: 4.7,
    reviews: ["K", "L"],
    price: 160,
    amenities: ["Wifi", "Spa", "Pool", "Restaurant"],
  },
  {
    name: "Loire Luxury Lodge",
    images: ["https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"],
    location: "Sydney, Australia",
    rating: 4.7,
    reviews: ["K", "L"],
    price: 200,
    amenities: ["Pool", "Beach", "Spa", "Gym"],
  },
  {
    name: "Tokyo Tower Inn",
    images:
      ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    location: "Tokyo, Japan",
    rating: 4.4,
    reviews: ["K", "L"],
    price: 250,
    amenities: ["Ski", "Fireplace", "Spa", "Gym", "Restaurantm"],
  },
];

const locations = [
  { name: "Paris", country: "France", hotels: 245 },
  { name: "Tokyo", country: "Japan", hotels: 189 },
  { name: "New York", country: "USA", hotels: 312 },
  { name: "London", country: "UK", hotels: 198 },
];

const seedDataBase = async () => {
  try {
    await connectDB();

    await Hotel.deleteMany({});
    await Location.deleteMany({});

    console.log("Cleared existing data");

    const createdHotels = await Hotel.insertMany(hotels);
    console.log(`Created ${createdHotels.length} locations`);

    const createdLocations = await Location.insertMany(locations);
    console.log(`Created ${createdLocations.length} locations`);



    console.log("Updated hotels with review references");

    console.log("Database seeded successfully!");

    // Display summary
    console.log("\n=== SEED SUMMARY ===");
    console.log(`Hotels: ${createdHotels.length}`);
    console.log(`Locations: ${createdLocations.length}`);
    // console.log(`Users: ${createdUsers.length}`);
    // console.log(`Reviews: ${createdReviews.length}`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDataBase();
