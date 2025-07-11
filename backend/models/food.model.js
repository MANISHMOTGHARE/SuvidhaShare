import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        }, 
        description: {
            type: String,
            required: true,
            trim: true
        },
        pickupTime: {
            type: String,
            required: true,
            trim: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        location: {
            type: String,
            required: true,
            trim: true
        },
        // NEW FIELDS:
        price: {
            type: Number,
            default: 0  // 0 means free
        },
        category: {
            type: String,
            enum: ["meal", "grocery", "bakery", "other"],
            default: "other"
        },
        status: {
            type: String,
            enum: ["available", "claimed", "expired"],
            default: "available"
        },
        claimedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        foodType: {
            type: String,
            enum: ["veg", "non-veg", "vegan"],
            default: "veg"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

export const Food = mongoose.model("Food", foodSchema);