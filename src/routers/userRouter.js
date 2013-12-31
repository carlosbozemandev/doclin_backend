import express from "express";
import {
  forgotPassword,
  getUserDetails,
  login,
  logout,
  register,
  resetPassword,
  updatePassword,
} from "../controllers/userController.js";
import {
  forgetPasswordEmailValidation,
  loginValidation,
  registerValidation,
  resetPasswordValidation,
  updatePasswordValidation,
} from "../middlewares/formValidation.js";
import { isAuthenticate } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

// local authentication setup
userRouter.route("/create-account").post(registerValidation, register);
userRouter.route("/signin").post(loginValidation, login);
userRouter.route("/signout").get(isAuthenticate, logout);
userRouter.route("/my-profile").get(isAuthenticate, getUserDetails);
userRouter
  .route("/update-password")
  .put(isAuthenticate, updatePasswordValidation, updatePassword);
userRouter
  .route("/reset-password-request")
  .post(forgetPasswordEmailValidation, forgotPassword);
userRouter
  .route("/reset-password/:token")
  .post(resetPasswordValidation, resetPassword);

export default userRouter;
