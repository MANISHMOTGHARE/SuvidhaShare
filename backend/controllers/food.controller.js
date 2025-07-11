// food.controller.js - Complete version
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Food } from "../models/food.model.js";

// Add Food donation (UPDATE THIS)
const addFood = asyncHandler(async (req, res) => {
    const { title, description, pickupTime, quantity, location, price, category, foodType } = req.body;

    if (!title || !description || !pickupTime || !quantity || !location) {
        throw new ApiError(400, "All fields are required");
    }

    const newFood = await Food.create({
        title,
        description,
        pickupTime,
        quantity,
        location,
        price: price || 0,  // 0 means free
        category: category || "other",
        foodType: foodType || "veg",
        user: req.user._id
    });

    return res
        .status(201)
        .json(new ApiResponse(201, newFood, "Food added successfully"));
});

// Get all available foods (for browsing) - NEW
const getAllFoods = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [foods, total] = await Promise.all([
        Food.find({ status: "available" })
            .populate("user", "username fullname phone")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }),
        Food.countDocuments({ status: "available" })
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json(
        new ApiResponse(200, {
            foods,
            pagination: { total, page, limit, totalPages }
        }, "Foods fetched successfully")
    );
});

// Get paginated foods by logged-in user (KEEP AS IS)
const getUserFoods = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [foods, total] = await Promise.all([
        Food.find({ user: userId })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }),
        Food.countDocuments({ user: userId })
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json(
        new ApiResponse(200, {
            foods,
            pagination: {
                total,
                page,
                limit,
                totalPages
            }
        }, "Foods for user fetched successfully")
    );
});

// Claim food - NEW
const claimFood = asyncHandler(async (req, res) => {
    const { foodId } = req.params;
    
    const food = await Food.findById(foodId);
    
    if (!food) {
        throw new ApiError(404, "Food not found");
    }
    
    if (food.status !== "available") {
        throw new ApiError(400, "Food already claimed");
    }
    
    if (food.user.toString() === req.user._id.toString()) {
        throw new ApiError(400, "You cannot claim your own food");
    }
    
    food.status = "claimed";
    food.claimedBy = req.user._id;
    await food.save();
    
    return res.status(200).json(
        new ApiResponse(200, food, "Food claimed successfully")
    );
});

// Delete food - NEW
const deleteFood = asyncHandler(async (req, res) => {
    const { foodId } = req.params;
    
    const food = await Food.findOneAndDelete({
        _id: foodId,
        user: req.user._id
    });
    
    if (!food) {
        throw new ApiError(404, "Food not found or unauthorized");
    }
    
    return res.status(200).json(
        new ApiResponse(200, {}, "Food deleted successfully")
    );
});

export { addFood, getAllFoods, getUserFoods, claimFood, deleteFood };