import catchAsyncError from "../middlewares/catchAsyncError.js";
import Booking from "../models/bookingModel.js";
import ErrorHandler from "../utils/errorHandler.js";


export const createBooking = catchAsyncError(async (req, res) => {
  const { timeSlot } = req.body;
  const { user } = req; // Assuming the authenticated user details are in req.user or req.userData
  const newBooking = await Booking.create({
    patient: user._id,
    timeSlot,
  });
  res.status(201).json({ success: true, data: newBooking });
});
export const getAllBookings = catchAsyncError(async (req, res) => {
  const bookings = await Booking.find().populate("timeSlot");
  res
    .status(200)
    .json({ success: true, count: bookings.length, data: bookings });
});
export const getBookingById = catchAsyncError(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("timeSlot");
  if (!booking) {
    return next(new ErrorHandler(404, "Booking not found"));
  }
  res.status(200).json({ success: true, data: booking });
});
export const updateBooking = catchAsyncError(async (req, res) => {
  const { timeSlot, isConfirmed } = req.body;
  const updatedBooking = await Booking.findByIdAndUpdate(
    req.params.id,
    { timeSlot, isConfirmed },
    { new: true }
  ).populate("timeSlot");
  if (!updatedBooking) {
    return next(new ErrorHandler(404, "Booking not found"));
  }
  res.status(200).json({ success: true, data: updatedBooking });
});
export const deleteBooking = catchAsyncError(async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id).populate(
    "timeSlot"
  );
  if (!booking) {
    return next(new ErrorHandler(404, "Booking not found"));
  }
  res.status(200).json({ success: true, data: {} });
});
export const getBookingsByPatientId = catchAsyncError(async (req, res) => {

    const { userId } = req.user; // Assuming the authenticated user ID is available in req.user

    // Find all bookings associated with the given patient ID
    const allBookings = await Booking.find({ patient: userId }).populate('timeSlot');
    if (!allBookings) {
      return next(new ErrorHandler(404, "Booking not found"));
    }
    // Separate confirmed and pending bookings
    const confirmedBookings = allBookings.filter(booking => booking.isConfirmed === true);
   
    res.status(200).json({ success: true, confirmedBookings });
  
});
