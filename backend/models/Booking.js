const mongoose = require("mongoose");
const bcrpyt = require("bcrypt");
const bookingSchema = new mongoose.Schema({
  riderName: String,
  riderOrigin: String,
  riderDestination: String,
  riderContact: Number,
  duration: Number,
  distance: Number,
  fare: Number,
  date: Date,
  driverName: String,
  driverContact: Number,
  driverVehicle: String,
  status: String,
  rating: Number,
});

module.exports = mongoose.model("bookings", bookingSchema);
