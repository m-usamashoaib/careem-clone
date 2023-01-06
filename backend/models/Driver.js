const mongoose = require("mongoose");
const bcrpyt = require("bcrypt");

//Driver Schema
const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  vehicleNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  location: {
    type: Object,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
  },
  ratings: {
    type: Array,
  },
});

//Function to hash the password before storing into the database
driverSchema.pre("save", async function (next) {
  this.password = await bcrpyt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("drivers", driverSchema);
