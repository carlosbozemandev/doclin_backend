
import TimeSlot from "../models/timeSlotModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "./../middlewares/catchAsyncError.js";


export const createTimeSlot = catchAsyncError(async (req, res, next) => {
  const { doctor, day, startTime, endTime, isAvailable } = req.body;

  const timeSlot = await TimeSlot.create({ doctor, day, startTime, endTime, isAvailable });

  res.status(201).json({
    success: true,
    data: timeSlot,
  });
});
export const getAllTimeSlots = catchAsyncError(async (req, res, next) => {
  const timeSlots = await TimeSlot.find();

  res.status(200).json({
    success: true,
    count: timeSlots.length,
    data: timeSlots,
  });
});
export const getTimeSlotsByConsultantId = catchAsyncError(async (req, res, next) => {
  const consultantId = req.params.id; // Assuming the consultant ID is in req.params.id

  // Find all time slots associated with the given consultant ID
  const timeSlots = await TimeSlot.find({ doctor: consultantId });

  if (!timeSlots || timeSlots.length === 0) {
    return next(new ErrorHandler(404, "Time slots not found for the given consultant ID"));
  }

  res.status(200).json({
    success: true,
    data: timeSlots,
  });
});

export const getTimeSlotById = catchAsyncError(async (req, res, next) => {
  const timeSlot = await TimeSlot.findById(req.params.id);

  if (!timeSlot) {
    return next(new ErrorHandler(404, "Time slot not found"));
  }

  res.status(200).json({
    success: true,
    data: timeSlot,
  });
});

export const updateTimeSlot = catchAsyncError(async (req, res, next) => {
  let timeSlot = await TimeSlot.findById(req.params.id);

  if (!timeSlot) {
    return next(new ErrorHandler(404, "Time slot not found"));
  }

  timeSlot = await TimeSlot.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: timeSlot,
  });
});
export const deleteTimeSlot = catchAsyncError(async (req, res, next) => {
  const timeSlot = await TimeSlot.findById(req.params.id);

  if (!timeSlot) {
    return next(new ErrorHandler(404, "Time slot not found"));
  }

  await timeSlot.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
