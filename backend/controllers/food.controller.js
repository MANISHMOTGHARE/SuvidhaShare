import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Food } from "../models/food.model.js";

// Add Food donation
const addFood = asyncHandler(async (req, res) => {
    const { title, description, pickupTime, quantity, location } = req.body;

    if (!title || !description || !pickupTime || !quantity || !location) {
        throw new ApiError(400, "All fields are required");
    }

    const newFood = await Food.create({
        title,
        description,
        pickupTime,
        quantity,
        location,
        user: req.user._id
    });

    return res
        .status(201)
        .json(new ApiResponse(201, newFood, "Food added successfully"));
});

// Get paginated foods by logged-in user
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

export { addFood, getUserFoods };
