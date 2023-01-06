const mongoose = require("mongoose");
const bcrpyt = require("bcrypt");

//Rider Schema
const riderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: Number,
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
  verified: {
    type: Boolean,
  },
});

//Storing the hash password into the database
riderSchema.pre("save", async function (next) {
  this.password = await bcrpyt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("riders", riderSchema);
