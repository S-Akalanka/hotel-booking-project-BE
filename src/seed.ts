import connectDB from "./db";
import Hotel from "./entities/Hotel";
import Location from "./entities/Location";

const hotels = [
  {
    name: "Montmartre Majesty Hotel",
    images: [
      "https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg",
    ],
    location: "Paris, France",
    rating: 4.7,
    reviews: ["K", "L"],
    price: 160,
    description:
      "Luxury 5-star hotel in the heart of Manhattan with world-class amenities",
    amenities: [
      { name: "WiFi", longName: "Free WiFi", icon: "Wifi" },
      { name: "Spa", longName: "Spa & Wellness", icon: "Waves" },
      { name: "Pool", longName: "Swimming Pool", icon: "Waves" },
      { name: "Restaurant", longName: "Fine Dining", icon: "Utensils" },
      { name: "Gym", longName: "Fitness Center", icon: "Dumbbell" },
      { name: "Parking", longName: "Valet Parking", icon: "Car" },
      { name: "Concierge", longName: "Concierge Service", icon: "Users" },
      { name: "Room Service", longName: "24/7 Room Service", icon: "Coffee" },
    ],
    highlights: [
      "Prime Manhattan location",
      "Michelin-starred restaurant",
      "Rooftop infinity pool",
      "24/7 concierge service",
      "Luxury spa treatments",
      "Business center",
    ],
    roomTypes: [
      {
        id: "standard",
        name: "Standard Room",
        description: "Comfortable room with city view",
        price: 320,
        features: ["City View", "25 sqm", "Queen Bed", "Work Desk"],
      },
      {
        id: "deluxe",
        name: "Deluxe Suite",
        description: "Spacious suite with premium amenities",
        price: 450,
        features: ["Park View", "45 sqm", "King Bed", "Living Area", "Minibar"],
      },
      {
        id: "presidential",
        name: "Presidential Suite",
        description: "Ultimate luxury with panoramic views",
        price: 850,
        features: [
          "Panoramic View",
          "85 sqm",
          "King Bed",
          "Separate Living Room",
          "Butler Service",
        ],
      },
    ],
  },
  {
    name: "Loire Luxury Lodge",
    images: [
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
    ],
    location: "Sydney, Australia",
    rating: 4.7,
    reviews: ["K", "L"],
    price: 200,
    description:
      "Beachfront luxury resort with stunning ocean views and world-class spa",
    amenities: [
      { name: "Beach", longName: "Beach Access", icon: "Waves" },
      {
        name: "Infinity Pool",
        longName: "Rooftop Infinity Pool",
        icon: "Waves",
      },
      { name: "Gym", longName: "Modern Gym", icon: "Dumbbell" },
      { name: "WiFi", longName: "Free WiFi", icon: "Wifi" },
      { name: "Restaurant", longName: "Seaside Dining", icon: "Utensils" },
      { name: "Spa", longName: "Full Service Spa", icon: "Waves" },
      { name: "Concierge", longName: "Concierge Service", icon: "Users" },
      { name: "Room Service", longName: "24/7 Room Service", icon: "Coffee" },
      { name: "Parking", longName: "Valet Parking", icon: "Car" },
      { name: "Bar", longName: "Beach Bar", icon: "Coffee" },
    ],
    highlights: [
      "Private beach access",
      "Sunset cruises",
      "Live evening entertainment",
      "Kids club",
      "Infinity pool views",
    ],
    roomTypes: [
      {
        id: "standard",
        name: "Standard Room",
        description: "Comfortable room with city view",
        price: 320,
        features: ["City View", "25 sqm", "Queen Bed", "Work Desk"],
      },
      {
        id: "deluxe",
        name: "Deluxe Suite",
        description: "Spacious suite with premium amenities",
        price: 450,
        features: ["Park View", "45 sqm", "King Bed", "Living Area", "Minibar"],
      },
      {
        id: "presidential",
        name: "Presidential Suite",
        description: "Ultimate luxury with panoramic views",
        price: 850,
        features: [
          "Panoramic View",
          "85 sqm",
          "King Bed",
          "Separate Living Room",
          "Butler Service",
        ],
      },
    ],
  },
  {
    name: "Tokyo Tower Inn",
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    location: "Tokyo, Japan",
    rating: 4.4,
    reviews: ["K", "L"],
    price: 250,
    description:
      "Cozy mountain retreat perfect for ski enthusiasts and nature lovers",
    amenities: [
      { name: "Ski", longName: "Ski-in/Ski-out Access", icon: "Car" },
      { name: "Heated Pool", longName: "Indoor Heated Pool", icon: "Waves" },
      { name: "Gym", longName: "Strength Training Area", icon: "Dumbbell" },
      { name: "WiFi", longName: "Complimentary WiFi", icon: "Wifi" },
      {
        name: "Restaurant",
        longName: "Japanese Cuisine Restaurant",
        icon: "Utensils",
      },
      { name: "Spa", longName: "Onsen Spa", icon: "Waves" },
      { name: "Concierge", longName: "Personal Concierge", icon: "Users" },
      { name: "Room Service", longName: "Room Service", icon: "Coffee" },
      { name: "Parking", longName: "Garage Parking", icon: "Car" },
      { name: "Fireplace", longName: "Lobby Fireplace", icon: "Coffee" },
    ],
    highlights: [
      "Ski-in/ski-out access",
      "Mountain-view rooms",
      "Après-ski lounge",
      "Hot springs on site",
      "Shuttle service to city center",
    ],
    roomTypes: [
      {
        id: "standard",
        name: "Standard Room",
        description: "Comfortable room with city view",
        price: 320,
        features: ["City View", "25 sqm", "Queen Bed", "Work Desk"],
      },
      {
        id: "deluxe",
        name: "Deluxe Suite",
        description: "Spacious suite with premium amenities",
        price: 450,
        features: ["Park View", "45 sqm", "King Bed", "Living Area", "Minibar"],
      },
      {
        id: "presidential",
        name: "Presidential Suite",
        description: "Ultimate luxury with panoramic views",
        price: 850,
        features: [
          "Panoramic View",
          "85 sqm",
          "King Bed",
          "Separate Living Room",
          "Butler Service",
        ],
      },
    ],
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
