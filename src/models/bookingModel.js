import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming 'User' model contains patient details
      required: true,
    },
    timeSlot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TimeSlot',
      required: true,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    // Add any other properties related to bookings
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
