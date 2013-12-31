import {
    joiForgetPasswordSchema,
    joiLoginSchema,
    joiResetPasswordSchema,
    joiSignupSchema,
    joiUpdatePasswordSchema,
    timeSlotSchema,
    updateTimeSlotSchema,
  } from "../utils/joiSchema.js";
  import validationResponse from "../utils/validationResponse.js";
  
  /**
   * form validation middleware
   * using joi schema
   */
  
  //register form validation
  export const registerValidation = (req, res, next) => {
    const { error } = joiSignupSchema.validate(req.body);
    validationResponse(error, next);
  };
  
  // login form validation
  export const loginValidation = (req, res, next) => {
    const { error } = joiLoginSchema.validate(req.body);
    validationResponse(error, next);
  };
  
  // forget password form validation
  export const forgetPasswordEmailValidation = (req, res, next) => {
    const { error } = joiForgetPasswordSchema.validate(req.body);
    validationResponse(error, next);
  };
  
  // reset password form validation
  export const resetPasswordValidation = (req, res, next) => {
    const { error } = joiResetPasswordSchema.validate(req.body);
    validationResponse(error, next);
  };
  export const updatePasswordValidation = (req, res, next) => {
    const { error } = joiUpdatePasswordSchema.validate(req.body);
    validationResponse(error, next);
  };
  export const createTimeSlotValidation = (req, res, next) => {
    const { error } = timeSlotSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, error: error.details.map((detail) => detail.message) });
    }
    next();
  };
  export const updateTimeSlotValidation = (req, res, next) => {
    const { error } = updateTimeSlotSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, error: error.details.map((detail) => detail.message) });
    }
    next();
  };
  export const updateBookingValidation = (req, res, next) => {
    const { error } = updateBookingSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, error: error.details.map((detail) => detail.message) });
    }
    next();
  };
  export const createBookingValidation = (req, res, next) => {
    const { error } = createBookingSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, error: error.details.map((detail) => detail.message) });
    }
    next();
  };