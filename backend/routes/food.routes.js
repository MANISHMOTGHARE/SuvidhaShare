import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addFood, getUserFoods } from "../controllers/food.controller.js";

const router = Router();

// POST /api/v1/food/add - Add a new food donation
router.route("/add").post(verifyJWT, addFood);

// GET /api/v1/food/my-foods?page=1&limit=10 - Get paginated foods added by user
router.route("/my-foods").get(verifyJWT, getUserFoods);

export default router;
