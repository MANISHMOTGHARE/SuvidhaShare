// src/routes/admin.routes.js
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import {
    getAdminDashboardStats,
    getAllUsers,
    getAllListings
} from "../controllers/admin.controller.js";
import { deleteFood } from "../controllers/food.controller.js"; // Reuse food controller for deletion
import { deleteUserAccount } from "../controllers/user.controller.js"; // Reuse user controller for deletion

const router = Router();

// Apply JWT and Admin verification to all routes in this file
router.use(verifyJWT, verifyAdmin);

// --- Admin Dashboard Routes ---
router.route("/stats").get(getAdminDashboardStats);

// --- User Management Routes ---
router.route("/users").get(getAllUsers);
// Note: You could add routes here to update user roles or delete users
// For example: router.route("/users/:userId").delete(deleteUserAccount);

// --- Food Listing Management Routes ---
router.route("/listings").get(getAllListings);
// Admin can delete any food listing
router.route("/listings/:foodId").delete(deleteFood);


export default router;