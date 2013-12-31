import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming 'User' model contains doctor details
      required: true,
    },
    day: {
      type: String,
      enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    // Add any other properties related to time slots
  },
  { timestamps: true }
);

const TimeSlot = mongoose.model("TimeSlot", timeSlotSchema);

export default TimeSlot;
