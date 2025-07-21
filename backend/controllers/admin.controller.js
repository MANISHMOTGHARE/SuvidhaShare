// src/controllers/admin.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Food } from "../models/food.model.js";
import { User } from "../models/user.model.js";

// --- Dashboard Statistics (Admin Only) ---
const getAdminDashboardStats = asyncHandler(async (req, res) => {
    const totalUsers = await User.countDocuments();
    const totalListings = await Food.countDocuments();
    const mealsRescued = await Food.countDocuments({ status: 'claimed' });
    const activeListings = await Food.countDocuments({ status: 'available' });

    // Assuming average meal saves 2.5 kg of CO2 emissions
    const co2SavedKg = (mealsRescued * 2.5).toFixed(1);

    const stats = {
        totalUsers,
        totalListings,
        mealsRescued,
        activeListings,
        co2SavedKg,
    };

    return res.status(200).json(new ApiResponse(200, stats, "Admin dashboard statistics fetched successfully"));
});

// --- User Management ---
const getAllUsers = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const users = await User.find({})
        .select("-password -refreshToken -avatar.data")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    return res.status(200).json(new ApiResponse(200, {
        users,
        pagination: { total: totalUsers, page, limit, totalPages }
    }, "All users fetched successfully"));
});

// --- Listing Management ---
const getAllListings = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    let filter = {};
    if (status) {
        filter.status = status;
    }

    const listings = await Food.find(filter)
        .populate("user", "username fullname")
        .populate("claimedBy", "username fullname")
        .select("-image.data")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    const totalListings = await Food.countDocuments(filter);
    const totalPages = Math.ceil(totalListings / limit);

    return res.status(200).json(new ApiResponse(200, {
        listings,
        pagination: { total: totalListings, page, limit, totalPages }
    }, "All food listings fetched successfully"));
});


export {
    getAdminDashboardStats,
    getAllUsers,
    getAllListings
};