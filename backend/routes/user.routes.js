import { Router } from "express";
import {
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
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/u/:username").get(getUser);
router.route("/avatar/:username").get(getAvatarImage);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeUserPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateUserDetails);
router
    .route("/update-avatar")
    .patch(verifyJWT, upload.single("avatar"), updateAvatarImage);

router.route("/delete-account").delete(verifyJWT, deleteUserAccount);

export default router;