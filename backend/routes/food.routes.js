import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    addFood, 
    getUserFoods, 
    getAllFoods, 
    claimFood, 
    deleteFood 
} from "../controllers/food.controller.js";

const router = Router();

// POST /api/v1/food/add - Add a new food donation
router.route("/add").post(verifyJWT, addFood);

// GET /api/v1/food/my-foods?page=1&limit=10 - Get paginated foods added by user
router.route("/my-foods").get(verifyJWT, getUserFoods);

// GET /api/v1/food/all?page=1&limit=10 - Get all available foods (PUBLIC - no auth needed!)
router.route("/all").get(getAllFoods);

// PATCH /api/v1/food/claim/:foodId - Claim a food item
router.route("/claim/:foodId").patch(verifyJWT, claimFood);

// DELETE /api/v1/food/:foodId - Delete a food item
router.route("/:foodId").delete(verifyJWT, deleteFood);

export default router;