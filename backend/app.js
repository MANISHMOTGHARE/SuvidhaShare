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
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({  extended: true }));
app.use(express.static("./public"));
app.use(cookieParser());

// routes import
// import dashboardRouter from "./routes/dashboard.routes.js"
import userRouter from "./routes/user.routes.js";

// routes handling
// app.use("/api/v1/dashboard", dashboardRouter)
app.use("/api/v1/user", userRouter);

export { app };
