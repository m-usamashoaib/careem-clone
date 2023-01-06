const mongoose = require("mongoose");

//Booking Schema
const bookingSchema = new mongoose.Schema({
  riderName: String,
  riderOrigin: String,
  riderDestination: String,
  riderContact: Number,
  riderEmail: String,
  duration: Number,
  distance: Number,
  fare: Number,
  date: Date,
  driverName: String,
  driverContact: Number,
  driverVehicle: String,
  driverEmail: String,
  status: String,
});

module.exports = mongoose.model("bookings", bookingSchema);
