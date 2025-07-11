import { asyncHandler  } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler( async (req, res, next) => {
    try {
        // Also check Authorization header (useful for mobile apps/Postman)
        const token = req.cookies?.accessToken || 
                     req.header("Authorization")?.replace("Bearer ", "");
    
        if(!token){
            throw new ApiError(401, "Unauthorized request. Please login");
        }
    
        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken -avatar.data");
    
        if(!user){
            throw new ApiError(401, "Invalid Access Token.");
        }
    
        req.user = user;
        next();
    }
    catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token.");
    }
})