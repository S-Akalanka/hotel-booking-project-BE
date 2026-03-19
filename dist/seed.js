"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("./infrastructure/db"));
var Hotel_1 = __importDefault(require("./infrastructure/entities/Hotel"));
var Location_1 = __importDefault(require("./infrastructure/entities/Location"));
var Booking_1 = __importDefault(require("./infrastructure/entities/Booking"));
var User_1 = __importDefault(require("./infrastructure/entities/User"));
var embeddings_1 = require("./application/utils/embeddings");
var hotels = [
    {
        name: "Montmartre Majesty Hotel",
        images: [
            "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
            "https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg",
        ],
        location: "Paris, France",
        rating: 4.7,
        reviews: ["K", "L"],
        price: 160,
        description: "Luxury 5-star hotel in the heart of Manhattan with world-class amenities",
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
                stripePriceId: "price_1SOtTDRzMPnVXe9gxzf4Wg88",
                price: 320,
                features: ["City View", "25 sqm", "Queen Bed", "Work Desk"],
            },
            {
                id: "deluxe",
                name: "Deluxe Suite",
                description: "Spacious suite with premium amenities",
                stripePriceId: "price_1SPJSnRzMPnVXe9gkFsOQcqP",
                price: 450,
                features: ["Park View", "45 sqm", "King Bed", "Living Area", "Minibar"],
            },
            {
                id: "presidential",
                name: "Presidential Suite",
                description: "Ultimate luxury with panoramic views",
                stripePriceId: "price_1SPJToRzMPnVXe9gX1eHYTyZ",
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
        description: "Beachfront luxury resort with stunning ocean views and world-class spa",
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
                stripePriceId: "price_1SPJZsRzMPnVXe9gWiYFFmXv",
                price: 200,
                features: ["City View", "25 sqm", "Queen Bed", "Work Desk"],
            },
            {
                id: "deluxe",
                name: "Deluxe Suite",
                description: "Spacious suite with premium amenities",
                stripePriceId: "price_1SPJZsRzMPnVXe9gQKVONY1x",
                price: 450,
                features: ["Park View", "45 sqm", "King Bed", "Living Area", "Minibar"],
            },
            {
                id: "presidential",
                name: "Presidential Suite",
                description: "Ultimate luxury with panoramic views",
                stripePriceId: "price_1SPJYoRzMPnVXe9ghtzEkwmv",
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
        description: "Cozy mountain retreat perfect for ski enthusiasts and nature lovers",
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
                stripePriceId: "price_1SPJcZRzMPnVXe9gs64hoSah",
                price: 250,
                features: ["City View", "25 sqm", "Queen Bed", "Work Desk"],
            },
            {
                id: "deluxe",
                name: "Deluxe Suite",
                description: "Spacious suite with premium amenities",
                stripePriceId: "price_1SPJfLRzMPnVXe9gLBeZJkEH",
                price: 450,
                features: ["Park View", "45 sqm", "King Bed", "Living Area", "Minibar"],
            },
            {
                id: "presidential",
                name: "Presidential Suite",
                description: "Ultimate luxury with panoramic views",
                stripePriceId: "price_1SPJfLRzMPnVXe9glKumITTO",
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
        name: "Manhattan Grand Plaza",
        images: [
            "https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg",
        ],
        location: "New York, USA",
        rating: 4.8,
        reviews: ["K", "L"],
        price: 280,
        description: "Ultra-modern skyscraper hotel in Times Square with panoramic city views and exclusive rooftop bar",
        amenities: [
            { name: "WiFi", longName: "High-Speed WiFi", icon: "Wifi" },
            { name: "Pool", longName: "Sky Pool", icon: "Waves" },
            { name: "Restaurant", longName: "Rooftop Restaurant", icon: "Utensils" },
            { name: "Gym", longName: "State-of-the-Art Gym", icon: "Dumbbell" },
            { name: "Parking", longName: "Valet Parking", icon: "Car" },
            { name: "Concierge", longName: "Personal Concierge", icon: "Users" },
            { name: "Room Service", longName: "24/7 Room Service", icon: "Coffee" },
            { name: "Bar", longName: "Sky Bar", icon: "Coffee" },
            { name: "Business Center", longName: "Executive Business Center", icon: "Users" },
        ],
        highlights: [
            "Times Square location",
            "360-degree city views",
            "Award-winning rooftop bar",
            "Premium shopping arcade",
            "Executive meeting rooms",
            "Helipad access",
        ],
        roomTypes: [
            {
                id: "standard",
                name: "Standard Room",
                description: "Modern room with city view",
                stripePriceId: "price_1SPK1aRzMPnVXe9gX2fHYTyZ",
                price: 280,
                features: ["City View", "30 sqm", "King Bed", "Smart TV"],
            },
            {
                id: "deluxe",
                name: "Deluxe Suite",
                description: "Spacious suite with skyline views",
                stripePriceId: "price_1SPK2bRzMPnVXe9gY3gIZUaA",
                price: 520,
                features: ["Skyline View", "50 sqm", "King Bed", "Living Area", "Minibar"],
            },
            {
                id: "presidential",
                name: "Presidential Suite",
                description: "Ultimate luxury penthouse with private terrace",
                stripePriceId: "price_1SPK3cRzMPnVXe9gZ4hJYVaB",
                price: 1200,
                features: [
                    "Panoramic View",
                    "120 sqm",
                    "King Bed",
                    "Private Terrace",
                    "Butler Service",
                ],
            },
        ],
    },
    {
        name: "Thames Riverside Hotel",
        images: [
            "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
        ],
        location: "London, UK",
        rating: 4.6,
        reviews: ["K", "L"],
        price: 220,
        description: "Elegant Victorian-era hotel overlooking the River Thames with classic British charm and modern luxury",
        amenities: [
            { name: "WiFi", longName: "Complimentary WiFi", icon: "Wifi" },
            { name: "Spa", longName: "Luxury Spa", icon: "Waves" },
            { name: "Restaurant", longName: "Fine British Dining", icon: "Utensils" },
            { name: "Gym", longName: "Fitness Studio", icon: "Dumbbell" },
            { name: "Parking", longName: "Valet Parking", icon: "Car" },
            { name: "Concierge", longName: "Concierge Service", icon: "Users" },
            { name: "Room Service", longName: "24/7 Room Service", icon: "Coffee" },
            { name: "Bar", longName: "Traditional Pub", icon: "Coffee" },
            { name: "Afternoon Tea", longName: "Afternoon Tea Service", icon: "Coffee" },
        ],
        highlights: [
            "River Thames views",
            "Historic architecture",
            "Traditional afternoon tea",
            "West End theater district",
            "Award-winning restaurant",
            "River cruise access",
        ],
        roomTypes: [
            {
                id: "standard",
                name: "Standard Room",
                description: "Classic room with river view",
                stripePriceId: "price_1SPK4dRzMPnVXe9gA5iKYWbC",
                price: 220,
                features: ["River View", "28 sqm", "Queen Bed", "Work Desk"],
            },
            {
                id: "deluxe",
                name: "Deluxe Suite",
                description: "Elegant suite with Thames views",
                stripePriceId: "price_1SPK5eRzMPnVXe9gB6jLZXcD",
                price: 480,
                features: ["Thames View", "48 sqm", "King Bed", "Sitting Area", "Minibar"],
            },
            {
                id: "presidential",
                name: "Presidential Suite",
                description: "Regal suite with panoramic river views",
                stripePriceId: "price_1SPK6fRzMPnVXe9gC7kMYadE",
                price: 950,
                features: [
                    "Panoramic River View",
                    "90 sqm",
                    "King Bed",
                    "Separate Lounge",
                    "Butler Service",
                ],
            },
        ],
    },
    {
        name: "Burj Al Arab Vista",
        images: [
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        location: "Dubai, UAE",
        rating: 4.9,
        reviews: ["K", "L"],
        price: 450,
        description: "Opulent desert oasis with private beach, world-class dining, and exclusive access to Dubai's attractions",
        amenities: [
            { name: "Beach", longName: "Private Beach", icon: "Waves" },
            { name: "Pool", longName: "Infinity Pool", icon: "Waves" },
            { name: "Spa", longName: "Luxury Arabian Spa", icon: "Waves" },
            { name: "Restaurant", longName: "Michelin-Starred Dining", icon: "Utensils" },
            { name: "Gym", longName: "Premium Fitness Center", icon: "Dumbbell" },
            { name: "WiFi", longName: "High-Speed WiFi", icon: "Wifi" },
            { name: "Concierge", longName: "24/7 Concierge", icon: "Users" },
            { name: "Room Service", longName: "Butler Service", icon: "Coffee" },
            { name: "Helicopter", longName: "Helicopter Tours", icon: "Car" },
            { name: "Shopping", longName: "Luxury Shopping Arcade", icon: "Users" },
        ],
        highlights: [
            "Private beach access",
            "Helicopter transfers",
            "World's tallest hotel",
            "Underwater restaurant",
            "Desert safari tours",
            "Gold-dusted desserts",
        ],
        roomTypes: [
            {
                id: "standard",
                name: "Standard Room",
                description: "Luxurious room with sea view",
                stripePriceId: "price_1SPK7gRzMPnVXe9gD8lNZbeF",
                price: 450,
                features: ["Sea View", "35 sqm", "King Bed", "Marble Bathroom"],
            },
            {
                id: "deluxe",
                name: "Deluxe Suite",
                description: "Palatial suite with panoramic views",
                stripePriceId: "price_1SPK8hRzMPnVXe9gE9mOacfG",
                price: 850,
                features: ["Panoramic View", "70 sqm", "King Bed", "Living Room", "Jacuzzi"],
            },
            {
                id: "presidential",
                name: "Presidential Suite",
                description: "Ultimate luxury with private pool",
                stripePriceId: "price_1SPK9iRzMPnVXe9gF0nPbdgH",
                price: 2500,
                features: [
                    "Private Pool",
                    "150 sqm",
                    "King Bed",
                    "Private Terrace",
                    "Personal Butler",
                ],
            },
        ],
    },
    {
        name: "Gaudí Grand Hotel",
        images: [
            "https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg",
        ],
        location: "Barcelona, Spain",
        rating: 4.5,
        reviews: ["K", "L"],
        price: 180,
        description: "Boutique hotel in the Gothic Quarter with artistic flair, rooftop terrace, and proximity to La Sagrada Familia",
        amenities: [
            { name: "WiFi", longName: "Free WiFi", icon: "Wifi" },
            { name: "Pool", longName: "Rooftop Pool", icon: "Waves" },
            { name: "Restaurant", longName: "Tapas Restaurant", icon: "Utensils" },
            { name: "Gym", longName: "Fitness Center", icon: "Dumbbell" },
            { name: "Parking", longName: "Valet Parking", icon: "Car" },
            { name: "Concierge", longName: "Concierge Service", icon: "Users" },
            { name: "Room Service", longName: "Room Service", icon: "Coffee" },
            { name: "Bar", longName: "Rooftop Bar", icon: "Coffee" },
            { name: "Spa", longName: "Wellness Spa", icon: "Waves" },
        ],
        highlights: [
            "Gothic Quarter location",
            "Rooftop terrace with city views",
            "Art galleries nearby",
            "Walking distance to beaches",
            "Authentic tapas bar",
            "Cultural tours available",
        ],
        roomTypes: [
            {
                id: "standard",
                name: "Standard Room",
                description: "Artistic room with city view",
                stripePriceId: "price_1SPK0jRzMPnVXe9gG1oQcehI",
                price: 180,
                features: ["City View", "25 sqm", "Queen Bed", "Balcony"],
            },
            {
                id: "deluxe",
                name: "Deluxe Suite",
                description: "Spacious suite with sea view",
                stripePriceId: "price_1SPK1kRzMPnVXe9gH2pRdfiJ",
                price: 380,
                features: ["Sea View", "45 sqm", "King Bed", "Living Area", "Terrace"],
            },
            {
                id: "presidential",
                name: "Presidential Suite",
                description: "Luxury suite with panoramic Barcelona views",
                stripePriceId: "price_1SPK2lRzMPnVXe9gI3qSegjK",
                price: 750,
                features: [
                    "Panoramic View",
                    "80 sqm",
                    "King Bed",
                    "Private Terrace",
                    "Butler Service",
                ],
            },
        ],
    },
    {
        name: "Marina Bay Suites",
        images: [
            "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
        ],
        location: "Singapore",
        rating: 4.7,
        reviews: ["K", "L"],
        price: 320,
        description: "Ultra-modern hotel in Marina Bay with infinity pool, world-class shopping, and stunning skyline views",
        amenities: [
            { name: "WiFi", longName: "High-Speed WiFi", icon: "Wifi" },
            { name: "Pool", longName: "Infinity Pool", icon: "Waves" },
            { name: "Spa", longName: "Asian Spa", icon: "Waves" },
            { name: "Restaurant", longName: "Pan-Asian Cuisine", icon: "Utensils" },
            { name: "Gym", longName: "24/7 Fitness Center", icon: "Dumbbell" },
            { name: "Parking", longName: "Valet Parking", icon: "Car" },
            { name: "Concierge", longName: "Concierge Service", icon: "Users" },
            { name: "Room Service", longName: "24/7 Room Service", icon: "Coffee" },
            { name: "Shopping", longName: "Luxury Shopping Mall", icon: "Users" },
            { name: "Casino", longName: "Casino Access", icon: "Coffee" },
        ],
        highlights: [
            "Marina Bay location",
            "Infinity pool on rooftop",
            "Integrated resort complex",
            "World-class shopping",
            "Garden by the Bay access",
            "SkyPark observation deck",
        ],
        roomTypes: [
            {
                id: "standard",
                name: "Standard Room",
                description: "Modern room with bay view",
                stripePriceId: "price_1SPK3mRzMPnVXe9gJ4rTfhjL",
                price: 320,
                features: ["Bay View", "30 sqm", "King Bed", "Smart Controls"],
            },
            {
                id: "deluxe",
                name: "Deluxe Suite",
                description: "Spacious suite with skyline views",
                stripePriceId: "price_1SPK4nRzMPnVXe9gK5sUgiKM",
                price: 580,
                features: ["Skyline View", "55 sqm", "King Bed", "Living Room", "Minibar"],
            },
            {
                id: "presidential",
                name: "Presidential Suite",
                description: "Ultimate luxury with panoramic city views",
                stripePriceId: "price_1SPK5oRzMPnVXe9gL6tVhjLN",
                price: 1100,
                features: [
                    "Panoramic View",
                    "100 sqm",
                    "King Bed",
                    "Private Pool",
                    "Butler Service",
                ],
            },
        ],
    },
    {
        name: "Ubud Paradise Resort",
        images: [
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        location: "Bali, Indonesia",
        rating: 4.6,
        reviews: ["K", "L"],
        price: 150,
        description: "Tropical sanctuary surrounded by rice paddies with traditional Balinese architecture and holistic wellness center",
        amenities: [
            { name: "Pool", longName: "Infinity Pool", icon: "Waves" },
            { name: "Spa", longName: "Balinese Spa", icon: "Waves" },
            { name: "Restaurant", longName: "Organic Restaurant", icon: "Utensils" },
            { name: "Yoga", longName: "Yoga Studio", icon: "Dumbbell" },
            { name: "WiFi", longName: "Free WiFi", icon: "Wifi" },
            { name: "Parking", longName: "Free Parking", icon: "Car" },
            { name: "Concierge", longName: "Concierge Service", icon: "Users" },
            { name: "Room Service", longName: "Room Service", icon: "Coffee" },
            { name: "Beach", longName: "Beach Shuttle", icon: "Waves" },
            { name: "Tours", longName: "Cultural Tours", icon: "Users" },
        ],
        highlights: [
            "Rice paddy views",
            "Traditional Balinese architecture",
            "Holistic wellness programs",
            "Yoga and meditation classes",
            "Organic farm-to-table dining",
            "Temple visits included",
        ],
        roomTypes: [
            {
                id: "standard",
                name: "Standard Room",
                description: "Traditional villa with garden view",
                stripePriceId: "price_1SPK6pRzMPnVXe9gM7uWikLO",
                price: 150,
                features: ["Garden View", "35 sqm", "King Bed", "Outdoor Shower"],
            },
            {
                id: "deluxe",
                name: "Deluxe Suite",
                description: "Luxury villa with pool access",
                stripePriceId: "price_1SPK7qRzMPnVXe9gN8vXjlMP",
                price: 320,
                features: ["Pool View", "60 sqm", "King Bed", "Private Pool", "Terrace"],
            },
            {
                id: "presidential",
                name: "Presidential Suite",
                description: "Ultimate luxury villa with private pool",
                stripePriceId: "price_1SPK8rRzMPnVXe9gO9wYkmNQ",
                price: 650,
                features: [
                    "Panoramic View",
                    "120 sqm",
                    "King Bed",
                    "Private Pool",
                    "Butler Service",
                ],
            },
        ],
    },
    {
        name: "Colosseum Imperial Hotel",
        images: [
            "https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg",
        ],
        location: "Rome, Italy",
        rating: 4.8,
        reviews: ["K", "L"],
        price: 240,
        description: "Historic luxury hotel near the Colosseum with Renaissance architecture, Michelin-starred Italian cuisine, and rooftop terrace",
        amenities: [
            { name: "WiFi", longName: "Free WiFi", icon: "Wifi" },
            { name: "Spa", longName: "Roman Spa", icon: "Waves" },
            { name: "Restaurant", longName: "Michelin-Starred Restaurant", icon: "Utensils" },
            { name: "Gym", longName: "Fitness Center", icon: "Dumbbell" },
            { name: "Parking", longName: "Valet Parking", icon: "Car" },
            { name: "Concierge", longName: "Concierge Service", icon: "Users" },
            { name: "Room Service", longName: "24/7 Room Service", icon: "Coffee" },
            { name: "Bar", longName: "Rooftop Bar", icon: "Coffee" },
            { name: "Tours", longName: "Vatican Tours", icon: "Users" },
        ],
        highlights: [
            "Colosseum views",
            "Historic architecture",
            "Michelin-starred dining",
            "Vatican City proximity",
            "Rooftop terrace",
            "Art collection on display",
        ],
        roomTypes: [
            {
                id: "standard",
                name: "Standard Room",
                description: "Elegant room with city view",
                stripePriceId: "price_1SPK9sRzMPnVXe9gP0xZlnOR",
                price: 240,
                features: ["City View", "28 sqm", "Queen Bed", "Antique Furniture"],
            },
            {
                id: "deluxe",
                name: "Deluxe Suite",
                description: "Luxurious suite with Colosseum views",
                stripePriceId: "price_1SPK0tRzMPnVXe9gQ1yAmoPS",
                price: 520,
                features: ["Colosseum View", "50 sqm", "King Bed", "Living Room", "Balcony"],
            },
            {
                id: "presidential",
                name: "Presidential Suite",
                description: "Palatial suite with panoramic Roman views",
                stripePriceId: "price_1SPK1uRzMPnVXe9gR2zBnpQT",
                price: 980,
                features: [
                    "Panoramic View",
                    "95 sqm",
                    "King Bed",
                    "Separate Dining Room",
                    "Butler Service",
                ],
            },
        ],
    },
    {
        name: "Champs-Élysées Palace",
        images: [
            "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
        ],
        location: "Paris, France",
        rating: 4.9,
        reviews: ["K", "L"],
        price: 290,
        description: "Belle Époque masterpiece on the Champs-Élysées with Eiffel Tower views, Michelin dining, and luxury shopping",
        amenities: [
            { name: "WiFi", longName: "Free WiFi", icon: "Wifi" },
            { name: "Spa", longName: "Parisian Spa", icon: "Waves" },
            { name: "Pool", longName: "Indoor Pool", icon: "Waves" },
            { name: "Restaurant", longName: "Michelin-Starred Restaurant", icon: "Utensils" },
            { name: "Gym", longName: "Fitness Center", icon: "Dumbbell" },
            { name: "Parking", longName: "Valet Parking", icon: "Car" },
            { name: "Concierge", longName: "Concierge Service", icon: "Users" },
            { name: "Room Service", longName: "24/7 Room Service", icon: "Coffee" },
            { name: "Bar", longName: "Rooftop Champagne Bar", icon: "Coffee" },
        ],
        highlights: [
            "Champs-Élysées address",
            "Eiffel Tower views",
            "Michelin-starred cuisine",
            "Designer shopping nearby",
            "Rooftop champagne bar",
            "Art deco architecture",
        ],
        roomTypes: [
            {
                id: "standard",
                name: "Standard Room",
                description: "Elegant room with city view",
                stripePriceId: "price_1SPK2vRzMPnVXe9gS3zCnpQT",
                price: 290,
                features: ["City View", "30 sqm", "King Bed", "Balcony"],
            },
            {
                id: "deluxe",
                name: "Deluxe Suite",
                description: "Luxurious suite with Eiffel Tower views",
                stripePriceId: "price_1SPK3wRzMPnVXe9gT4zDnpQT",
                price: 580,
                features: ["Tower View", "55 sqm", "King Bed", "Living Room", "Terrace"],
            },
            {
                id: "presidential",
                name: "Presidential Suite",
                description: "Opulent suite with panoramic Paris views",
                stripePriceId: "price_1SPK4xRzMPnVXe9gU5zEnpQT",
                price: 1200,
                features: [
                    "Panoramic View",
                    "110 sqm",
                    "King Bed",
                    "Private Terrace",
                    "Butler Service",
                ],
            },
        ],
    },
    {
        name: "Shibuya Sky Hotel",
        images: [
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        location: "Tokyo, Japan",
        rating: 4.7,
        reviews: ["K", "L"],
        price: 270,
        description: "Ultra-modern capsule-meets-luxury hotel in Shibuya with traditional onsen, cutting-edge technology, and city views",
        amenities: [
            { name: "WiFi", longName: "High-Speed WiFi", icon: "Wifi" },
            { name: "Spa", longName: "Traditional Onsen", icon: "Waves" },
            { name: "Restaurant", longName: "Kaiseki Restaurant", icon: "Utensils" },
            { name: "Gym", longName: "Fitness Center", icon: "Dumbbell" },
            { name: "Parking", longName: "Valet Parking", icon: "Car" },
            { name: "Concierge", longName: "Concierge Service", icon: "Users" },
            { name: "Room Service", longName: "24/7 Room Service", icon: "Coffee" },
            { name: "Bar", longName: "Sky Bar", icon: "Coffee" },
            { name: "Robotics", longName: "Robot Concierge", icon: "Users" },
        ],
        highlights: [
            "Shibuya crossing views",
            "Traditional onsen spa",
            "High-tech amenities",
            "Kaiseki dining",
            "Robot concierge service",
            "Sky garden terrace",
        ],
        roomTypes: [
            {
                id: "standard",
                name: "Standard Room",
                description: "Modern room with city view",
                stripePriceId: "price_1SPK5yRzMPnVXe9gV6zFnpQT",
                price: 270,
                features: ["City View", "28 sqm", "Queen Bed", "Smart Controls"],
            },
            {
                id: "deluxe",
                name: "Deluxe Suite",
                description: "Spacious suite with skyline views",
                stripePriceId: "price_1SPK6zRzMPnVXe9gW7zGnpQT",
                price: 520,
                features: ["Skyline View", "50 sqm", "King Bed", "Living Area", "Onsen"],
            },
            {
                id: "presidential",
                name: "Presidential Suite",
                description: "Ultimate luxury with panoramic Tokyo views",
                stripePriceId: "price_1SPK7aRzMPnVXe9gX8zHnpQT",
                price: 1100,
                features: [
                    "Panoramic View",
                    "100 sqm",
                    "King Bed",
                    "Private Onsen",
                    "Butler Service",
                ],
            },
        ],
    },
    {
        name: "Brooklyn Heights Boutique",
        images: [
            "https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg",
        ],
        location: "New York, USA",
        rating: 4.5,
        reviews: ["K", "L"],
        price: 260,
        description: "Trendy boutique hotel in Brooklyn with industrial chic design, rooftop bar, and Manhattan skyline views",
        amenities: [
            { name: "WiFi", longName: "Free WiFi", icon: "Wifi" },
            { name: "Pool", longName: "Rooftop Pool", icon: "Waves" },
            { name: "Restaurant", longName: "Farm-to-Table Restaurant", icon: "Utensils" },
            { name: "Gym", longName: "Fitness Studio", icon: "Dumbbell" },
            { name: "Parking", longName: "Valet Parking", icon: "Car" },
            { name: "Concierge", longName: "Concierge Service", icon: "Users" },
            { name: "Room Service", longName: "Room Service", icon: "Coffee" },
            { name: "Bar", longName: "Rooftop Bar", icon: "Coffee" },
            { name: "Bike Rental", longName: "Bike Rental", icon: "Car" },
        ],
        highlights: [
            "Brooklyn Heights location",
            "Manhattan skyline views",
            "Rooftop pool and bar",
            "Artisanal dining",
            "Industrial design aesthetic",
            "Waterfront promenade access",
        ],
        roomTypes: [
            {
                id: "standard",
                name: "Standard Room",
                description: "Stylish room with city view",
                stripePriceId: "price_1SPK8bRzMPnVXe9gY9zInpQT",
                price: 260,
                features: ["City View", "26 sqm", "Queen Bed", "Exposed Brick"],
            },
            {
                id: "deluxe",
                name: "Deluxe Suite",
                description: "Loft-style suite with skyline views",
                stripePriceId: "price_1SPK9cRzMPnVXe9gZ0zJnpQT",
                price: 480,
                features: ["Skyline View", "52 sqm", "King Bed", "Living Area", "Bar"],
            },
            {
                id: "presidential",
                name: "Presidential Suite",
                description: "Penthouse suite with panoramic views",
                stripePriceId: "price_1SPK0dRzMPnVXe9gA1zKnpQT",
                price: 950,
                features: [
                    "Panoramic View",
                    "105 sqm",
                    "King Bed",
                    "Private Rooftop",
                    "Butler Service",
                ],
            },
        ],
    },
    {
        name: "Notting Hill Gardens",
        images: [
            "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
        ],
        location: "London, UK",
        rating: 4.6,
        reviews: ["K", "L"],
        price: 240,
        description: "Charming Victorian townhouse hotel in Notting Hill with garden views, afternoon tea, and Portobello Road proximity",
        amenities: [
            { name: "WiFi", longName: "Free WiFi", icon: "Wifi" },
            { name: "Spa", longName: "Wellness Spa", icon: "Waves" },
            { name: "Restaurant", longName: "British Bistro", icon: "Utensils" },
            { name: "Gym", longName: "Fitness Room", icon: "Dumbbell" },
            { name: "Parking", longName: "Valet Parking", icon: "Car" },
            { name: "Concierge", longName: "Concierge Service", icon: "Users" },
            { name: "Room Service", longName: "24/7 Room Service", icon: "Coffee" },
            { name: "Garden", longName: "Private Garden", icon: "Coffee" },
            { name: "Afternoon Tea", longName: "Afternoon Tea", icon: "Coffee" },
        ],
        highlights: [
            "Notting Hill location",
            "Private garden access",
            "Portobello Road market",
            "Victorian architecture",
            "Traditional afternoon tea",
            "Colorful street views",
        ],
        roomTypes: [
            {
                id: "standard",
                name: "Standard Room",
                description: "Charming room with garden view",
                stripePriceId: "price_1SPK1eRzMPnVXe9gB2zLnpQT",
                price: 240,
                features: ["Garden View", "24 sqm", "Queen Bed", "Fireplace"],
            },
            {
                id: "deluxe",
                name: "Deluxe Suite",
                description: "Spacious suite with street views",
                stripePriceId: "price_1SPK2fRzMPnVXe9gC3zMnpQT",
                price: 460,
                features: ["Street View", "45 sqm", "King Bed", "Sitting Room", "Balcony"],
            },
            {
                id: "presidential",
                name: "Presidential Suite",
                description: "Luxury suite with garden and city views",
                stripePriceId: "price_1SPK3gRzMPnVXe9gD4zNnpQT",
                price: 880,
                features: [
                    "Panoramic View",
                    "85 sqm",
                    "King Bed",
                    "Private Garden Access",
                    "Butler Service",
                ],
            },
        ],
    },
    {
        name: "Palm Jumeirah Resort",
        images: [
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        location: "Dubai, UAE",
        rating: 4.8,
        reviews: ["K", "L"],
        price: 380,
        description: "Exclusive resort on Palm Jumeirah with private beach, water sports, and world-class dining overlooking the Arabian Gulf",
        amenities: [
            { name: "Beach", longName: "Private Beach", icon: "Waves" },
            { name: "Pool", longName: "Multiple Pools", icon: "Waves" },
            { name: "Spa", longName: "Luxury Spa", icon: "Waves" },
            { name: "Restaurant", longName: "Beachside Dining", icon: "Utensils" },
            { name: "Gym", longName: "Fitness Center", icon: "Dumbbell" },
            { name: "WiFi", longName: "Free WiFi", icon: "Wifi" },
            { name: "Concierge", longName: "Concierge Service", icon: "Users" },
            { name: "Room Service", longName: "24/7 Room Service", icon: "Coffee" },
            { name: "Water Sports", longName: "Water Sports", icon: "Waves" },
            { name: "Kids Club", longName: "Kids Club", icon: "Users" },
        ],
        highlights: [
            "Palm Jumeirah location",
            "Private beach access",
            "Water sports activities",
            "Marina views",
            "World-class dining",
            "Aqua park access",
        ],
        roomTypes: [
            {
                id: "standard",
                name: "Standard Room",
                description: "Comfortable room with sea view",
                stripePriceId: "price_1SPK4hRzMPnVXe9gE5zOnpQT",
                price: 380,
                features: ["Sea View", "32 sqm", "King Bed", "Balcony"],
            },
            {
                id: "deluxe",
                name: "Deluxe Suite",
                description: "Luxurious suite with beach access",
                stripePriceId: "price_1SPK5iRzMPnVXe9gF6zPnpQT",
                price: 720,
                features: ["Beach View", "65 sqm", "King Bed", "Living Room", "Terrace"],
            },
            {
                id: "presidential",
                name: "Presidential Suite",
                description: "Ultimate luxury with private beach villa",
                stripePriceId: "price_1SPK6jRzMPnVXe9gG7zQnpQT",
                price: 1800,
                features: [
                    "Private Beach",
                    "140 sqm",
                    "King Bed",
                    "Private Pool",
                    "Butler Service",
                ],
            },
        ],
    },
    {
        name: "Amsterdam Canal House",
        images: [
            "https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg",
        ],
        location: "Amsterdam, Netherlands",
        rating: 4.7,
        reviews: ["K", "L"],
        price: 200,
        description: "Historic 17th-century canal house converted into a luxury hotel with canal views, bike rentals, and Dutch design",
        amenities: [
            { name: "WiFi", longName: "Free WiFi", icon: "Wifi" },
            { name: "Spa", longName: "Wellness Center", icon: "Waves" },
            { name: "Restaurant", longName: "Dutch Cuisine", icon: "Utensils" },
            { name: "Gym", longName: "Fitness Center", icon: "Dumbbell" },
            { name: "Parking", longName: "Valet Parking", icon: "Car" },
            { name: "Concierge", longName: "Concierge Service", icon: "Users" },
            { name: "Room Service", longName: "Room Service", icon: "Coffee" },
            { name: "Bike Rental", longName: "Bike Rental", icon: "Car" },
            { name: "Boat Tours", longName: "Canal Boat Tours", icon: "Waves" },
        ],
        highlights: [
            "Canal-side location",
            "Historic architecture",
            "Canal boat tours",
            "Museum district proximity",
            "Bike rental included",
            "Dutch design aesthetic",
        ],
        roomTypes: [
            {
                id: "standard",
                name: "Standard Room",
                description: "Charming room with canal view",
                stripePriceId: "price_1SPK7kRzMPnVXe9gH8zRnpQT",
                price: 200,
                features: ["Canal View", "22 sqm", "Queen Bed", "Historic Features"],
            },
            {
                id: "deluxe",
                name: "Deluxe Suite",
                description: "Spacious suite with canal views",
                stripePriceId: "price_1SPK8lRzMPnVXe9gI9zSnpQT",
                price: 420,
                features: ["Canal View", "48 sqm", "King Bed", "Living Area", "Balcony"],
            },
            {
                id: "presidential",
                name: "Presidential Suite",
                description: "Luxury suite with panoramic canal views",
                stripePriceId: "price_1SPK9mRzMPnVXe9gJ0zTnpQT",
                price: 820,
                features: [
                    "Panoramic Canal View",
                    "90 sqm",
                    "King Bed",
                    "Private Terrace",
                    "Butler Service",
                ],
            },
        ],
    },
    {
        name: "Santorini Sunset Resort",
        images: [
            "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
        ],
        location: "Santorini, Greece",
        rating: 4.9,
        reviews: ["K", "L"],
        price: 310,
        description: "Stunning cliffside resort in Oia with infinity pools, caldera views, and world-famous sunset vistas over the Aegean Sea",
        amenities: [
            { name: "Pool", longName: "Infinity Pool", icon: "Waves" },
            { name: "Spa", longName: "Aegean Spa", icon: "Waves" },
            { name: "Restaurant", longName: "Mediterranean Restaurant", icon: "Utensils" },
            { name: "Gym", longName: "Fitness Center", icon: "Dumbbell" },
            { name: "WiFi", longName: "Free WiFi", icon: "Wifi" },
            { name: "Parking", longName: "Valet Parking", icon: "Car" },
            { name: "Concierge", longName: "Concierge Service", icon: "Users" },
            { name: "Room Service", longName: "24/7 Room Service", icon: "Coffee" },
            { name: "Bar", longName: "Sunset Bar", icon: "Coffee" },
            { name: "Beach Access", longName: "Beach Access", icon: "Waves" },
        ],
        highlights: [
            "Oia cliffside location",
            "World-famous sunsets",
            "Caldera views",
            "Infinity pools",
            "Wine tours included",
            "Traditional architecture",
        ],
        roomTypes: [
            {
                id: "standard",
                name: "Standard Room",
                description: "Cave-style room with caldera view",
                stripePriceId: "price_1SPK0nRzMPnVXe9gK1zUnpQT",
                price: 310,
                features: ["Caldera View", "30 sqm", "Queen Bed", "Private Terrace"],
            },
            {
                id: "deluxe",
                name: "Deluxe Suite",
                description: "Luxury cave suite with pool access",
                stripePriceId: "price_1SPK1oRzMPnVXe9gL2zVnpQT",
                price: 580,
                features: ["Caldera View", "60 sqm", "King Bed", "Private Pool", "Terrace"],
            },
            {
                id: "presidential",
                name: "Presidential Suite",
                description: "Ultimate luxury with private infinity pool",
                stripePriceId: "price_1SPK2pRzMPnVXe9gM3zWnpQT",
                price: 1200,
                features: [
                    "Panoramic View",
                    "110 sqm",
                    "King Bed",
                    "Private Infinity Pool",
                    "Butler Service",
                ],
            },
        ],
    },
    {
        name: "Istanbul Bosphorus Palace",
        images: [
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        location: "Istanbul, Turkey",
        rating: 4.6,
        reviews: ["K", "L"],
        price: 230,
        description: "Opulent Ottoman-era palace on the Bosphorus with hammam spa, Turkish cuisine, and stunning views connecting Europe and Asia",
        amenities: [
            { name: "WiFi", longName: "Free WiFi", icon: "Wifi" },
            { name: "Spa", longName: "Traditional Hammam", icon: "Waves" },
            { name: "Pool", longName: "Indoor Pool", icon: "Waves" },
            { name: "Restaurant", longName: "Turkish Fine Dining", icon: "Utensils" },
            { name: "Gym", longName: "Fitness Center", icon: "Dumbbell" },
            { name: "Parking", longName: "Valet Parking", icon: "Car" },
            { name: "Concierge", longName: "Concierge Service", icon: "Users" },
            { name: "Room Service", longName: "24/7 Room Service", icon: "Coffee" },
            { name: "Bar", longName: "Rooftop Bar", icon: "Coffee" },
            { name: "Boat Tours", longName: "Bosphorus Cruises", icon: "Waves" },
        ],
        highlights: [
            "Bosphorus waterfront",
            "Ottoman architecture",
            "Traditional hammam",
            "Hagia Sophia proximity",
            "Bosphorus cruises",
            "Turkish cultural tours",
        ],
        roomTypes: [
            {
                id: "standard",
                name: "Standard Room",
                description: "Elegant room with Bosphorus view",
                stripePriceId: "price_1SPK3qRzMPnVXe9gN4zXnpQT",
                price: 230,
                features: ["Bosphorus View", "28 sqm", "Queen Bed", "Ottoman Design"],
            },
            {
                id: "deluxe",
                name: "Deluxe Suite",
                description: "Luxurious suite with panoramic views",
                stripePriceId: "price_1SPK4rRzMPnVXe9gO5zYnpQT",
                price: 480,
                features: ["Panoramic View", "55 sqm", "King Bed", "Living Room", "Balcony"],
            },
            {
                id: "presidential",
                name: "Presidential Suite",
                description: "Palatial suite with Bosphorus and city views",
                stripePriceId: "price_1SPK5sRzMPnVXe9gP6zZnpQT",
                price: 950,
                features: [
                    "Panoramic View",
                    "100 sqm",
                    "King Bed",
                    "Private Terrace",
                    "Butler Service",
                ],
            },
        ],
    },
    {
        name: "Vienna Opera House Hotel",
        images: [
            "https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg",
        ],
        location: "Vienna, Austria",
        rating: 4.8,
        reviews: ["K", "L"],
        price: 250,
        description: "Grand Imperial hotel across from the Vienna State Opera with classical music theme, ballroom, and Viennese café",
        amenities: [
            { name: "WiFi", longName: "Free WiFi", icon: "Wifi" },
            { name: "Spa", longName: "Vienna Spa", icon: "Waves" },
            { name: "Restaurant", longName: "Viennese Cuisine", icon: "Utensils" },
            { name: "Gym", longName: "Fitness Center", icon: "Dumbbell" },
            { name: "Parking", longName: "Valet Parking", icon: "Car" },
            { name: "Concierge", longName: "Concierge Service", icon: "Users" },
            { name: "Room Service", longName: "24/7 Room Service", icon: "Coffee" },
            { name: "Bar", longName: "Opera Bar", icon: "Coffee" },
            { name: "Café", longName: "Traditional Viennese Café", icon: "Coffee" },
        ],
        highlights: [
            "Opera House views",
            "Imperial architecture",
            "Classical music concerts",
            "Traditional Viennese café",
            "Ringstrasse location",
            "Museum quarter access",
        ],
        roomTypes: [
            {
                id: "standard",
                name: "Standard Room",
                description: "Elegant room with opera house view",
                stripePriceId: "price_1SPK6tRzMPnVXe9gQ7zanpQT",
                price: 250,
                features: ["Opera View", "26 sqm", "Queen Bed", "Classical Design"],
            },
            {
                id: "deluxe",
                name: "Deluxe Suite",
                description: "Luxurious suite with city views",
                stripePriceId: "price_1SPK7uRzMPnVXe9gR8zbnpQT",
                price: 500,
                features: ["City View", "50 sqm", "King Bed", "Living Room", "Balcony"],
            },
            {
                id: "presidential",
                name: "Presidential Suite",
                description: "Opulent suite with panoramic Vienna views",
                stripePriceId: "price_1SPK8vRzMPnVXe9gS9zcnpQT",
                price: 980,
                features: [
                    "Panoramic View",
                    "95 sqm",
                    "King Bed",
                    "Private Balcony",
                    "Butler Service",
                ],
            },
        ],
    },
    {
        name: "Marrakech Riad Oasis",
        images: [
            "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
        ],
        location: "Marrakech, Morocco",
        rating: 4.7,
        reviews: ["K", "L"],
        price: 170,
        description: "Authentic riad in the medina with central courtyard, traditional Moroccan design, and rooftop terrace with Atlas Mountain views",
        amenities: [
            { name: "WiFi", longName: "Free WiFi", icon: "Wifi" },
            { name: "Spa", longName: "Moroccan Hammam", icon: "Waves" },
            { name: "Pool", longName: "Courtyard Pool", icon: "Waves" },
            { name: "Restaurant", longName: "Moroccan Cuisine", icon: "Utensils" },
            { name: "Gym", longName: "Fitness Room", icon: "Dumbbell" },
            { name: "Parking", longName: "Valet Parking", icon: "Car" },
            { name: "Concierge", longName: "Concierge Service", icon: "Users" },
            { name: "Room Service", longName: "Room Service", icon: "Coffee" },
            { name: "Tours", longName: "Desert Tours", icon: "Users" },
            { name: "Rooftop", longName: "Rooftop Terrace", icon: "Coffee" },
        ],
        highlights: [
            "Medina location",
            "Traditional riad architecture",
            "Central courtyard",
            "Atlas Mountain views",
            "Desert safari tours",
            "Souks nearby",
        ],
        roomTypes: [
            {
                id: "standard",
                name: "Standard Room",
                description: "Traditional room with courtyard view",
                stripePriceId: "price_1SPK9wRzMPnVXe9gT0zdnpQT",
                price: 170,
                features: ["Courtyard View", "24 sqm", "Queen Bed", "Moroccan Design"],
            },
            {
                id: "deluxe",
                name: "Deluxe Suite",
                description: "Luxurious suite with rooftop access",
                stripePriceId: "price_1SPK0xRzMPnVXe9gU1zenpQT",
                price: 340,
                features: ["Rooftop View", "48 sqm", "King Bed", "Living Area", "Terrace"],
            },
            {
                id: "presidential",
                name: "Presidential Suite",
                description: "Ultimate luxury with private terrace",
                stripePriceId: "price_1SPK1yRzMPnVXe9gV2zfnpQT",
                price: 680,
                features: [
                    "Panoramic View",
                    "85 sqm",
                    "King Bed",
                    "Private Rooftop Terrace",
                    "Butler Service",
                ],
            },
        ],
    },
];
var locations = [
    { name: "Paris", country: "France", hotels: 245 },
    { name: "Tokyo", country: "Japan", hotels: 189 },
    { name: "New York", country: "USA", hotels: 312 },
    { name: "London", country: "UK", hotels: 198 },
    { name: "Dubai", country: "UAE", hotels: 156 },
    { name: "Barcelona", country: "Spain", hotels: 203 },
    { name: "Singapore", country: "Singapore", hotels: 178 },
    { name: "Bali", country: "Indonesia", hotels: 142 },
    { name: "Rome", country: "Italy", hotels: 267 },
    { name: "Amsterdam", country: "Netherlands", hotels: 165 },
    { name: "Santorini", country: "Greece", hotels: 98 },
    { name: "Istanbul", country: "Turkey", hotels: 201 },
    { name: "Vienna", country: "Austria", hotels: 176 },
    { name: "Marrakech", country: "Morocco", hotels: 134 },
];
var seedDataBase = function () { return __awaiter(void 0, void 0, void 0, function () {
    var hotelsWithEmbeddings, toBeCreatedHotels, createdHotels, createdLocations, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 9, , 10]);
                return [4 /*yield*/, (0, db_1.default)()];
            case 1:
                _a.sent();
                return [4 /*yield*/, Hotel_1.default.deleteMany({})];
            case 2:
                _a.sent();
                return [4 /*yield*/, Location_1.default.deleteMany({})];
            case 3:
                _a.sent();
                return [4 /*yield*/, User_1.default.deleteMany({})];
            case 4:
                _a.sent();
                return [4 /*yield*/, Booking_1.default.deleteMany({})];
            case 5:
                _a.sent();
                console.log("Cleared existing data");
                hotelsWithEmbeddings = hotels.map(function (hotel) { return __awaiter(void 0, void 0, void 0, function () {
                    var embedding;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log("Generating embedding for ".concat(hotel.name));
                                return [4 /*yield*/, (0, embeddings_1.generateEmbedding)("".concat(hotel.name, " ").concat(hotel.description, " ").concat(hotel.location, " ").concat(hotel.price))];
                            case 1:
                                embedding = _a.sent();
                                return [2 /*return*/, __assign(__assign({}, hotel), { embedding: embedding })];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(hotelsWithEmbeddings)];
            case 6:
                toBeCreatedHotels = _a.sent();
                return [4 /*yield*/, Hotel_1.default.insertMany(toBeCreatedHotels)];
            case 7:
                createdHotels = _a.sent();
                console.log("Created ".concat(createdHotels.length, " hotels"));
                return [4 /*yield*/, Location_1.default.insertMany(locations)];
            case 8:
                createdLocations = _a.sent();
                console.log("Created ".concat(createdLocations.length, " locations"));
                console.log("Database seeded successfully!");
                // Display summary
                console.log("\n=== SEED SUMMARY ===");
                console.log("Hotels: ".concat(createdHotels.length));
                console.log("Locations: ".concat(createdLocations.length));
                // console.log(`Users: ${createdUsers.length}`);
                // console.log(`Reviews: ${createdReviews.length}`);
                process.exit(0);
                return [3 /*break*/, 10];
            case 9:
                error_1 = _a.sent();
                console.error("Error seeding database:", error_1);
                process.exit(1);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
seedDataBase();
//# sourceMappingURL=seed.js.map