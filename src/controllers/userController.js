import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "./../middlewares/catchAsyncError.js";
import User from "./../models/userModel.js";
import crypto from "crypto";
import sendToken from "../utils/sendToken.js";
import sendEmail from "../utils/sendEmail.js";
import { forgetPasswordEmailMessage } from "../utils/emailMessage.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    // custom class for error handel
    return next(new ErrorHandler(401, "User already exist"));
  }
  user = await User.create({ name, email, password });
  if (!user) {
    return next(new ErrorHandler(401, "User not created"));
  }
  sendToken(201, user, res);
});
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler(401, "Invalid Email or Password"));
  }
  const isMatched = await user.comparePassword(password);
  if (!isMatched) {
    return next(new ErrorHandler(401, "Invalid Email or Password"));
  }
  sendToken(201, user, res);
});
export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "logout successfully",
    });
});

export const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});
export const updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!user) {
    return next(new ErrorHandler(404, "User not found"));
  }

  // Check if current password matches
  const isMatched = await user.comparePassword(req.body.currentPassword);
  if (!isMatched) {
    return next(new ErrorHandler(401, "Incorrect current password"));
  }

  // Set new password and save the user
  user.password = req.body.newPassword;
  await user.save();

  sendToken(200, user, res);
});
export const resetPassword = catchAsyncError(async (req, res, next) => {
  const verifiedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    token: verifiedToken,
    tokenExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        400,
        "reset password token is invalid or has been expired"
      )
    );
  }
  user.password = req.body.password;
  user.restPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(201, user, res);
});
export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler(404, "user not found"));
  }
  const restToken = await user.getToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${restToken}`;
  try {
    await sendEmail({
      email: user.email,
      subject: "password recovery",
      html: forgetPasswordEmailMessage(resetPasswordUrl),
    });
    res.status(200).json({
      success: true,
      message: "email sent successfully",
    });
  } catch (error) {
    user.token = undefined;
    user.tokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});
