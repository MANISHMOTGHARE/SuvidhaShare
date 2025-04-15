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
            type: String, // Keeping it as a string
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
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

export const Food = mongoose.model("Food", foodSchema);
