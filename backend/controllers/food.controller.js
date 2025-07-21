// src/controllers/food.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Food } from "../models/food.model.js";
import sharp from "sharp";
import mongoose from "mongoose";
import axios from "axios";

// --- CREATE ---
const addFood = asyncHandler(async (req, res) => {
    const { title, description, pickupTime, quantity, latitude, longitude, address, price, category, foodType } = req.body;

    if (!title || !description || !pickupTime || !quantity || (!latitude && !longitude && !address)) {
        throw new ApiError(400, "All required fields must be provided, including location");
    }

    // Handle the image upload
    let imageObj = {};
    if (req.file) {
        const resizedImageBuffer = await sharp(req.file.buffer)
            .resize(800, 600, { fit: 'cover', withoutEnlargement: true })
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toBuffer();
        imageObj = {
            image: {
                data: resizedImageBuffer,
                contentType: 'image/jpeg'
            }
        };
    }

    // If latitude/longitude not provided, geocode the address
    let geoLocation = null;
    let resolvedAddress = address;
    if (latitude && longitude) {
        geoLocation = {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
            address: address || ''
        };
    } else if (address) {
        // Use Google Maps Geocoding API to get lat/lng
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
        const geoRes = await axios.get(geoUrl);
        if (geoRes.data.status === 'OK') {
            const loc = geoRes.data.results[0].geometry.location;
            geoLocation = {
                type: 'Point',
                coordinates: [loc.lng, loc.lat],
                address: geoRes.data.results[0].formatted_address
            };
            resolvedAddress = geoRes.data.results[0].formatted_address;
        } else {
            throw new ApiError(400, "Could not geocode address");
        }
    } else {
        throw new ApiError(400, "Location information is required");
    }

    const newFood = await Food.create({
        title, description, pickupTime, quantity,
        location: geoLocation,
        price: price || 0,
        category: category || "other",
        foodType: foodType || "veg",
        user: req.user._id,
        ...imageObj // Add image object to the create call
    });

    return res.status(201).json(new ApiResponse(201, newFood, "Food listing created successfully"));
});
// Find nearby food items for volunteers
const getNearbyFoods = asyncHandler(async (req, res) => {
    const { latitude, longitude, maxDistance = 10000, page = 1, limit = 10 } = req.query;
    if (!latitude || !longitude) {
        throw new ApiError(400, "Latitude and longitude are required");
    }
    const skip = (page - 1) * limit;

    // $geoNear aggregation for distance calculation
    const pipeline = [
        {
            $geoNear: {
                near: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
                distanceField: "distance",
                spherical: true,
                maxDistance: parseInt(maxDistance),
                query: { status: "available" }
            }
        },
        { $sort: { distance: 1 } },
        { $skip: skip },
        { $limit: parseInt(limit) },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        },
        { $unwind: "$user" },
        { $project: { "image.data": 0 } }
    ];

    const foods = await Food.aggregate(pipeline);
    // Count total available for pagination
    const total = await Food.countDocuments({ status: "available" });
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json(new ApiResponse(200, {
        foods,
        pagination: { total, page, limit, totalPages }
    }, "Nearby food listings fetched successfully"));
});

// --- READ ---
const getAllFoods = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, search, category, foodType, location } = req.query;
    const skip = (page - 1) * limit;

    const filter = { status: "available" };

    if (category) filter.category = category;
    if (foodType) filter.foodType = foodType;
    if (location) filter.location = { $regex: location, $options: "i" };
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
        ];
    }

    const [foods, total] = await Promise.all([
        Food.find(filter)
            .populate("user", "username fullname")
            .select("-image.data") // Exclude image buffer for faster loading
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }),
        Food.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json(
        new ApiResponse(200, {
            foods,
            pagination: { total, page, limit, totalPages }
        }, "Available food listings fetched successfully")
    );
});

const getFoodById = asyncHandler(async (req, res) => {
    const { foodId } = req.params;
    const food = await Food.findById(foodId).populate("user", "username fullname phone");

    if (!food) {
        throw new ApiError(404, "Food listing not found");
    }

    return res.status(200).json(new ApiResponse(200, food, "Food details fetched successfully"));
});


const getUserFoods = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const [foods, total] = await Promise.all([
        Food.find({ user: userId })
            .select("-image.data")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }),
        Food.countDocuments({ user: userId })
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json(
        new ApiResponse(200, {
            foods,
            pagination: { total, page, limit, totalPages }
        }, "Your food listings fetched successfully")
    );
});

const getMyClaimedFoods = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const [foods, total] = await Promise.all([
        Food.find({ claimedBy: userId })
            .populate("user", "username fullname phone")
            .select("-image.data")
            .skip(skip)
            .limit(limit)
            .sort({ updatedAt: -1 }),
        Food.countDocuments({ claimedBy: userId })
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json(
        new ApiResponse(200, {
            foods,
            pagination: { total, page, limit, totalPages }
        }, "Your claimed foods fetched successfully")
    );
});

// --- UPDATE ---
const updateFood = asyncHandler(async (req, res) => {
    const { foodId } = req.params;
    const updates = req.body;

    // Find the food listing ensuring it belongs to the logged-in user
    const food = await Food.findOne({ _id: foodId, user: req.user._id });

    if (!food) {
        throw new ApiError(404, "Food listing not found or you're not authorized to edit it.");
    }

    // Update text fields
    Object.keys(updates).forEach(key => {
        if (key !== 'image') { // Don't try to update image this way
            food[key] = updates[key];
        }
    });

    // Handle image update if a new one is provided
    if (req.file) {
        const resizedImageBuffer = await sharp(req.file.buffer)
            .resize(800, 600, { fit: 'cover', withoutEnlargement: true })
            .toFormat('jpeg').jpeg({ quality: 90 }).toBuffer();
        food.image = {
            data: resizedImageBuffer,
            contentType: 'image/jpeg'
        };
    }

    await food.save({ validateBeforeSave: true });

    return res.status(200).json(new ApiResponse(200, food, "Food listing updated successfully"));
});

const claimFood = asyncHandler(async (req, res) => {
    const { foodId } = req.params;
    const food = await Food.findById(foodId);

    if (!food) throw new ApiError(404, "Food not found");
    if (food.status !== "available") throw new ApiError(400, "Food is no longer available");
    if (food.user.toString() === req.user._id.toString()) throw new ApiError(400, "You cannot claim your own food listing");
    
    food.status = "claimed";
    food.claimedBy = req.user._id;
    await food.save();

    return res.status(200).json(new ApiResponse(200, food, "Food claimed successfully"));
});

// --- DELETE ---
const deleteFood = asyncHandler(async (req, res) => {
    const { foodId } = req.params;

    const food = await Food.findOneAndDelete({ _id: foodId, user: req.user._id });

    if (!food) {
        throw new ApiError(404, "Food not found or you're not authorized to delete it");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Food listing deleted successfully"));
});

// --- ANALYTICS ---
const getPlatformStats = asyncHandler(async (req, res) => {
    const mealsRescued = await Food.countDocuments({ status: { $in: ['claimed'] } });
    const activeListings = await Food.countDocuments({ status: 'available' });
    const totalDonors = await Food.distinct('user');

    // Assuming average meal saves 2.5 kg of CO2 emissions
    const co2SavedKg = (mealsRescued * 2.5).toFixed(1);

    const stats = {
        mealsRescued,
        activeListings,
        totalDonors: totalDonors.length,
        co2SavedKg,
    };

    return res.status(200).json(new ApiResponse(200, stats, "Platform statistics fetched successfully"));
});

export {
    addFood,
    getAllFoods,
    getFoodById,
    getUserFoods,
    getMyClaimedFoods,
    updateFood,
    claimFood,
    deleteFood,
    getPlatformStats,
    getNearbyFoods
};