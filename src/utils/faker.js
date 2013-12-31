import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import User from '../models/userModel.js';
import TimeSlot from '../models/timeSlotModel.js';
import Booking from '../models/bookingModel.js';
// Function to create fake users
const createFakeUsers = async (count) => {
    const users = []; // Create an array to hold all generated users
  
    for (let i = 0; i < count; i++) {
      const newUser = await User.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: 'password123',
        role: i % 2 === 0 ? 'patient' : 'consultant', // Assign role based on the condition
      });
  
      users.push(newUser); // Push the newly created user to the array
    }
  
    // Save all generated users to the database
    await User.insertMany(users);
  };
  
  
  // Function to create fake time slots for consultants
  const createFakeTimeSlots = async (slotsPerDay) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const doctors = await User.find({ role: 'consultant' }); // Assuming 'User' model contains doctors
    
    for (const doctor of doctors) {
      for (const day of days) {
        const timeSlots = [];
        for (let i = 0; i < slotsPerDay; i++) {
          const startTime = generateAbsoluteTime();
          const endTime = generateAbsoluteTime(); // You can adjust this function based on your logic for end time
    
          const slot = {
            startTime,
            endTime,
            isAvailable: true,
          };
    
          timeSlots.push(slot);
        }
        
        const newTimeSlot = new TimeSlot({
          doctor: doctor._id,
          timeSlots: [
            {
              day,
              slots: timeSlots,
            },
          ],
        });
  
        await newTimeSlot.save();
      }
    }
  };
  
  const generateAbsoluteTime = () => {
    const hour = Math.floor(Math.random() * 12) + 1; // Generate random hour (1-12)
    const minute = Math.floor(Math.random() * 60); // Generate random minute (0-59)
    const period = Math.random() < 0.5 ? 'AM' : 'PM'; // Randomly choose AM or PM
  
    return `${hour}:${minute < 10 ? '0' + minute : minute} ${period}`;
  };
  
  
  // Usage: Call the function to generate fake time slots
  
  
  
  // Rest of your code for creating fake bookings...
  const createFakeBookings = async (count) => {
    const bookings = [];
  
    const patients = await User.find({ role: 'patient' }); // Assuming 'patient' is the patient role

  
    for (let i = 0; i < count; i++) {
        const timeSlots = await TimeSlot.find({ isAvailable: true });
      const patient = patients[Math.floor(Math.random() * patients.length)];
      const timeSlot = timeSlots[Math.floor(Math.random() * timeSlots.length)];
  
      const booking = new Booking({
        patient: patient._id, // Reference to a patient user
        timeSlot: timeSlot._id, // Reference to a time slot
        isConfirmed: i%2===0?true:false,
        meetingLink: faker.internet.url(),
        // Set other properties as needed
      });
      bookings.push(booking);
    }
  
    // Save all generated bookings to the database
    await Booking.insertMany(bookings);
  };
  // Usage: Call the functions to create fake data
  export const createFakeData = async () => {
      // await createFakeUsers(20); // Generate 100 patients and 100 consultants
    // await createFakeTimeSlots(3); // Generate 100 fake time slots for consultants
    // await createFakeBookings(5);
  };
  
 