import express from 'express';
import {
  createTimeSlot,
  getAllTimeSlots,
  getTimeSlotById,
  updateTimeSlot,
  deleteTimeSlot,
} from '../controllers/timeSlotController.js';

import { isAuthenticate } from '../middlewares/authMiddleware.js';
import { createTimeSlotValidation, updateTimeSlotValidation } from '../middlewares/formValidation.js';

const timeSlotRouter = express.Router();

timeSlotRouter.route('/time-slots').post(isAuthenticate, createTimeSlotValidation ,createTimeSlot) // Create a new time slot
timeSlotRouter.route('/time-slots').get(getAllTimeSlots); // Get all time slots
timeSlotRouter.route('/time-slots/:id').get(getTimeSlotById) // Get a specific time slot by ID
timeSlotRouter.route('/time-slots').put(isAuthenticate,updateTimeSlotValidation, updateTimeSlot) // Update a time slot
timeSlotRouter.route('/time-slots').delete(isAuthenticate, deleteTimeSlot); // Delete a time slot

export default timeSlotRouter;
