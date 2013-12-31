import Joi from "joi";

export const joiSignupSchema = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .min(4)
    .max(255)
    .required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.ref("password"),
  email: Joi.string().email().required(),
});

export const joiLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const joiForgetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const joiResetPasswordSchema = Joi.object({
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.ref("password"),
});

export const joiUpdatePasswordSchema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).required(),
    confirmNewPassword: Joi.ref("newPassword"),
  });

  export const timeSlotSchema = Joi.object({
    doctor: Joi.string().required(),
    day: Joi.string().valid('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday').required(),
    startTime: Joi.date().iso().required(),
    endTime: Joi.date().iso().greater(Joi.ref('startTime')).required(),
    isAvailable: Joi.boolean().default(true),
  });

  export const updateTimeSlotSchema = Joi.object({
    doctor: Joi.string(),
    day: Joi.string().valid('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
    startTime: Joi.date().iso(),
    endTime: Joi.date().iso().greater(Joi.ref('startTime')),
    isAvailable: Joi.boolean(),
  });
  export const createBookingSchema = Joi.object({
    timeSlot: Joi.string().required(), // Assuming timeSlot is a string field representing the time slot ID
    isConfirmed: Joi.boolean().default(false), // Assuming isConfirmed is an optional boolean field
  });
  export const updateBookingSchema = Joi.object({
    timeSlot: Joi.string(), // Assuming timeSlot is a string field representing the time slot ID
    isConfirmed: Joi.boolean(), // Assuming isConfirmed is an optional boolean field
  });
