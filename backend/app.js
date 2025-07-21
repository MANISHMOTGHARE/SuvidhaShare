// src/app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // Added a fallback
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(cookieParser());

// --- Routes Import ---
import userRouter from "./routes/user.routes.js";
import foodRouter from "./routes/food.routes.js";
import adminRouter from "./routes/admin.routes.js"; // <<< IMPORT THE NEW ADMIN ROUTER

// --- Routes Handling ---
app.use("/api/v1/users", userRouter); // Your original user route had /user, I'm suggesting /users for consistency
app.use("/api/v1/food", foodRouter);
app.use("/api/v1/admin", adminRouter); // <<< USE THE NEW ADMIN ROUTER

export { app };