// src/middlewares/admin.middleware.js
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyAdmin = asyncHandler(async (req, _, next) => {
    // This middleware should run AFTER verifyJWT, so req.user will exist.
    if (!req.user) {
        throw new ApiError(401, "You must be logged in to perform this action.");
    }
    
    if (req.user.role !== 'admin') {
        throw new ApiError(403, "Forbidden. This action is restricted to administrators only.");
    }
    
    next();
});