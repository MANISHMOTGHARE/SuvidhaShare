// src/controllers/food.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Food } from "../models/food.model.js";
import sharp from "sharp";
import mongoose from "mongoose";

// --- CREATE ---
const addFood = asyncHandler(async (req, res) => {
    const { title, description, pickupTime, quantity, location, price, category, foodType } = req.body;

    if (!title || !description || !pickupTime || !quantity || !location) {
        throw new ApiError(400, "All required fields must be provided");
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

    const newFood = await Food.create({
        title, description, pickupTime, quantity, location,
        price: price || 0,
        category: category || "other",
        foodType: foodType || "veg",
        user: req.user._id,
        ...imageObj // Add image object to the create call
    });

    return res.status(201).json(new ApiResponse(201, newFood, "Food listing created successfully"));
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
    getPlatformStats
};