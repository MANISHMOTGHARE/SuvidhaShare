// src/routes/food.routes.js
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
    addFood,
    getAllFoods,
    getFoodById,
    getUserFoods,
    getMyClaimedFoods,
    updateFood,
    claimFood,
    deleteFood,
    getPlatformStats
} from "../controllers/food.controller.js";

const router = Router();

// --- PUBLIC ROUTES ---
// Get all available food listings (with filtering)
router.route("/all").get(getAllFoods);
// Get platform-wide statistics
router.route("/stats").get(getPlatformStats);

// --- SECURED ROUTES (require login) ---
router.use(verifyJWT); // Apply verifyJWT middleware to all routes below this line

// CRUD for Food Listings
router.route("/add").post(upload.single("foodImage"), addFood);
router.route("/my-foods").get(getUserFoods); // Get listings created by the logged-in user

// Dashboard route for individuals/volunteers to see what they've claimed
router.route("/my-claims").get(getMyClaimedFoods);

// Routes with a specific foodId
// IMPORTANT: These must be last to avoid conflicts with routes like /stats or /my-claims
router.route("/:foodId")
    .get(getFoodById) // Get details of a single food item
    .patch(upload.single("foodImage"), updateFood) // Update your own food listing
    .delete(deleteFood); // Delete your own food listing

// Action route
router.route("/claim/:foodId").patch(claimFood); // Claim a food item

export default router;