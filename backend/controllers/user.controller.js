import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import sharp from "sharp";

// Register a new user
const signupUser = asyncHandler(async (req, res) => {
    const { username, email, password, fullName, role } = req.body;
    const fullname = fullName;

    // check if any of the fields are empty
    if (
        !username || username?.trim === "" ||
        !email || email?.trim === "" ||
        !password || password?.trim === "" ||
        !fullname || fullname?.trim === "" ||
        !role || role?.trim === ""
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // check if email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new ApiError(409, "User with similar email already exists");
    }
    // check if username already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
        throw new ApiError(409, "User with similar username already exists");
    }

    // check if password is valid
    if (password.length < 8) {
        throw new ApiError(400, "Password must be at least 8 characters long");
    }

    // create new user
    const user = await User.create({
        email,
        password,
        fullname,
        username: username.toLowerCase(),
        role : role?.toLowerCase()
    });

    // check if user is created and remove password and refreshToken from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -avatar.data"
    );

    if (!createdUser) {
        throw new ApiError(
            500,
            "Something went wrong while creating the user. Please try again."
        );
    }

    // return response
    return res
        .status(201)
        .json(new ApiResponse(201, createdUser, "User created successfully"));
});

// upload avatar image
const updateAvatarImage = asyncHandler(async (req, res) => {

    if (!req.file) {
        throw new ApiError(400, "No file uploaded");
    }

    // Using sharp to resize and compress the image
    const resizedImageBuffer = await sharp(req.file.buffer)
        .resize(300, 300, {
            fit: sharp.fit.inside,
            withoutEnlargement: true,
        })
        .toFormat("jpeg")
        .jpeg({ quality: 80 })
        .toBuffer();

    // Update the user document with the processed image
    const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
        avatar: {
            data: resizedImageBuffer,
            contentType: "image/jpeg",
        },
    },
        { new: true }
    ).select("-password -refreshToken -avatar.data");

    if (!user) {
        throw new ApiError(500, "Something went wrong while uploading image. Please try again later.");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Avatar image updated successfully"));
})

const getAvatarImage = asyncHandler(async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({username}).select("avatar");
        if (user && user.avatar && user.avatar.data) {
          res.set("Content-Type", user.avatar.contentType || "image/jpeg");
          return res
                .status(200)
                .json(new ApiResponse(200, user.avatar.data, "Avatar image fetched successfully"));
        }
        return res.status(404).json({ error: "Avatar image not found." });
      } catch (error) {
        return res.status(500).json({ error: "Error fetching avatar image." });
      }
})

// generate access token and refresh token
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating tokens. Please try again."
        );
    }
};

// cookie options
const options = {
  httpOnly: true,
  secure: true
};

// Login a user
const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if (!username && !email) {
        throw new ApiError(400, "Username or email is required");
    }
    if (!password) {
        throw new ApiError(400, "Password is required");
    }

    const user = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
    );

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken -avatar.data"
    );

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser },
                "User logged in successfully"
            )
        );
});

// Logout a user
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: { refreshToken: 1 }, // remove refreshToken from user document
        },
        { new: true }
    );

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// Refresh access token
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request. Please login");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid Refresh Token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(
                401,
                "Refresh Token expired. Please login again"
            );
        }

        const { accessToken, newRefreshToken } =
            await generateAccessAndRefreshToken(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {},
                    "New Refresh Token generated successfully"
                )
            );
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Refresh Token");
    }
});

// change user password
const changeUserPassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);

    const isPasswordValid = await user.isPasswordCorrect(currentPassword);

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid current password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"));
});

// get current user
const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(200, req.user, "Current user fetched successfully")
        );
});

// get another user
const getUser = asyncHandler(async (req, res) => {
    const username = req.params.username;
    const user = await User.findOne({ username }).select(
        "-password -refreshToken -avatar.data"
    );

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user, "User fetched successfully"));
})

// update user details
const updateUserDetails = asyncHandler(async (req, res) => {
    const { fullname, username, email } = req.body;

    if (!username && !email) {
        throw new ApiError(400, "Username or email is required");
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { fullname, username }, // only these fields are allowed to be updated
        },
        { new: true }
    ).select("-password -refreshToken -avatar.data");

    return res
        .status(200)
        .json(new ApiResponse(200, user, "User details updated successfully"));
});

// delete user account
const deleteUserAccount = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ $or: [{ username }, { email }] });

    if (!user || user.email !== email || user.username !== username) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid password");
    }

    const deletedUser = await User.findByIdAndDelete(user._id);
    if (!deletedUser) {
        throw new ApiError(
            500,
            "Something went wrong while deleting user account. Please try again later."
        );
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User account deleted successfully"));
});

export {
    signupUser,
    updateAvatarImage,
    getAvatarImage,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeUserPassword,
    getCurrentUser,
    getUser,
    updateUserDetails,
    deleteUserAccount
};