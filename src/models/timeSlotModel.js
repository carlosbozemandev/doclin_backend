import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    timeSlots: [
      {
        day: { type: String, required: true },
        slots: [
          {
            startTime: { type: String, required: true },
            endTime: { type: String, required: true },
            isAvailable: { type: Boolean, default: true },
          },
        ],
      },
    ],
    // Other properties related to time slots
  },
  { timestamps: true }
);

const TimeSlot = mongoose.model("TimeSlot", timeSlotSchema);

export default TimeSlot;
