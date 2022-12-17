const mongoose = require("mongoose");
const bcrpyt = require("bcrypt");
const riderSchema = new mongoose.Schema({
  name: String,
  contact: Number,
  email: String,
  password: String,
});

riderSchema.pre("save", async function (next) {
  this.password = await bcrpyt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("riders", riderSchema);
