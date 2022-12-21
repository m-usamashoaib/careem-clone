const mongoose = require("mongoose");
const bcrpyt = require("bcrypt");
const driverSchema = new mongoose.Schema({
  name: String,
  contact: Number,
  email: String,
  password: String,
  vehicleNo: String,
  status: String,
  ratings: Array,
});

driverSchema.pre("save", async function (next) {
  this.password = await bcrpyt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("drivers", driverSchema);
