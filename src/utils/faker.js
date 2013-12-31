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
  const createFakeTimeSlots = async (time) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const doctors = await User.find({ role: 'consultant' }); // Assuming 'User' model contains doctors
  
    for (const doctor of doctors) {
      const timeSlots = [];
  
      for (const day of days) {
        for (let i = 0; i < time; i++) {
          const startTime = faker.date.future();
          const endTime = faker.date.future();
  
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
  
  // Usage: Call the function to generate fake time slots
  createFakeTimeSlots().then(() => {
    console.log('Fake time slots generated.');
  }).catch((error) => {
    console.error('Error generating fake time slots:', error);
  });
  
  
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
    //   await createFakeUsers(200); // Generate 100 patients and 100 consultants
    await createFakeTimeSlots(3); // Generate 100 fake time slots for consultants
    // await createFakeBookings(100);
  };
  
  // Call the function to create fake data
  createFakeData().then(() => {
    console.log('Fake data generation completed.');
  }).catch((error) => {
    console.error('Error generating fake data:', error);
  });