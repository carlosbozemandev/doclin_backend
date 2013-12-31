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
userRouter.route("/register").post(registerValidation, register);
userRouter.route("/login").post(loginValidation, login);
userRouter.route("/logout").get(isAuthenticate, logout);
userRouter.route("/me").get(isAuthenticate, getUserDetails);
userRouter
  .route("/password/update")
  .get(isAuthenticate, updatePasswordValidation, updatePassword);
userRouter
  .route("/password/reset")
  .post(forgetPasswordEmailValidation, forgotPassword);
userRouter
  .route("/password/reset/:token")
  .post(resetPasswordValidation, resetPassword);

export default userRouter;
